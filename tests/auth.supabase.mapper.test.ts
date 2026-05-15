import test = require('node:test');
import assert = require('node:assert/strict');

import { enumTipoUsuario } from '../constants/enums';
import {
  mapSupabaseTipoUsuarioToEnum,
  mapSupabaseUsuarioRowToDomain,
  type SupabaseUsuarioRow,
} from '../data/auth/auth-supabase.mapper';

test('mapSupabaseTipoUsuarioToEnum converte codigos do banco para enum local', () => {
  assert.equal(mapSupabaseTipoUsuarioToEnum(1), enumTipoUsuario.Adolescente);
  assert.equal(mapSupabaseTipoUsuarioToEnum(2), enumTipoUsuario.Gestante);
  assert.equal(mapSupabaseTipoUsuarioToEnum(3), enumTipoUsuario.Tentante);
  assert.equal(mapSupabaseTipoUsuarioToEnum(4), enumTipoUsuario.Menopausa);
  assert.equal(mapSupabaseTipoUsuarioToEnum(5), enumTipoUsuario.NaoDefinido);
  assert.equal(mapSupabaseTipoUsuarioToEnum(null), enumTipoUsuario.NaoDefinido);
  assert.equal(mapSupabaseTipoUsuarioToEnum('Adolescente'), enumTipoUsuario.Adolescente);
  assert.equal(mapSupabaseTipoUsuarioToEnum('Gestante'), enumTipoUsuario.Gestante);
  assert.equal(mapSupabaseTipoUsuarioToEnum('Tentante'), enumTipoUsuario.Tentante);
  assert.equal(mapSupabaseTipoUsuarioToEnum('Menopausa'), enumTipoUsuario.Menopausa);
  assert.equal(mapSupabaseTipoUsuarioToEnum('Não Definido'), enumTipoUsuario.NaoDefinido);
});

test('mapSupabaseUsuarioRowToDomain converte nomes de colunas do Supabase para tipagem local', () => {
  const row: SupabaseUsuarioRow = {
    ID: 'user-id',
    ID_AUTH: 'auth-id',
    NM_USUARIO: 'Maria',
    DS_EMAIL: 'maria@teste.com',
    DT_NASCIMENTO: '1995-05-20',
    URL_FOTO: null,
    FL_ATIVO: true,
    DT_CRIACAO: '2026-05-13T10:00:00',
    DT_ATUALIZACAO: '2026-05-13T10:00:00',
    DS_SENHA: '123456',
    IS_ADM: false,
    tipo_usuario: null,
    TP_USUARIO: 2,
    FL_IS_ADM: true,
  };

  const usuario = mapSupabaseUsuarioRowToDomain(row);

  assert.deepEqual(usuario, {
    id: 'user-id',
    nome: 'Maria',
    email: 'maria@teste.com',
    dataNascimento: '1995-05-20',
    tipoUsuario: enumTipoUsuario.Gestante,
    administrador: true,
    dataCadastro: '2026-05-13T10:00:00',
    telefone: '',
  });
});

test('mapSupabaseUsuarioRowToDomain converte TP_USUARIO textual do novo schema', () => {
  const row: SupabaseUsuarioRow = {
    ID: 'user-id',
    ID_AUTH: 'auth-id',
    NM_USUARIO: 'Ana',
    DS_EMAIL: 'ana@teste.com',
    DT_NASCIMENTO: '2000-01-01',
    URL_FOTO: null,
    FL_ATIVO: true,
    DT_CRIACAO: '2026-05-15T10:00:00',
    DT_ATUALIZACAO: '2026-05-15T10:00:00',
    DS_SENHA: null,
    IS_ADM: false,
    tipo_usuario: null,
    TP_USUARIO: 'Gestante',
    FL_IS_ADM: null,
  };

  const usuario = mapSupabaseUsuarioRowToDomain(row);

  assert.equal(usuario.tipoUsuario, enumTipoUsuario.Gestante);
});
