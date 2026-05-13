import type { DataSourceProvider } from '../../config/env';
import { resolveDataSourceProvider } from '../provider';
import { enumTipoUsuario } from '../../constants/enums';
import type { Conteudo } from '../../domain/conteudos/types';
import { MemoryConteudosDataSource } from './conteudos-memory.datasource';
import { SupabaseConteudosDataSource } from './conteudos-supabase.datasource';

export interface ConteudosRepository {
  listByTipoUsuario(tipoUsuario: enumTipoUsuario): Promise<Conteudo[]>;
}

export function createConteudosRepository(provider: DataSourceProvider): ConteudosRepository {
  if (provider === 'supabase') {
    return new SupabaseConteudosDataSource();
  }

  return new MemoryConteudosDataSource();
}

export function createConteudosRepositoryFromEnv(
  env: Record<string, string | undefined>
): ConteudosRepository {
  return createConteudosRepository(resolveDataSourceProvider(env));
}
