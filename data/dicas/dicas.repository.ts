import { enumTipoUsuario } from '../../constants/enums';
import { SupabaseDicasDataSource } from './dicas-supabase.datasource';
import type { Dica } from './dicas.types';

export interface DicasRepository {
  listByTipoUsuario(tipoUsuario: enumTipoUsuario): Promise<Dica[]>;
  listByTipoUsuarioAndTags(tipoUsuario: enumTipoUsuario, tags: string[]): Promise<Dica[]>;
}

export function createDicasRepository(): DicasRepository {
  return new SupabaseDicasDataSource();
}
