import type { CategoriaConteudo, ResumoConteudo } from "./types";

export function extrairCategoriasUnicas(resumos: ResumoConteudo[]): CategoriaConteudo[] {
  const categorias = new Map<string, CategoriaConteudo>();
  for (const resumo of resumos) {
    if (!categorias.has(resumo.categoria.id)) {
      categorias.set(resumo.categoria.id, resumo.categoria);
    }
  }
  return [...categorias.values()];
}

export function filtrarResumosPorCategoria(
  resumos: ResumoConteudo[],
  categoriaId: string,
): ResumoConteudo[] {
  return resumos.filter((resumo) => resumo.categoria.id === categoriaId);
}
