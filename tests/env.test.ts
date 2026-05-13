import test = require('node:test');
import assert = require('node:assert/strict');

import { getDataSourceProvider } from '../config/env';
import { resolveDataSourceProvider } from '../data/provider';

test('getDataSourceProvider retorna memory quando explicitamente configurado', () => {
  assert.equal(
    getDataSourceProvider({ EXPO_PUBLIC_DATA_SOURCE: 'memory' }),
    'memory'
  );
});

test('resolveDataSourceProvider retorna supabase quando configurado', () => {
  assert.equal(
    resolveDataSourceProvider({ EXPO_PUBLIC_DATA_SOURCE: 'supabase' }),
    'supabase'
  );
});

test('getDataSourceProvider usa memory quando variavel estiver ausente', () => {
  assert.equal(getDataSourceProvider({}), 'memory');
});
