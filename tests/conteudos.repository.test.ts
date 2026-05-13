import test = require('node:test');
import assert = require('node:assert/strict');

import { enumTipoUsuario } from '../constants/enums';
import { createConteudosRepository } from '../data/conteudos/conteudos.repository';

test('conteudos repository memory retorna conteudos do tipo informado', async () => {
  const repository = createConteudosRepository('memory');

  const conteudos = await repository.listByTipoUsuario(enumTipoUsuario.Gestante);

  assert.ok(conteudos.length > 0);
  assert.ok(conteudos.every((item) => item.tipo === enumTipoUsuario.Gestante));
});

test('conteudos repository factory devolve implementacao supabase quando configurado', () => {
  const repository = createConteudosRepository('supabase');

  assert.ok(repository);
  assert.equal(typeof repository.listByTipoUsuario, 'function');
});
