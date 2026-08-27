# Fluxo de Dicas Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fazer as dicas chegarem do Supabase à tela de conteúdos e expor diagnóstico suficiente para diferenciar banco vazio, filtro sem correspondência e erro no app.

**Architecture:** O datasource passa a declarar um contrato mínimo e válido de colunas, mantendo filtro e mapeamento no cliente. Funções puras concentram combinação e associação por categoria; a tela guarda apenas o diagnóstico necessário para desenvolvimento e continua tolerante a falhas isoladas de dicas.

**Tech Stack:** Expo, React Native, TypeScript, Supabase JS, Node test runner.

---

### Task 1: Proteger o contrato da consulta

**Files:**
- Create: `tests/dicas-flow.test.ts`
- Modify: `data/dicas/dicas-supabase.datasource.ts`

**Step 1: Write the failing test**

Criar um teste que importe `DICAS_SELECT`, confira exatamente as oito colunas confirmadas e rejeite nomes legados como `DS_TITULO`.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/dicas-flow.test.ts`
Expected: FAIL porque `DICAS_SELECT` ainda não é exportado e a consulta ainda contém colunas legadas.

**Step 3: Write minimal implementation**

Exportar `DICAS_SELECT` com `ID, ID_CATEGORIA, DS_DICA, TP_PERFIL_ALVO, DT_EXIBICAO_SUGERIDA, IS_ATIVO, DT_CADASTRO, DT_ATUALIZACAO` e usá-lo no `.select()`.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/dicas-flow.test.ts`
Expected: PASS.

### Task 2: Corrigir seleção e fallback

**Files:**
- Create: `domain/dicas/dicas.utils.ts`
- Modify: `tests/dicas-flow.test.ts`
- Modify: `app/(tabs)/conteudos.tsx`

**Step 1: Write the failing tests**

Testar que `combinarDicas` une perfil e gerais sem IDs duplicados e que `selecionarDicasDaCategoria` prefere `categoriaId`, com fallback para nome normalizado.

**Step 2: Run tests to verify they fail**

Run: `npm test -- tests/dicas-flow.test.ts`
Expected: FAIL porque as funções ainda não existem.

**Step 3: Write minimal implementation**

Implementar as duas funções puras e substituir na tela o fallback excludente e a comparação exclusiva por nome.

**Step 4: Run tests to verify they pass**

Run: `npm test -- tests/dicas-flow.test.ts`
Expected: PASS.

### Task 3: Adicionar diagnóstico seguro

**Files:**
- Modify: `data/dicas/dicas-supabase.datasource.ts`
- Modify: `app/(tabs)/conteudos.tsx`
- Modify: `tests/dicas-flow.test.ts`

**Step 1: Write the failing test**

Testar a conversão de erro desconhecido do Supabase para um diagnóstico contendo somente `code`, `message`, `details` e `hint` serializáveis.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/dicas-flow.test.ts`
Expected: FAIL porque o normalizador ainda não existe.

**Step 3: Write minimal implementation**

Adicionar logs condicionados a `__DEV__` no datasource e no carregamento da tela. Guardar contagens e erro em estado local e renderizar um cartão de diagnóstico somente em desenvolvimento.

**Step 4: Run tests to verify they pass**

Run: `npm test -- tests/dicas-flow.test.ts`
Expected: PASS.

### Task 4: Verificação final

**Files:**
- Verify: all modified files

**Step 1: Run complete tests**

Run: `npm test`
Expected: todos os testes passam.

**Step 2: Run static checks**

Run: `npm run lint`
Expected: sem erros.

Run: `npx tsc --noEmit`
Expected: exit code 0.

**Step 3: Validate the remote query contract**

Executar uma consulta REST somente leitura com as oito colunas.
Expected: HTTP 200; zero linhas continua sendo um resultado distinguível de erro pelos logs autenticados do app.
