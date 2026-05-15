import test = require('node:test');
import assert = require('node:assert/strict');

import { getCadastroValidationError } from '../utils/cadastroValidation';

test('getCadastroValidationError exige todos os campos', () => {
  assert.equal(
    getCadastroValidationError({
      nome: '',
      email: 'teste@email.com',
      senha: '123456',
      telefone: '11999999999',
      dataNascimento: '01/01/2000',
    }),
    'Por favor, preencha todos os campos.',
  );
});

test('getCadastroValidationError exige senha minima de 6 caracteres', () => {
  assert.equal(
    getCadastroValidationError({
      nome: 'Maria',
      email: 'teste@email.com',
      senha: '12345',
      telefone: '11999999999',
      dataNascimento: '01/01/2000',
    }),
    'A senha deve ter pelo menos 6 caracteres.',
  );
});

test('getCadastroValidationError retorna null para cadastro valido', () => {
  assert.equal(
    getCadastroValidationError({
      nome: 'Maria',
      email: 'teste@email.com',
      senha: '123456',
      telefone: '11999999999',
      dataNascimento: '01/01/2000',
    }),
    null,
  );
});
