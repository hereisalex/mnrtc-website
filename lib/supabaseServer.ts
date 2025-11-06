import { cookies } from 'next/headers';
import { createServerComponentClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
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


