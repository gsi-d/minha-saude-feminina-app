import { mapTipoUsuarioDbToEnum, tipoUsuarioDbCorrespondeEnum } from '../../utils/mapTipoUsuarioDb';
import { enumTipoUsuario } from '../../constants/enums';
import type { Dica } from './dicas.types';

export interface SupabaseCategoriaDicaRow {
  ID: number | string;
  NM_CATEGORIA: string;
  DS_CATEGORIA?: string | null;
  IS_ATIVO?: boolean;
  DT_CADASTRO?: string;
  DT_ATUALIZACAO?: string;
  TP_CATEGORIA?: string | null;
}

export interface SupabaseDicaRow {
  ID: string;
  ID_CATEGORIA?: number | string | null;
  DS_DICA?: string | null;
  TP_PERFIL_ALVO?: string | null;
  DT_EXIBICAO_SUGERIDA?: string | null;
  IS_ATIVO?: boolean | null;
  DT_CADASTRO?: string | null;
  DT_ATUALIZACAO?: string | null;
  DS_TITULO?: string | null;
  TITULO?: string | null;
  DS_CONTEUDO?: string | null;
  CONTEUDO?: string | null;
  TEXTO?: string | null;
  TEXTO_CURTO?: string | null;
  PERFIL_ALVO?: string | null;
  CATEGORIA_NOME?: string | null;
  CATEGORIA_RELACIONADA?: SupabaseCategoriaDicaRow | SupabaseCategoriaDicaRow[] | null;
  DS_CATEGORIA?: string | null;
  CATEGORIA?: string | null;
  DS_ICONE?: string | null;
  NR_ORDEM?: number | null;
  FL_DESTAQUE?: boolean | null;
  FL_ATIVO?: boolean | null;
  DT_CRIACAO?: string | null;
  ID_CONTEUDO?: string | null;
  TP_USUARIO?: string | number | null;
  CREATED_AT?: string | null;
  DS_TAG?: string | null;
  TAG?: string | null;
}

function obterCategoriaDica(row: SupabaseDicaRow): SupabaseCategoriaDicaRow | null {
  const categoria = Array.isArray(row.CATEGORIA_RELACIONADA)
    ? row.CATEGORIA_RELACIONADA[0]
    : row.CATEGORIA_RELACIONADA;

  if (!categoria || typeof categoria.NM_CATEGORIA !== 'string' || categoria.NM_CATEGORIA.trim() === '') {
    return null;
  }

  return categoria;
}

function obterTituloDica(row: SupabaseDicaRow): string {
  return row.TITULO ?? row.DS_TITULO ?? '';
}

function obterTextoDica(row: SupabaseDicaRow): string {
  return row.DS_DICA
    ?? row.TEXTO
    ?? row.TEXTO_CURTO
    ?? row.DS_CONTEUDO
    ?? row.CONTEUDO
    ?? '';
}

function obterTagDica(row: SupabaseDicaRow): string {
  const categoria = obterCategoriaDica(row);

  return row.TAG
    ?? row.CATEGORIA_NOME
    ?? categoria?.NM_CATEGORIA
    ?? row.DS_TAG
    ?? row.DS_CATEGORIA
    ?? row.CATEGORIA
    ?? 'geral';
}

function obterCategoriaNomeDica(row: SupabaseDicaRow): string | null {
  const categoria = obterCategoriaDica(row);

  return row.CATEGORIA_NOME
    ?? categoria?.NM_CATEGORIA
    ?? row.DS_CATEGORIA
    ?? row.CATEGORIA
    ?? null;
}

function obterDataExibicaoSugerida(row: SupabaseDicaRow): Date | null {
  if (!row.DT_EXIBICAO_SUGERIDA) {
    return null;
  }

  const data = new Date(row.DT_EXIBICAO_SUGERIDA);
  return Number.isNaN(data.getTime()) ? null : data;
}

export function obterTipoUsuarioDica(row: SupabaseDicaRow) {
  return mapTipoUsuarioDbToEnum(
    row.TP_PERFIL_ALVO
      ?? row.PERFIL_ALVO
      ?? row.TP_USUARIO,
  );
}

export function dicaCorrespondeAoTipoUsuario(row: SupabaseDicaRow, tipoUsuario: enumTipoUsuario) {
  return tipoUsuarioDbCorrespondeEnum(
    row.TP_PERFIL_ALVO
      ?? row.PERFIL_ALVO
      ?? row.TP_USUARIO,
    tipoUsuario,
  );
}

export function obterDataCadastroDica(row: SupabaseDicaRow): string | null {
  return row.DT_CADASTRO ?? row.CREATED_AT ?? null;
}

export function dicaEstaAtiva(row: SupabaseDicaRow): boolean {
  if (typeof row.IS_ATIVO === 'boolean') {
    return row.IS_ATIVO;
  }

  if (typeof row.FL_ATIVO === 'boolean') {
    return row.FL_ATIVO;
  }

  return true;
}

export function mapSupabaseDicaRowToDomain(row: SupabaseDicaRow): Dica {
  return {
    id: row.ID,
    titulo: obterTituloDica(row),
    texto: obterTextoDica(row),
    tag: obterTagDica(row),
    tipo: obterTipoUsuarioDica(row),
    categoriaId: row.ID_CATEGORIA != null ? String(row.ID_CATEGORIA) : null,
    categoriaNome: obterCategoriaNomeDica(row),
    dataExibicaoSugerida: obterDataExibicaoSugerida(row),
  };
}
