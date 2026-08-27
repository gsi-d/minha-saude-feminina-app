import assert from "node:assert/strict";
import test from "node:test";

import { enumTipoUsuario } from "../constants/enums";
import * as dicasDataSource from "../data/dicas/dicas-supabase.datasource";
import type { Dica } from "../data/dicas/dicas.types";

function criarDica(id: string, overrides: Partial<Dica> = {}): Dica {
  return {
    id,
    titulo: `Dica ${id}`,
    texto: "Texto",
    tag: "geral",
    tipo: enumTipoUsuario.NaoDefinido,
    categoriaId: null,
    categoriaNome: null,
    dataExibicaoSugerida: null,
    ...overrides,
  };
}

test("usa somente as colunas confirmadas de TB_DICA", () => {
  const select = (dicasDataSource as Record<string, unknown>).DICAS_SELECT;

  assert.equal(
    select,
    "ID, ID_CATEGORIA, DS_DICA, TP_PERFIL_ALVO, DT_EXIBICAO_SUGERIDA, IS_ATIVO, DT_CADASTRO, DT_ATUALIZACAO",
  );
});

test("combina dicas do perfil e gerais sem duplicar IDs", async () => {
  const utils = await import("../domain/dicas/dicas.utils").catch(() => null);

  assert.ok(utils, "o módulo de regras de dicas deve existir");
  assert.deepEqual(
    utils.combinarDicas(
      [criarDica("perfil"), criarDica("repetida", { texto: "perfil" })],
      [criarDica("geral"), criarDica("repetida", { texto: "geral" })],
    ).map((dica) => [dica.id, dica.texto]),
    [["perfil", "Texto"], ["repetida", "perfil"], ["geral", "Texto"]],
  );
});

test("seleciona dicas pelo ID da categoria e usa nome somente como fallback", async () => {
  const utils = await import("../domain/dicas/dicas.utils").catch(() => null);

  assert.ok(utils, "o módulo de regras de dicas deve existir");
  const dicas = [
    criarDica("por-id", { categoriaId: "10", categoriaNome: "Outro nome" }),
    criarDica("por-nome", { categoriaNome: "Saúde Íntima" }),
    criarDica("id-divergente", { categoriaId: "99", categoriaNome: "Saúde Íntima" }),
  ];

  assert.deepEqual(
    utils.selecionarDicasDaCategoria(dicas, { id: "10", nome: "Saude Intima" }).map((dica) => dica.id),
    ["por-id", "por-nome"],
  );
});

test("normaliza erros do Supabase para diagnóstico seguro", async () => {
  const diagnostics = await import("../data/dicas/dicas-diagnostics").catch(() => null);

  assert.ok(diagnostics, "o módulo de diagnóstico deve existir");
  assert.deepEqual(
    diagnostics.normalizarErroDicas({
      code: "42703",
      message: "column does not exist",
      details: "DS_TITULO",
      hint: null,
      session: { access_token: "nao-deve-vazar" },
    }),
    {
      code: "42703",
      message: "column does not exist",
      details: "DS_TITULO",
      hint: null,
    },
  );
});
