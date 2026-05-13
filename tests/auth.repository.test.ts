import test = require('node:test');
import assert = require('node:assert/strict');

import { enumTipoUsuario } from '../constants/enums';
import { createAuthRepository } from '../data/auth/auth.repository';

const cadastroBase = {
  nome: 'Nova Usuaria',
  email: 'nova@ciclo.com',
  senha: '123456',
  telefone: '11999999999',
  dataNascimento: '1999-01-20',
};

test('auth repository memory faz login por email e senha', async () => {
  const repository = createAuthRepository('memory');

  const usuario = await repository.login({
    email: 'maria@ciclo.com',
    senha: '123',
  });

  assert.ok(usuario);
  assert.equal(usuario?.nome, 'Maria Padrão');
});

test('auth repository memory finaliza cadastro e insere usuaria', async () => {
  const repository = createAuthRepository('memory');

  const usuario = await repository.finalizarCadastro({
    cadastro: cadastroBase,
    perfil: 'gravida',
  });

  assert.ok(usuario);
  assert.equal(usuario?.tipoUsuario, enumTipoUsuario.Gestante);

  const usuarioLogado = await repository.login({
    email: cadastroBase.email,
    senha: cadastroBase.senha,
  });

  assert.ok(usuarioLogado);
  assert.equal(usuarioLogado?.email, cadastroBase.email);
});

test('auth repository memory bloqueia email duplicado', async () => {
  const repository = createAuthRepository('memory');

  const usuario = await repository.finalizarCadastro({
    cadastro: {
      ...cadastroBase,
      email: 'maria@ciclo.com',
    },
    perfil: 'tentante',
  });

  assert.equal(usuario, null);
});

test('auth repository factory devolve implementacao supabase quando configurado', () => {
  const repository = createAuthRepository('supabase');

  assert.ok(repository);
  assert.equal(typeof repository.login, 'function');
  assert.equal(typeof repository.finalizarCadastro, 'function');
});
