import { cookies } from 'next/headers';
import { createServerComponentClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

type GenericSupabaseClient = SupabaseClient<any, 'public', any>;

export const createServerSupabaseClient = (): GenericSupabaseClient =>
  createServerComponentClient({
    cookies,
  });

export const createRouteHandlerSupabaseClient = (): GenericSupabaseClient =>
  createRouteHandlerClient({
    cookies,
  });

// Public client for static generation - doesn't use cookies
export const createPublicSupabaseClient = (): GenericSupabaseClient | null => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    console.warn('[Supabase] Public client: Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    return null;
  }

  return createClient(url, anonKey);
};


