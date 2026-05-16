import { getSupabaseClient } from '../../services/supabase/client';
import type { Conteudo } from '../../domain/conteudos/types';
import { enumTipoUsuario } from '../../constants/enums';
import {
  mapSupabaseConteudoRowToDomain,
  type SupabaseConteudoRow,
} from './conteudos-supabase.mapper';

export function filterConteudosForTipoUsuario(
  conteudos: Conteudo[],
  tipoUsuario: enumTipoUsuario,
): Conteudo[] {
  const conteudosDoPerfil = conteudos.filter((conteudo) => conteudo.tipo === tipoUsuario);
  if (conteudosDoPerfil.length > 0) {
    return conteudosDoPerfil;
  }

  const conteudosGerais = conteudos.filter(
    (conteudo) => conteudo.tipo === enumTipoUsuario.NaoDefinido,
  );
  if (conteudosGerais.length > 0) {
    return conteudosGerais;
  }

  return conteudos;
}

export class SupabaseConteudosDataSource {
  async listByTipoUsuario(tipoUsuario: enumTipoUsuario): Promise<Conteudo[]> {
    const client = getSupabaseClient();

    const { data, error } = await client
      .from('TB_CONTEUDO')
      .select('ID, TITULO, RESUMO, CONTEUDO_COMPLETO, TAG, TP_USUARIO, CREATED_AT')
      .order('CREATED_AT', { ascending: false });

    if (error) {
      throw error;
    }

    const conteudos = ((data ?? []) as SupabaseConteudoRow[]).map(
      mapSupabaseConteudoRowToDomain,
    );

    return filterConteudosForTipoUsuario(conteudos, tipoUsuario);
  }
}
