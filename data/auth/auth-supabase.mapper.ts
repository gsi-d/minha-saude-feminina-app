import { enumTipoUsuario } from '../../constants/enums';
import type { Usuario } from '../../domain/auth/types';
import { mapTipoUsuarioDbToEnum } from '../../utils/mapTipoUsuarioDb';

export interface SupabaseUsuarioRow {
  ID: string;
  ID_AUTH: string;
  NM_USUARIO: string;
  DS_EMAIL: string;
  DT_NASCIMENTO: string | null;
  URL_FOTO: string | null;
  FL_ATIVO: boolean;
  DT_CRIACAO: string;
  DT_ATUALIZACAO: string;
  DS_SENHA: string | null;
  IS_ADM: boolean | null;
  tipo_usuario: number | null;
  TP_USUARIO: number | null;
  FL_IS_ADM: boolean | null;
}

export const mapSupabaseTipoUsuarioToEnum = mapTipoUsuarioDbToEnum;

export function mapSupabaseUsuarioRowToDomain(row: SupabaseUsuarioRow): Usuario {
  return {
    id: row.ID,
    nome: row.NM_USUARIO,
    email: row.DS_EMAIL,
    senha: row.DS_SENHA ?? undefined,
    dataNascimento: row.DT_NASCIMENTO ?? '',
    tipoUsuario: mapSupabaseTipoUsuarioToEnum(row.TP_USUARIO ?? row.tipo_usuario),
    administrador: row.FL_IS_ADM ?? row.IS_ADM ?? false,
    dataCadastro: row.DT_CRIACAO,
    telefone: '',
  };
}
