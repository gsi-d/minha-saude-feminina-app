import { enumTipoUsuario } from "../../constants/enums";
import type { Conteudo, ResumoConteudo } from "../../domain/conteudos/types";
import { SupabaseConteudosDataSource } from "./conteudos-supabase.datasource";

export interface ConteudosRepository {
  listPublishedByAudience(tipoUsuario: enumTipoUsuario): Promise<ResumoConteudo[]>;
  findPublishedByIdForAudience(
    id: string,
    tipoUsuario: enumTipoUsuario,
  ): Promise<Conteudo | null>;
}

export function createConteudosRepository(): ConteudosRepository {
  return new SupabaseConteudosDataSource();
}
