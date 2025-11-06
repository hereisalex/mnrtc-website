import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient } from '@supabase/supabase-js';

type GenericSupabaseClient = SupabaseClient<any, 'public', any>;

let browserClient: GenericSupabaseClient | null = null;

const validateEnv = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    throw new Error('[Supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY missing.');
  }

  if (!/^https?:\/\//i.test(url)) {
    throw new Error('[Supabase] NEXT_PUBLIC_SUPABASE_URL must include http(s):// protocol.');
  }

  return true;
};

export const getBrowserSupabaseClient = (): GenericSupabaseClient | null => {
  if (!browserClient) {
    try {
      validateEnv();
      browserClient = createBrowserSupabaseClient();
    } catch (error) {
      // Return null as per the API contract when Supabase is not configured
      console.warn('[Supabase] Client initialization failed:', error instanceof Error ? error.message : error);
      return null;
    }
  }

  return browserClient;
};

