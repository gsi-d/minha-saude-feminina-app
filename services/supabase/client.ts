import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { getSupabaseConfig } from '../../config/env';

let client: SupabaseClient | null = null;

export function getSupabaseClient() {
  const { url, anonKey } = getSupabaseConfig();

  if (!url || !anonKey) {
    throw new Error('Supabase config is missing');
  }

  client ??= createClient(url, anonKey);
  return client;
}

export function resetSupabaseClientForTests() {
  client = null;
}
