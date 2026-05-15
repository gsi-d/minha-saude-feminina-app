import test = require('node:test');
import assert = require('node:assert/strict');

import { enumTipoUsuario } from '../constants/enums';
import { mapSupabaseDicaRowToDomain } from '../data/dicas/dicas-supabase.mapper';

test('mapSupabaseDicaRowToDomain converte o schema legado de dicas', () => {
  const dica = mapSupabaseDicaRowToDomain({
    ID: 'dica-1',
    DS_TITULO: 'Hidrate-se',
    DS_CONTEUDO: 'Beba agua ao longo do dia',
    DS_CATEGORIA: 'bem-estar',
    DS_TAG: 'saúde',
    TP_USUARIO: 2,
  } as any);

  assert.deepEqual(dica, {
    id: 'dica-1',
    titulo: 'Hidrate-se',
    texto: 'Beba agua ao longo do dia',
    tag: 'saúde',
    tipo: enumTipoUsuario.Gestante,
  });
});

test('mapSupabaseDicaRowToDomain converte schema textual direto da tabela', () => {
  const dica = mapSupabaseDicaRowToDomain({
    ID: 'dica-2',
    TITULO: 'Movimente-se',
    TEXTO: 'Faça caminhadas leves',
    TAG: 'bem-estar',
    TP_USUARIO: 'Tentante',
  } as any);

  assert.deepEqual(dica, {
    id: 'dica-2',
    titulo: 'Movimente-se',
    texto: 'Faça caminhadas leves',
    tag: 'bem-estar',
    tipo: enumTipoUsuario.Tentante,
  });
});
