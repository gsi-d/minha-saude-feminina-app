import { enumTipoUsuario } from '../../constants/enums';
import type { Conteudo } from '../../domain/conteudos/types';
import { SupabaseConteudosDataSource } from './conteudos-supabase.datasource';

export interface ConteudosRepository {
  listByTipoUsuario(tipoUsuario: enumTipoUsuario): Promise<Conteudo[]>;
}

export function createConteudosRepository(): ConteudosRepository {
  return new SupabaseConteudosDataSource();
}
