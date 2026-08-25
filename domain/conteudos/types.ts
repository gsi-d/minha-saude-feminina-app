import { enumTipoUsuario } from "../../constants/enums";

export type PublicoConteudo =
  | enumTipoUsuario.Adolescente
  | enumTipoUsuario.Gestante
  | enumTipoUsuario.Tentante
  | enumTipoUsuario.Menopausa;

export type StatusConteudo = "RASCUNHO" | "PUBLICADO" | "ARQUIVADO";

export interface CategoriaConteudo {
  id: string;
  nome: string;
}

export interface MarcaConteudo {
  type: string;
  attrs?: Record<string, unknown>;
}

export interface NoConteudo {
  type: string;
  attrs?: Record<string, unknown>;
  content?: NoConteudo[];
  marks?: MarcaConteudo[];
  text?: string;
}

export interface DocumentoConteudo {
  schemaVersion: 1;
  document: {
    type: "doc";
    content: NoConteudo[];
  };
}

export interface ResumoConteudo {
  id: string;
  titulo: string;
  resumo: string;
  imagemCapa: string | null;
  categoria: CategoriaConteudo;
  publico: PublicoConteudo | null;
  atualizadoEm: Date;
}

export interface Conteudo extends ResumoConteudo {
  corpo: DocumentoConteudo;
  urlFonte: string | null;
  cadastradoEm: Date;
}
