import { enumTipoUsuario } from "../../constants/enums";
import { isDocumentoConteudo } from "../../domain/conteudos/documento";
import type {
  Conteudo,
  PublicoConteudo,
  ResumoConteudo,
  StatusConteudo,
} from "../../domain/conteudos/types";
import { mapTipoUsuarioDbToEnum } from "../../utils/mapTipoUsuarioDb";

export type SupabasePublicoConteudo = "adolescente" | "gestante" | "tentante" | "menopausa";
export type SupabaseStatusConteudo = "rascunho" | "publicado" | "arquivado";

export interface SupabaseCategoriaConteudoRow {
  ID: number | string;
  NM_CATEGORIA: string;
  TP_CATEGORIA: string;
  IS_ATIVO: boolean;
}

export interface SupabaseResumoConteudoRow {
  ID: number | string;
  ID_CATEGORIA: number | string;
  NM_TITULO: string;
  DS_RESUMO: string | null;
  DS_URL_IMAGEM: string | null;
  TP_PERFIL_ALVO: SupabasePublicoConteudo | string;
  TP_STATUS: SupabaseStatusConteudo | string;
  DT_ATUALIZACAO: string;
  CATEGORIA: SupabaseCategoriaConteudoRow | SupabaseCategoriaConteudoRow[];
}

export interface SupabaseConteudoDetalheRow extends SupabaseResumoConteudoRow {
  DS_CORPO_TEXTO: unknown;
  DS_URL_FONTE: string | null;
  DT_CADASTRO: string;
}

export class DadosConteudoInvalidosError extends Error {
  constructor(message = "Os dados do conteúdo são inválidos.") {
    super(message);
    this.name = "DadosConteudoInvalidosError";
  }
}

export class DocumentoConteudoInvalidoError extends DadosConteudoInvalidosError {
  constructor() {
    super("O documento do conteúdo é inválido.");
    this.name = "DocumentoConteudoInvalidoError";
  }
}

const publicosDoBanco: Record<SupabasePublicoConteudo, PublicoConteudo> = {
  adolescente: enumTipoUsuario.Adolescente,
  gestante: enumTipoUsuario.Gestante,
  tentante: enumTipoUsuario.Tentante,
  menopausa: enumTipoUsuario.Menopausa,
};

const publicosParaBanco: Record<PublicoConteudo, SupabasePublicoConteudo> = {
  [enumTipoUsuario.Adolescente]: "adolescente",
  [enumTipoUsuario.Gestante]: "gestante",
  [enumTipoUsuario.Tentante]: "tentante",
  [enumTipoUsuario.Menopausa]: "menopausa",
};

const statusDoBanco: Record<SupabaseStatusConteudo, StatusConteudo> = {
  rascunho: "RASCUNHO",
  publicado: "PUBLICADO",
  arquivado: "ARQUIVADO",
};

export function mapPublicoSupabaseParaDominio(value: unknown): PublicoConteudo | null {
  const publico = mapTipoUsuarioDbToEnum(
    typeof value === "string" || typeof value === "number" ? value : null,
  );
  return publico === enumTipoUsuario.NaoDefinido || publico === enumTipoUsuario.Administrador
    ? null
    : publico;
}

export function mapPublicoDominioParaSupabase(value: enumTipoUsuario): SupabasePublicoConteudo | null {
  return publicosParaBanco[value as PublicoConteudo] ?? null;
}

export function mapStatusSupabaseParaDominio(value: unknown): StatusConteudo | null {
  if (typeof value !== "string") {
    return null;
  }

  const status = value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (status === "publicado") return "PUBLICADO";
  if (status === "rascunho") return "RASCUNHO";
  if (status === "arquivado") return "ARQUIVADO";
  return statusDoBanco[value as SupabaseStatusConteudo] ?? null;
}

function obterCategoria(row: SupabaseResumoConteudoRow): SupabaseCategoriaConteudoRow {
  const categoria = Array.isArray(row.CATEGORIA) ? row.CATEGORIA[0] : row.CATEGORIA;
  if (!categoria || typeof categoria.NM_CATEGORIA !== "string" || categoria.NM_CATEGORIA.trim() === "") {
    throw new DadosConteudoInvalidosError("A categoria do conteúdo é inválida.");
  }
  return categoria;
}

function obterData(value: string): Date {
  const data = new Date(value);
  if (Number.isNaN(data.getTime())) {
    throw new DadosConteudoInvalidosError("A data do conteúdo é inválida.");
  }
  return data;
}

export function mapSupabaseResumoConteudoParaDominio(
  row: SupabaseResumoConteudoRow,
): ResumoConteudo {
  const categoria = obterCategoria(row);
  if (typeof row.NM_TITULO !== "string" || row.NM_TITULO.trim() === "") {
    throw new DadosConteudoInvalidosError("O título do conteúdo é inválido.");
  }

  return {
    id: String(row.ID),
    titulo: row.NM_TITULO,
    resumo: row.DS_RESUMO ?? "",
    imagemCapa: row.DS_URL_IMAGEM ?? null,
    categoria: { id: String(categoria.ID), nome: categoria.NM_CATEGORIA },
    publico: mapPublicoSupabaseParaDominio(row.TP_PERFIL_ALVO),
    atualizadoEm: obterData(row.DT_ATUALIZACAO),
  };
}

export function mapSupabaseConteudoDetalheParaDominio(
  row: SupabaseConteudoDetalheRow,
): Conteudo {
  if (!isDocumentoConteudo(row.DS_CORPO_TEXTO)) {
    throw new DocumentoConteudoInvalidoError();
  }

  return {
    ...mapSupabaseResumoConteudoParaDominio(row),
    corpo: row.DS_CORPO_TEXTO,
    urlFonte: row.DS_URL_FONTE ?? null,
    cadastradoEm: obterData(row.DT_CADASTRO),
  };
}
