export function getSupabaseConfig(env: Record<string, string | undefined>) {
  return {
    url: env.EXPO_PUBLIC_SUPABASE_URL ?? '',
    anonKey: env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  };
}
