import test = require('node:test');
import assert = require('node:assert/strict');

import {
  getFriendlySupabaseAuthErrorMessage,
  isAuthSessionMissingError,
  isInvalidLoginCredentialsError,
  isUserAlreadyRegisteredError,
} from '../utils/supabaseAuthErrors';

test('detecta credenciais inválidas do Supabase', () => {
  const error = new Error('Invalid login credentials');
  assert.equal(isInvalidLoginCredentialsError(error), true);
  assert.equal(getFriendlySupabaseAuthErrorMessage(error), 'E-mail ou senha inválidos.');
});

test('detecta e-mail já cadastrado no Supabase', () => {
  const error = new Error('User already registered');
  assert.equal(isUserAlreadyRegisteredError(error), true);
  assert.equal(
    getFriendlySupabaseAuthErrorMessage(error),
    'Este e-mail já está cadastrado. Faça login ou use outro e-mail.',
  );
});

test('detecta ausência de sessão do Supabase', () => {
  const error = new Error('Auth session missing!');
  assert.equal(isAuthSessionMissingError(error), true);
});
