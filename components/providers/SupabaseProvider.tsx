// NOTE: this is a client-side provider. Keep imports minimal.
'use client';

import { useState, type ReactNode } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import type { Session } from '@supabase/supabase-js';
import { getBrowserSupabaseClient } from '@/lib/supabaseClient';
import { SupabaseConfigError } from './SupabaseConfigError';
import { SupabaseServiceError } from './SupabaseServiceError';

type SupabaseProviderProps = {
  children: ReactNode;
  initialSession: Session | null;
};

function getConfigError(): { missingVars: string[] } | null {
  const missingEnvVars: string[] = [];
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()) {
    missingEnvVars.push('NEXT_PUBLIC_SUPABASE_URL');
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()) {
    missingEnvVars.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  return missingEnvVars.length > 0 ? { missingVars: missingEnvVars } : null;
}

export function SupabaseProvider({ children, initialSession }: SupabaseProviderProps) {
  // Initialize client synchronously and check for config errors
  const [initResult] = useState(() => {
    try {
      const client = getBrowserSupabaseClient();
      const configError = getConfigError();
      
      // Missing configuration: show specific config guidance
      if (configError) {
        console.error(
          '%c⚠️ Supabase configuration missing',
          'color: #f59e0b; font-size: 16px; font-weight: bold;'
        );
        console.error(
          '%cMissing environment variables:',
          'color: #ef4444; font-weight: bold;',
          configError.missingVars.join(', ')
        );
        console.info(
          '%c💡 Quick Fix:',
          'color: #3b82f6; font-weight: bold;',
          'Run "npm run setup:env" in your terminal to configure Supabase automatically.'
        );
        console.info(
          '%c📖 Need help?',
          'color: #10b981; font-weight: bold;',
          'Check the error page for step-by-step instructions.'
        );
        return { client: null, error: { kind: 'config', missingVars: configError.missingVars } };
      }

      // Client unavailable for non-config reasons: treat as service/network unavailability
      if (!client) {
        console.error(
          '%c🚫 Supabase client unavailable',
          'color: #ef4444; font-size: 16px; font-weight: bold;'
        );
        console.info(
          '%cTroubleshooting tips:',
          'color: #3b82f6; font-weight: bold;',
          'Check your network connection, ad-blockers, or Supabase service status.'
        );
        return { client: null, error: { kind: 'unavailable' } };
      }

      return { client, error: null };
    } catch (err) {
      console.error('[SupabaseProvider] Failed to initialize Supabase client.', err);
      const configError = getConfigError();
      if (configError) {
        return { client: null, error: { kind: 'config', missingVars: configError.missingVars } };
      }
      return { client: null, error: { kind: 'unavailable' } };
    }
  });

  // Show configuration error UI instead of crashing
  if (!initResult.client) {
    if (initResult.error && (initResult.error as any).kind === 'config') {
      return <SupabaseConfigError missingVars={(initResult.error as any).missingVars} />;
    }
    return <SupabaseServiceError />;
  }

  return (
    <SessionContextProvider supabaseClient={initResult.client} initialSession={initialSession}>
      {children}
    </SessionContextProvider>
  );
}


