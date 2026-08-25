import type { DocumentoConteudo, MarcaConteudo, NoConteudo } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isMarcaConteudo(value: unknown): value is MarcaConteudo {
  if (!isRecord(value) || typeof value.type !== "string") return false;
  return value.attrs === undefined || isRecord(value.attrs);
}

function isNoConteudo(value: unknown): value is NoConteudo {
  if (!isRecord(value) || typeof value.type !== "string") return false;
  if (value.attrs !== undefined && !isRecord(value.attrs)) return false;
  if (value.text !== undefined && typeof value.text !== "string") return false;
  if (value.marks !== undefined && (!Array.isArray(value.marks) || !value.marks.every(isMarcaConteudo))) {
    return false;
  }
  return value.content === undefined || (Array.isArray(value.content) && value.content.every(isNoConteudo));
}

export function isDocumentoConteudo(value: unknown): value is DocumentoConteudo {
  if (!isRecord(value) || value.schemaVersion !== 1 || !isRecord(value.document)) return false;
  return value.document.type === "doc"
    && Array.isArray(value.document.content)
    && value.document.content.every(isNoConteudo);
}
