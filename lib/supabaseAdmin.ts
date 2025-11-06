import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

type GenericSupabaseClient = SupabaseClient<any, 'public', any>;

let adminClient: GenericSupabaseClient | null = null;

const getSupabaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined.');
  }

  return url;
};

const getServiceRoleKey = (): string => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined.');
  }

  return serviceRoleKey;
};

export const getSupabaseAdminClient = (): GenericSupabaseClient | null => {
  if (adminClient) {
    return adminClient;
  }

  try {
    adminClient = createClient(getSupabaseUrl(), getServiceRoleKey(), {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  } catch (error) {
    console.error('[SupabaseAdmin] Failed to initialize client.', error);
    adminClient = null;
  }

  return adminClient;
};


