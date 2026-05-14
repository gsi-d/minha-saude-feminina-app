import type { AuthRepository } from './auth.types';
import { SupabaseAuthDataSource } from './auth-supabase.datasource';

export function createAuthRepository(): AuthRepository {
  return new SupabaseAuthDataSource();
}
