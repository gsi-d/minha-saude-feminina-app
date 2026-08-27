import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

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

test("não mantém instrumentação temporária de dicas no app", () => {
  const diretorioTestes = dirname(fileURLToPath(import.meta.url));
  const caminhoTela = resolve(diretorioTestes, "../app/(tabs)/conteudos.tsx");
  const caminhoDataSource = resolve(diretorioTestes, "../data/dicas/dicas-supabase.datasource.ts");
  const caminhoDiagnostico = resolve(diretorioTestes, "../data/dicas/dicas-diagnostics.ts");
  const tela = readFileSync(caminhoTela, "utf8");
  const dataSource = readFileSync(caminhoDataSource, "utf8");

  assert.equal(tela.includes("Diagnóstico de dicas"), false);
  assert.equal(tela.includes("registrarDiagnosticoDicas"), false);
  assert.equal(dataSource.includes("registrarDiagnosticoDicas"), false);
  assert.equal(existsSync(caminhoDiagnostico), false);
});
