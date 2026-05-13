import { getSupabaseClient } from '../../services/supabase/client';
import type { Conteudo } from '../../domain/conteudos/types';
import { enumTipoUsuario } from '../../constants/enums';

export class SupabaseConteudosDataSource {
  async listByTipoUsuario(tipoUsuario: enumTipoUsuario): Promise<Conteudo[]> {
    const client = getSupabaseClient(process.env as Record<string, string | undefined>);

    const { data, error } = await client
      .from('conteudos')
      .select('id, titulo, resumo, conteudoCompleto, tag, tipo')
      .eq('tipo', tipoUsuario);

    if (error) {
      throw error;
    }

    return (data ?? []) as Conteudo[];
  }
}
