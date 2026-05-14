import { mapTipoUsuarioDbToEnum } from '../../utils/mapTipoUsuarioDb';
import type { Dica } from './dicas.types';

export interface SupabaseDicaRow {
  ID: string;
  DS_TITULO: string;
  DS_CONTEUDO: string;
  DS_CATEGORIA: string | null;
  DS_ICONE: string | null;
  NR_ORDEM: number | null;
  FL_DESTAQUE: boolean;
  FL_ATIVO: boolean;
  DT_CRIACAO: string;
  DT_ATUALIZACAO: string;
  ID_CONTEUDO: string | null;
  TP_USUARIO: number | null;
  DS_TAG: string | null;
}

export function mapSupabaseDicaRowToDomain(row: SupabaseDicaRow): Dica {
  return {
    id: row.ID,
    titulo: row.DS_TITULO,
    texto: row.DS_CONTEUDO,
    tag: row.DS_TAG ?? row.DS_CATEGORIA ?? 'geral',
    tipo: mapTipoUsuarioDbToEnum(row.TP_USUARIO),
  };
}
