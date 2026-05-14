import type { Conteudo } from '../../domain/conteudos/types';
import { mapTipoUsuarioDbToEnum } from '../../utils/mapTipoUsuarioDb';

export interface SupabaseConteudoRow {
  ID: string;
  DS_TITULO: string;
  DS_RESUMO: string | null;
  DS_DESCRICAO: string;
  DS_TAG: string | null;
  FL_ATIVO: boolean | null;
  DT_CRIACAO: string | null;
  TP_USUARIO: number | null;
}

export function mapSupabaseConteudoRowToDomain(row: SupabaseConteudoRow): Conteudo {
  return {
    id: row.ID,
    titulo: row.DS_TITULO,
    resumo: row.DS_RESUMO ?? '',
    conteudoCompleto: row.DS_DESCRICAO,
    tag: row.DS_TAG ?? '',
    tipo: mapTipoUsuarioDbToEnum(row.TP_USUARIO),
  };
}
