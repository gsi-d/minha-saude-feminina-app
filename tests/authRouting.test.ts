import test = require('node:test');
import assert = require('node:assert/strict');

import { isPublicRoute } from '../utils/authRouting';

test('isPublicRoute reconhece rotas públicas', () => {
  assert.equal(isPublicRoute(undefined), true);
  assert.equal(isPublicRoute('login'), true);
  assert.equal(isPublicRoute('cadastro'), true);
  assert.equal(isPublicRoute('cadastroGestante'), true);
});

test('isPublicRoute rejeita área autenticada', () => {
  assert.equal(isPublicRoute('(tabs)'), false);
  assert.equal(isPublicRoute('conteudoDetalhe'), false);
});
