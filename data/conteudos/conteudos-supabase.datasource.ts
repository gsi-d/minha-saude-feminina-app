import { getSupabaseClient } from '../../services/supabase/client';
import type { Conteudo } from '../../domain/conteudos/types';
import { enumTipoUsuario } from '../../constants/enums';
import { mapTipoUsuarioEnumToDb } from '../../utils/mapTipoUsuarioDb';
import {
  mapSupabaseConteudoRowToDomain,
  type SupabaseConteudoRow,
} from './conteudos-supabase.mapper';

export class SupabaseConteudosDataSource {
  async listByTipoUsuario(tipoUsuario: enumTipoUsuario): Promise<Conteudo[]> {
    const client = getSupabaseClient(process.env as Record<string, string | undefined>);
    const tipoUsuarioDb = mapTipoUsuarioEnumToDb(tipoUsuario);

    const { data, error } = await client
      .rpc('fn_listar_conteudos_por_tipo_usuario', {
        p_tp_usuario: tipoUsuarioDb,
      });

    if (error) {
      throw error;
    }

    return ((data ?? []) as SupabaseConteudoRow[]).map(mapSupabaseConteudoRowToDomain);
  }
}
