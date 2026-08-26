import { enumTipoUsuario } from '../../constants/enums';
import { getSupabaseClient } from '../../services/supabase/client';
import {
  dicaCorrespondeAoTipoUsuario,
  dicaEstaAtiva,
  mapSupabaseDicaRowToDomain,
  obterDataCadastroDica,
  type SupabaseCategoriaDicaRow,
  type SupabaseDicaRow,
} from './dicas-supabase.mapper';
import type { Dica } from './dicas.types';

function normalizarTag(tag: string) {
  return tag
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function compararDatasDesc(
  primeira: string | null,
  segunda: string | null,
) {
  const timestampPrimeira = primeira ? Date.parse(primeira) : Number.NEGATIVE_INFINITY;
  const timestampSegunda = segunda ? Date.parse(segunda) : Number.NEGATIVE_INFINITY;

  return timestampSegunda - timestampPrimeira;
}

function normalizarDataParaComparacao(data: Date) {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate()).getTime();
}

function compararDicasPorExibicaoSugerida(primeira: Dica, segunda: Dica) {
  const hoje = normalizarDataParaComparacao(new Date());
  const dataPrimeira = primeira.dataExibicaoSugerida
    ? normalizarDataParaComparacao(primeira.dataExibicaoSugerida)
    : Number.NEGATIVE_INFINITY;
  const dataSegunda = segunda.dataExibicaoSugerida
    ? normalizarDataParaComparacao(segunda.dataExibicaoSugerida)
    : Number.NEGATIVE_INFINITY;
  const primeiraElegivel = dataPrimeira <= hoje;
  const segundaElegivel = dataSegunda <= hoje;

  if (primeiraElegivel !== segundaElegivel) {
    return primeiraElegivel ? -1 : 1;
  }

  if (dataPrimeira !== dataSegunda) {
    return dataSegunda - dataPrimeira;
  }

  return 0;
}

export class SupabaseDicasDataSource {
  private async listarDicas(): Promise<SupabaseDicaRow[]> {
    const client = getSupabaseClient();

    const { data, error } = await client
      .from('TB_DICA')
      .select([
        'ID',
        'ID_CATEGORIA',
        'DS_DICA',
        'TP_PERFIL_ALVO',
        'DT_EXIBICAO_SUGERIDA',
        'IS_ATIVO',
        'DT_CADASTRO',
        'DT_ATUALIZACAO',
        'TITULO',
        'TEXTO_CURTO',
        'PERFIL_ALVO',
        'TEXTO',
        'TAG',
        'TP_USUARIO',
        'CREATED_AT',
        'DS_TITULO',
        'DS_CONTEUDO',
        'CONTEUDO',
        'DS_CATEGORIA',
        'CATEGORIA',
        'DS_TAG',
        'FL_ATIVO',
      ].join(', '))
      .order('DT_CADASTRO', { ascending: false, nullsFirst: false });

    if (error) {
      throw error;
    }

    const rows = (data ?? []) as unknown as SupabaseDicaRow[];
    const categoriasPorId = await this.listarCategoriasPorId(
      rows
        .map((row) => row.ID_CATEGORIA)
        .filter((value): value is number | string => value != null && (typeof value === 'number' || typeof value === 'string')),
    );

    return rows
      .map((row) => ({
        ...row,
        CATEGORIA_NOME: row.ID_CATEGORIA != null ? categoriasPorId.get(String(row.ID_CATEGORIA)) ?? null : null,
      }))
      .filter(dicaEstaAtiva)
      .sort((primeira, segunda) => compararDatasDesc(
        obterDataCadastroDica(primeira),
        obterDataCadastroDica(segunda),
      ));
  }

  private async listarCategoriasPorId(ids: Array<number | string>): Promise<Map<string, string>> {
    if (ids.length === 0) {
      return new Map();
    }

    const client = getSupabaseClient();
    const idsUnicos = [...new Set(ids.map((id) => String(id)))];
    const { data, error } = await client
      .from('TB_CATEGORIA')
      .select('ID, NM_CATEGORIA, IS_ATIVO')
      .in('ID', idsUnicos);

    if (error) {
      throw error;
    }

    return ((data ?? []) as SupabaseCategoriaDicaRow[])
      .filter((categoria) => categoria.IS_ATIVO !== false)
      .reduce((mapa, categoria) => {
        const id = String(categoria.ID);
        if (id.trim() !== '' && typeof categoria.NM_CATEGORIA === 'string' && categoria.NM_CATEGORIA.trim() !== '') {
          mapa.set(id, categoria.NM_CATEGORIA);
        }
        return mapa;
      }, new Map<string, string>());
  }

  async listByTipoUsuario(tipoUsuario: enumTipoUsuario): Promise<Dica[]> {
    const rows = await this.listarDicas();

    return rows
      .filter((row) => dicaCorrespondeAoTipoUsuario(row, tipoUsuario))
      .map(mapSupabaseDicaRowToDomain)
      .sort(compararDicasPorExibicaoSugerida);
  }

  async listByTipoUsuarioAndTags(tipoUsuario: enumTipoUsuario, tags: string[]): Promise<Dica[]> {
    const tagsNormalizadas = tags.map(normalizarTag).filter(Boolean);
    const rows = await this.listarDicas();

    return rows
      .filter((row) => dicaCorrespondeAoTipoUsuario(row, tipoUsuario))
      .filter((row) => {
        if (tagsNormalizadas.length === 0) {
          return true;
        }

        const tag = normalizarTag(mapSupabaseDicaRowToDomain(row).tag);
        return tagsNormalizadas.includes(tag);
      })
      .map(mapSupabaseDicaRowToDomain)
      .sort(compararDicasPorExibicaoSugerida);
  }
}
