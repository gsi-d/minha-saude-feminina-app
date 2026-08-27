import type { Dica } from "../../data/dicas/dicas.types";
import type { CategoriaConteudo } from "../conteudos/types";

function normalizarTexto(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function combinarDicas(dicasPerfil: Dica[], dicasGerais: Dica[]): Dica[] {
  const idsAdicionados = new Set<string>();

  return [...dicasPerfil, ...dicasGerais].filter((dica) => {
    if (idsAdicionados.has(dica.id)) return false;
    idsAdicionados.add(dica.id);
    return true;
  });
}

export function selecionarDicasDaCategoria(
  dicas: Dica[],
  categoria?: CategoriaConteudo,
): Dica[] {
  if (!categoria) return [];

  const categoriaNome = normalizarTexto(categoria.nome);

  return dicas.filter((dica) => {
    if (dica.categoriaId != null) {
      return dica.categoriaId === categoria.id;
    }

    return normalizarTexto(dica.categoriaNome ?? dica.tag) === categoriaNome;
  });
}
