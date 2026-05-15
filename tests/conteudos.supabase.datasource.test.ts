import test = require('node:test');
import assert = require('node:assert/strict');

import { enumTipoUsuario } from '../constants/enums';
import type { Conteudo } from '../domain/conteudos/types';
import { filterConteudosForTipoUsuario } from '../data/conteudos/conteudos-supabase.datasource';

test('filterConteudosForTipoUsuario prioriza conteúdos do perfil', () => {
  const conteudos: Conteudo[] = [
    {
      id: '1',
      titulo: 'Geral',
      resumo: '',
      conteudoCompleto: '',
      tag: 'saúde',
      tipo: enumTipoUsuario.NaoDefinido,
    },
    {
      id: '2',
      titulo: 'Gestante',
      resumo: '',
      conteudoCompleto: '',
      tag: 'saúde',
      tipo: enumTipoUsuario.Gestante,
    },
  ];

  assert.deepEqual(filterConteudosForTipoUsuario(conteudos, enumTipoUsuario.Gestante), [
    conteudos[1],
  ]);
});

test('filterConteudosForTipoUsuario usa fallback geral quando não há conteúdo do perfil', () => {
  const conteudos: Conteudo[] = [
    {
      id: '1',
      titulo: 'Geral',
      resumo: '',
      conteudoCompleto: '',
      tag: 'saúde',
      tipo: enumTipoUsuario.NaoDefinido,
    },
    {
      id: '2',
      titulo: 'Menopausa',
      resumo: '',
      conteudoCompleto: '',
      tag: 'saúde',
      tipo: enumTipoUsuario.Menopausa,
    },
  ];

  assert.deepEqual(filterConteudosForTipoUsuario(conteudos, enumTipoUsuario.Gestante), [
    conteudos[0],
  ]);
});
