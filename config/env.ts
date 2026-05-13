export type DataSourceProvider = 'memory' | 'supabase';

export function getDataSourceProvider(
  env: Record<string, string | undefined>
): DataSourceProvider {
  return env.EXPO_PUBLIC_DATA_SOURCE === 'supabase' ? 'supabase' : 'memory';
}

export function getSupabaseConfig(env: Record<string, string | undefined>) {
  return {
    url: env.EXPO_PUBLIC_SUPABASE_URL ?? '',
    anonKey: env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  };
}
