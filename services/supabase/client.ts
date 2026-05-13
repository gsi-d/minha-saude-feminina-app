import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { getSupabaseConfig } from '../../config/env';

let client: SupabaseClient | null = null;

export function getSupabaseClient(env: Record<string, string | undefined>) {
  const { url, anonKey } = getSupabaseConfig(env);

  if (!url || !anonKey) {
    throw new Error('Supabase config is missing');
  }

  client ??= createClient(url, anonKey);
  return client;
}

export function resetSupabaseClientForTests() {
  client = null;
}
