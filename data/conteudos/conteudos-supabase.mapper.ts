import type { Conteudo } from '../../domain/conteudos/types';
import { mapTipoUsuarioDbToEnum } from '../../utils/mapTipoUsuarioDb';

export interface SupabaseConteudoRow {
  ID: string;
  TITULO: string;
  RESUMO: string | null;
  CONTEUDO_COMPLETO: string | null;
  TAG: string | null;
  TP_USUARIO: string | number | null;
  CREATED_AT: string | null;
}

function normalizeConteudoTag(tag: string | null | undefined) {
  const normalizedTag = tag?.trim().toLowerCase() ?? '';
  return normalizedTag || 'geral';
}

export function mapSupabaseConteudoRowToDomain(row: SupabaseConteudoRow): Conteudo {
  return {
    id: row.ID,
    titulo: row.TITULO,
    resumo: row.RESUMO ?? '',
    conteudoCompleto: row.CONTEUDO_COMPLETO ?? '',
    tag: normalizeConteudoTag(row.TAG),
    tipo: mapTipoUsuarioDbToEnum(row.TP_USUARIO),
  };
}
