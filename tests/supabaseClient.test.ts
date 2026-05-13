import test = require('node:test');
import assert = require('node:assert/strict');

import { getSupabaseClient, resetSupabaseClientForTests } from '../services/supabase/client';

test('getSupabaseClient lança erro quando configuracao estiver ausente', () => {
  resetSupabaseClientForTests();

  assert.throws(
    () =>
      getSupabaseClient({
        EXPO_PUBLIC_SUPABASE_URL: '',
        EXPO_PUBLIC_SUPABASE_ANON_KEY: '',
      }),
    /Supabase config is missing/
  );
});

test('getSupabaseClient cria client quando configuracao estiver preenchida', () => {
  resetSupabaseClientForTests();

  const client = getSupabaseClient({
    EXPO_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
    EXPO_PUBLIC_SUPABASE_ANON_KEY: 'anon-key',
  });

  assert.ok(client);
});
