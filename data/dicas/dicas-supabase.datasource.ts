import { enumTipoUsuario } from '../../constants/enums';
import { getSupabaseClient } from '../../services/supabase/client';
import { mapTipoUsuarioEnumToDb } from '../../utils/mapTipoUsuarioDb';
import {
  mapSupabaseDicaRowToDomain,
  type SupabaseDicaRow,
} from './dicas-supabase.mapper';
import type { Dica } from './dicas.types';

export class SupabaseDicasDataSource {
  async listByTipoUsuarioAndTags(tipoUsuario: enumTipoUsuario, tags: string[]): Promise<Dica[]> {
    const client = getSupabaseClient(process.env as Record<string, string | undefined>);
    
    // Converte o enum do App para o número que o Banco entende
    const tipoUsuarioDb = mapTipoUsuarioEnumToDb(tipoUsuario);

    // Chama a função RPC que criamos no banco de dados
    const { data, error } = await client.rpc('fn_listar_dicas_por_tipo_usuario', {
      p_tp_usuario: tipoUsuarioDb,
      p_tags: tags,
    });

    if (error) {
      throw error;
    }

    return ((data ?? []) as SupabaseDicaRow[]).map(mapSupabaseDicaRowToDomain);
  }
}