import test = require('node:test');
import assert = require('node:assert/strict');

import { enumTipoUsuario } from '../constants/enums';
import { mapSupabaseConteudoRowToDomain } from '../data/conteudos/conteudos-supabase.mapper';
import { mapTipoUsuarioDbToEnum } from '../utils/mapTipoUsuarioDb';

test('mapTipoUsuarioDbToEnum aceita valores textuais do banco', () => {
  assert.equal(mapTipoUsuarioDbToEnum('Adolescente'), enumTipoUsuario.Adolescente);
  assert.equal(mapTipoUsuarioDbToEnum('Gestante'), enumTipoUsuario.Gestante);
  assert.equal(mapTipoUsuarioDbToEnum('Tentante'), enumTipoUsuario.Tentante);
  assert.equal(mapTipoUsuarioDbToEnum('Menopausa'), enumTipoUsuario.Menopausa);
  assert.equal(mapTipoUsuarioDbToEnum('NaoDefinido'), enumTipoUsuario.NaoDefinido);
  assert.equal(mapTipoUsuarioDbToEnum('NãoDefinido'), enumTipoUsuario.NaoDefinido);
  assert.equal(mapTipoUsuarioDbToEnum('nao_definido'), enumTipoUsuario.NaoDefinido);
});

test('mapSupabaseConteudoRowToDomain converte a nova estrutura da TB_CONTEUDO', () => {
  const row = {
    ID: 'conteudo-id',
    TITULO: 'Ciclo menstrual',
    RESUMO: 'Resumo do conteúdo',
    CONTEUDO_COMPLETO: 'Conteúdo completo do artigo',
    TAG: 'saúde',
    TP_USUARIO: 'Gestante',
    CREATED_AT: '2026-05-15T10:00:00Z',
  } as any;

  const conteudo = mapSupabaseConteudoRowToDomain(row);

  assert.deepEqual(conteudo, {
    id: 'conteudo-id',
    titulo: 'Ciclo menstrual',
    resumo: 'Resumo do conteúdo',
    conteudoCompleto: 'Conteúdo completo do artigo',
    tag: 'saúde',
    tipo: enumTipoUsuario.Gestante,
  });
});

test('mapSupabaseConteudoRowToDomain normaliza a tag para o carrossel', () => {
  const conteudoComEspacos = mapSupabaseConteudoRowToDomain({
    ID: 'conteudo-tag',
    TITULO: 'Tag com espaços',
    RESUMO: null,
    CONTEUDO_COMPLETO: null,
    TAG: '  Bem-Estar  ',
    TP_USUARIO: 'Menopausa',
    CREATED_AT: '2026-05-15T10:00:00Z',
  } as any);

  const conteudoSemTag = mapSupabaseConteudoRowToDomain({
    ID: 'conteudo-sem-tag',
    TITULO: 'Sem tag',
    RESUMO: null,
    CONTEUDO_COMPLETO: null,
    TAG: '   ',
    TP_USUARIO: 'Menopausa',
    CREATED_AT: '2026-05-15T10:00:00Z',
  } as any);

  assert.equal(conteudoComEspacos.tag, 'bem-estar');
  assert.equal(conteudoSemTag.tag, 'geral');
});
