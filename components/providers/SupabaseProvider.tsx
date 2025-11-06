// NOTE: this is a client-side provider. Keep imports minimal.
'use client';

import { useState, type ReactNode } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import type { Session } from '@supabase/supabase-js';
import { getBrowserSupabaseClient } from '@/lib/supabaseClient';

type SupabaseProviderProps = {
  children: ReactNode;
  initialSession: Session | null;
};

export function SupabaseProvider({ children, initialSession }: SupabaseProviderProps) {
  const [supabaseClient] = useState(() => {
    try {
      const client = getBrowserSupabaseClient();
      if (!client) {
        throw new Error('Supabase browser client unavailable.');
      }

      return client;
    } catch (error) {
      console.error('[SupabaseProvider] Failed to initialize Supabase client.', error);
      throw error;
    }
  });

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
      {children}
    </SessionContextProvider>
  );
}


