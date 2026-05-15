import { mapTipoUsuarioDbToEnum } from '../../utils/mapTipoUsuarioDb';
import type { Dica } from './dicas.types';

export interface SupabaseDicaRow {
  ID: string;
  DS_TITULO?: string | null;
  TITULO?: string | null;
  DS_CONTEUDO?: string | null;
  CONTEUDO?: string | null;
  TEXTO?: string | null;
  DS_CATEGORIA?: string | null;
  CATEGORIA?: string | null;
  DS_ICONE?: string | null;
  NR_ORDEM?: number | null;
  FL_DESTAQUE?: boolean | null;
  FL_ATIVO?: boolean | null;
  DT_CRIACAO?: string | null;
  DT_ATUALIZACAO?: string | null;
  ID_CONTEUDO?: string | null;
  TP_USUARIO?: string | number | null;
  DS_TAG?: string | null;
  TAG?: string | null;
}

export function mapSupabaseDicaRowToDomain(row: SupabaseDicaRow): Dica {
  return {
    id: row.ID,
    titulo: row.DS_TITULO ?? row.TITULO ?? '',
    texto: row.DS_CONTEUDO ?? row.CONTEUDO ?? row.TEXTO ?? '',
    tag: row.DS_TAG ?? row.TAG ?? row.DS_CATEGORIA ?? row.CATEGORIA ?? 'geral',
    tipo: mapTipoUsuarioDbToEnum(row.TP_USUARIO),
  };
}
