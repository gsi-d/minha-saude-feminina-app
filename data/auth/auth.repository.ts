import { resolveDataSourceProvider } from '../provider';
import type { DataSourceProvider } from '../../config/env';
import type { AuthRepository } from './auth.types';
import { MemoryAuthDataSource } from './auth-memory.datasource';
import { SupabaseAuthDataSource } from './auth-supabase.datasource';

export function createAuthRepository(provider: DataSourceProvider): AuthRepository {
  if (provider === 'supabase') {
    return new SupabaseAuthDataSource();
  }

  return new MemoryAuthDataSource();
}

export function createAuthRepositoryFromEnv(
  env: Record<string, string | undefined>
): AuthRepository {
  return createAuthRepository(resolveDataSourceProvider(env));
}
