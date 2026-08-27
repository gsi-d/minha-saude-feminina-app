# Remoção do Diagnóstico de Dicas Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remover os logs e o cartão temporário de desenvolvimento sem alterar o fluxo funcional de dicas.

**Architecture:** Um teste textual protege a ausência da instrumentação temporária. A implementação remove importações, estado, renderização, estilos e chamadas de log, mantendo o contrato corrigido do Supabase e as regras puras de seleção.

**Tech Stack:** Expo, React Native, TypeScript, Node test runner.

---

### Task 1: Remover instrumentação temporária

**Files:**
- Modify: `tests/dicas-flow.test.ts`
- Modify: `app/(tabs)/conteudos.tsx`
- Modify: `data/dicas/dicas-supabase.datasource.ts`
- Delete: `data/dicas/dicas-diagnostics.ts`

**Step 1: Write the failing test**

Ler os arquivos de produção e afirmar que não contêm `registrarDiagnosticoDicas`, `Diagnóstico de dicas` ou o módulo `dicas-diagnostics`.

**Step 2: Run test to verify it fails**

Run: `npx tsx --test tests/dicas-flow.test.ts`
Expected: FAIL porque a instrumentação ainda existe.

**Step 3: Write minimal implementation**

Remover somente o código temporário, preservando `DICAS_SELECT`, `combinarDicas` e `selecionarDicasDaCategoria`.

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: 5 testes passam.

**Step 5: Verify static checks**

Run: `npm run lint`
Expected: sem erros.

Run: `npx tsc --noEmit`
Expected: exit code 0.
