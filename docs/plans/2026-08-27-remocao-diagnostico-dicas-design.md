# Remoção do diagnóstico temporário de dicas — desenho

## Objetivo

Remover toda a instrumentação temporária criada para investigar o fluxo de dicas, agora que a consulta corrigida foi validada.

## Escopo aprovado

- Remover o cartão “Diagnóstico de dicas (desenvolvimento)” da tela de conteúdos.
- Remover estado, tipos e estilos usados apenas pelo cartão.
- Remover os logs `[Dicas]` do datasource e da tela.
- Remover o normalizador e o módulo de diagnóstico que deixarem de ser utilizados.
- Preservar o `DICAS_SELECT` corrigido, a combinação entre dicas do perfil e gerais e a associação por categoria.

## Verificação

Um teste de regressão garantirá que a interface e o datasource não dependam mais da instrumentação. A suíte, o lint e o TypeScript deverão continuar passando.
