# Correção do fluxo de dicas — desenho

## Problema confirmado

A consulta de `TB_DICA` mistura nomes de colunas do esquema vigente e de um esquema legado. O Supabase rejeita a consulta inteira com PostgreSQL `42703` porque `DS_TITULO` não existe. A tela captura essa falha sem registrá-la e transforma o resultado em uma lista vazia, ocultando a causa.

Além disso, a tela relaciona dicas e artigos apenas pela igualdade do nome da categoria. Como ambos possuem `ID_CATEGORIA`, o identificador deve ser a chave principal; o nome normalizado fica apenas como compatibilidade. As dicas gerais também não devem ser descartadas só porque existe alguma dica do perfil em outra categoria.

## Solução aprovada

- Consultar apenas as colunas confirmadas de `TB_DICA`: `ID`, `ID_CATEGORIA`, `DS_DICA`, `TP_PERFIL_ALVO`, `DT_EXIBICAO_SUGERIDA`, `IS_ATIVO`, `DT_CADASTRO` e `DT_ATUALIZACAO`.
- Preservar o mapeamento do esquema vigente e remover da consulta a tentativa de compatibilidade com colunas inexistentes.
- Combinar dicas do perfil e dicas gerais, eliminando duplicatas por ID.
- Relacionar dica e categoria primeiro por ID e, quando o ID não estiver disponível, pelo nome normalizado.
- Registrar no console de desenvolvimento o início, a resposta bruta, as quantidades após filtros e erros do Supabase, sem registrar chave, sessão ou dados sensíveis.
- Mostrar na tela, somente em `__DEV__`, um cartão com perfil consultado, quantidades retornadas e eventual código/mensagem de erro.
- Manter artigos utilizáveis quando apenas a consulta de dicas falhar.

## Testes e validação

Os testes cobrirão o contrato de colunas da consulta, a combinação sem duplicatas e a seleção de dicas por ID/nome de categoria. A validação final executará testes, lint e TypeScript. Uma consulta somente leitura ao endpoint confirmará que o contrato corrigido continua aceito pelo Supabase.
