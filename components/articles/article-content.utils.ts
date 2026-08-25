import type { NoConteudo } from "../../domain/conteudos/types";

const TIPOS_NO_SUPORTADOS = new Set([
  "doc",
  "text",
  "paragraph",
  "heading",
  "bulletList",
  "orderedList",
  "listItem",
  "blockquote",
  "image",
  "youtube",
  "horizontalRule",
  "hardBreak",
]);

export function obterUrlHttpSegura(source: unknown): string | null {
  if (typeof source !== "string") return null;
  try {
    const url = new URL(source);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function obterUrlImagemSegura(source: unknown): string | null {
  const urlHttp = obterUrlHttpSegura(source);
  if (urlHttp) return urlHttp;
  if (typeof source !== "string") return null;
  return /^data:image\/(?:png|jpe?g|gif|webp);base64,[a-z0-9+/=\s]+$/i.test(source)
    ? source
    : null;
}

export function normalizarUrlYoutube(source: unknown): string | null {
  const sourceUrl = obterUrlHttpSegura(source);
  if (!sourceUrl) return null;

  const url = new URL(sourceUrl);
  const hostname = url.hostname.toLowerCase().replace(/^www\./, "").replace(/^m\./, "");
  let videoId: string | null = null;

  if (hostname === "youtu.be") {
    videoId = url.pathname.split("/").filter(Boolean)[0] ?? null;
  } else if (hostname === "youtube.com" || hostname === "youtube-nocookie.com") {
    videoId = url.searchParams.get("v");
    if (!videoId && url.pathname.startsWith("/embed/")) {
      videoId = url.pathname.split("/")[2] ?? null;
    }
  }

  return videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)
    ? `https://www.youtube-nocookie.com/embed/${videoId}`
    : null;
}

export function obterEstrategiaNoConteudo(type: string): string {
  return TIPOS_NO_SUPORTADOS.has(type) ? type : "children";
}

export function obterTextoProprioFallback(node: NoConteudo): string {
  return node.text ?? "";
}

export type ParteConteudoParagrafo =
  | { tipo: "inline"; nodes: NoConteudo[] }
  | { tipo: "block"; node: NoConteudo };

function isNoInline(node: NoConteudo): boolean {
  const strategy = obterEstrategiaNoConteudo(node.type);
  if (strategy === "text" || strategy === "hardBreak") return true;
  if (strategy !== "children") return false;
  return (node.content ?? []).every(isNoInline);
}

export function particionarConteudoTextual(nodes: NoConteudo[]): ParteConteudoParagrafo[] {
  const partes: ParteConteudoParagrafo[] = [];
  let inline: NoConteudo[] = [];

  const flushInline = () => {
    if (inline.length > 0) {
      partes.push({ tipo: "inline", nodes: inline });
      inline = [];
    }
  };

  for (const node of nodes) {
    if (isNoInline(node)) {
      inline.push(node);
    } else {
      flushInline();
      partes.push({ tipo: "block", node });
    }
  }
  flushInline();
  return partes;
}
