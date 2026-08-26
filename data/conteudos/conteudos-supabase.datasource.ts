import { enumTipoUsuario } from "../../constants/enums";
import type { Conteudo, ResumoConteudo } from "../../domain/conteudos/types";
import { getSupabaseClient } from "../../services/supabase/client";
import { tipoUsuarioDbCorrespondeEnum } from "../../utils/mapTipoUsuarioDb";
import {
  mapSupabaseConteudoDetalheParaDominio,
  mapStatusSupabaseParaDominio,
  mapSupabaseResumoConteudoParaDominio,
  type SupabaseConteudoDetalheRow,
  type SupabaseResumoConteudoRow,
} from "./conteudos-supabase.mapper";
import type { ConteudosRepository } from "./conteudos.repository";

const CATEGORIA_SELECT = `
  CATEGORIA:TB_CATEGORIA!inner(
    ID,
    NM_CATEGORIA,
    TP_CATEGORIA,
    IS_ATIVO
  )
`;

const RESUMO_SELECT = `
  ID,
  ID_CATEGORIA,
  NM_TITULO,
  DS_RESUMO,
  DS_URL_IMAGEM,
  TP_PERFIL_ALVO,
  TP_STATUS,
  DT_ATUALIZACAO,
  ${CATEGORIA_SELECT}
`;

const DETALHE_SELECT = `
  ID,
  ID_CATEGORIA,
  NM_TITULO,
  DS_RESUMO,
  DS_CORPO_TEXTO,
  DS_URL_IMAGEM,
  DS_URL_FONTE,
  TP_PERFIL_ALVO,
  TP_STATUS,
  DT_CADASTRO,
  DT_ATUALIZACAO,
  ${CATEGORIA_SELECT}
`;

export type CodigoErroConteudos = "CONEXAO" | "SEM_PERMISSAO" | "CONSULTA";

export class ErroConteudosRepository extends Error {
  constructor(public readonly codigo: CodigoErroConteudos) {
    super("Não foi possível carregar os conteúdos.");
    this.name = "ErroConteudosRepository";
  }
}

function mapErroSupabase(error: unknown): ErroConteudosRepository {
  const value = error as { code?: unknown; message?: unknown } | null;
  const code = typeof value?.code === "string" ? value.code.toLowerCase() : "";
  const message = typeof value?.message === "string" ? value.message.toLowerCase() : "";

  if (code === "42501" || message.includes("permission") || message.includes("row-level security")) {
    return new ErroConteudosRepository("SEM_PERMISSAO");
  }
  if (message.includes("fetch") || message.includes("network") || message.includes("connection")) {
    return new ErroConteudosRepository("CONEXAO");
  }
  return new ErroConteudosRepository("CONSULTA");
}

export class SupabaseConteudosDataSource implements ConteudosRepository {
  async listPublishedByAudience(tipoUsuario: enumTipoUsuario): Promise<ResumoConteudo[]> {
    const client = getSupabaseClient();

    const { data, error } = await client
      .from("TB_CONTEUDO")
      .select(RESUMO_SELECT)
      .eq("CATEGORIA.IS_ATIVO", true)
      .order("DT_ATUALIZACAO", { ascending: false });

    if (error) {
      throw mapErroSupabase(error);
    }

    return ((data ?? []) as unknown as SupabaseResumoConteudoRow[])
      .filter((row) => mapStatusSupabaseParaDominio(row.TP_STATUS) === "PUBLICADO")
      .filter((row) => {
        const categoria = Array.isArray(row.CATEGORIA) ? row.CATEGORIA[0] : row.CATEGORIA;
        return categoria?.TP_CATEGORIA == null || String(categoria.TP_CATEGORIA).trim() === "" || String(categoria.TP_CATEGORIA).toLowerCase() === "conteudo";
      })
      .filter((row) => tipoUsuarioDbCorrespondeEnum(row.TP_PERFIL_ALVO, tipoUsuario))
      .map(mapSupabaseResumoConteudoParaDominio)
      .filter((conteudo) => conteudo.publico === tipoUsuario || conteudo.publico === null);
  }

  async findPublishedByIdForAudience(
    id: string,
    tipoUsuario: enumTipoUsuario,
  ): Promise<Conteudo | null> {
    if (!/^\d+$/.test(id)) return null;

    const client = getSupabaseClient();
    const { data, error } = await client
      .from("TB_CONTEUDO")
      .select(DETALHE_SELECT)
      .eq("ID", id)
      .eq("CATEGORIA.IS_ATIVO", true)
      .maybeSingle();

    if (error) {
      throw mapErroSupabase(error);
    }
    if (!data) return null;

    if (mapStatusSupabaseParaDominio(data.TP_STATUS) !== "PUBLICADO") {
      return null;
    }

    const categoria = Array.isArray(data.CATEGORIA) ? data.CATEGORIA[0] : data.CATEGORIA;
    if (
      categoria?.TP_CATEGORIA != null
      && String(categoria.TP_CATEGORIA).trim() !== ""
      && String(categoria.TP_CATEGORIA).toLowerCase() !== "conteudo"
    ) {
      return null;
    }

    if (!tipoUsuarioDbCorrespondeEnum(data.TP_PERFIL_ALVO, tipoUsuario)) {
      return null;
    }

    const conteudo = mapSupabaseConteudoDetalheParaDominio(
      data as unknown as SupabaseConteudoDetalheRow,
    );
    return conteudo.publico === tipoUsuario || conteudo.publico === null ? conteudo : null;
  }
}
