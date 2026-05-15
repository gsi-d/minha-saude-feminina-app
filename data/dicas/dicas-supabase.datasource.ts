import { enumTipoUsuario } from '../../constants/enums';
import { getSupabaseClient } from '../../services/supabase/client';
import {
  mapSupabaseDicaRowToDomain,
  type SupabaseDicaRow,
} from './dicas-supabase.mapper';
import type { Dica } from './dicas.types';

export class SupabaseDicasDataSource {
  async listByTipoUsuarioAndTags(tipoUsuario: enumTipoUsuario, tags: string[]): Promise<Dica[]> {
    const client = getSupabaseClient(process.env as Record<string, string | undefined>);

    const { data, error } = await client
      .from('TB_DICA')
      .select('ID, TITULO, TEXTO, TAG, TP_USUARIO, CREATED_AT')
      .order('CREATED_AT', { ascending: false });

    if (error) {
      throw error;
    }

    const tagsNormalizadas = tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean);

    return ((data ?? []) as SupabaseDicaRow[])
      .map(mapSupabaseDicaRowToDomain)
      .filter((dica) => dica.tipo === tipoUsuario)
      .filter((dica) => {
        if (tagsNormalizadas.length === 0) {
          return true;
        }

        return tagsNormalizadas.includes(dica.tag.trim().toLowerCase());
      });
  }
}
