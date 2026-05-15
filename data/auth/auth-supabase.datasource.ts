import { enumTipoUsuario } from '../../constants/enums';
import type { FinalizarCadastroInput, LoginInput, PerfilCadastro, Usuario } from '../../domain/auth/types';
import { getSupabaseClient } from '../../services/supabase/client';
import {
  mapSupabaseUsuarioRowToDomain,
  type SupabaseUsuarioRow,
} from './auth-supabase.mapper';
import type { AuthRepository } from './auth.types';
import {
  getFriendlySupabaseAuthErrorMessage,
  isAuthSessionMissingError,
  isInvalidLoginCredentialsError,
} from '../../utils/supabaseAuthErrors';

function mapearPerfilParaEnum(perfil: PerfilCadastro): enumTipoUsuario {
  const depara: Record<string, enumTipoUsuario> = {
    'adolescente': enumTipoUsuario.Adolescente,
    'gravida': enumTipoUsuario.Gestante,
    'gestante': enumTipoUsuario.Gestante,
    'tentante': enumTipoUsuario.Tentante,
    'menopausa': enumTipoUsuario.Menopausa,
  };

  const chave = perfil.toLowerCase();
  return depara[chave] || enumTipoUsuario.NaoDefinido;
}

function normalizarEmail(email: string) {
  return email.trim().toLowerCase();
}

function obterNomeFallback(email: string) {
  const [nomeAntesDoArroba] = normalizarEmail(email).split('@');
  return nomeAntesDoArroba || 'Usuaria';
}

export class SupabaseAuthDataSource implements AuthRepository {
  private async buscarUsuarioPorAuthId(
    client: ReturnType<typeof getSupabaseClient>,
    authId: string,
  ): Promise<SupabaseUsuarioRow | null> {
    const { data, error } = await client
      .from('TB_USUARIO')
      .select('*')
      .eq('ID_AUTH', authId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return (data as SupabaseUsuarioRow | null) ?? null;
  }

  private async buscarUsuarioPorEmail(
    client: ReturnType<typeof getSupabaseClient>,
    email: string,
  ): Promise<SupabaseUsuarioRow | null> {
    const { data, error } = await client
      .from('TB_USUARIO')
      .select('*')
      .eq('DS_EMAIL', normalizarEmail(email))
      .maybeSingle();

    if (error) {
      throw error;
    }

    return (data as SupabaseUsuarioRow | null) ?? null;
  }

  private async vincularAuthAoUsuarioExistente(
    client: ReturnType<typeof getSupabaseClient>,
    usuario: SupabaseUsuarioRow,
    authId: string,
  ): Promise<SupabaseUsuarioRow> {
    if (usuario.ID_AUTH === authId) {
      return usuario;
    }

    const { data, error } = await client
      .from('TB_USUARIO')
      .update({ ID_AUTH: authId })
      .eq('ID', usuario.ID)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return data as SupabaseUsuarioRow;
  }

  private async criarUsuarioParaAuth(
    client: ReturnType<typeof getSupabaseClient>,
    authUser: { id: string; email?: string | null; user_metadata?: Record<string, unknown> | null },
  ): Promise<SupabaseUsuarioRow | null> {
    const email = normalizarEmail(authUser.email ?? '');

    if (!email) {
      return null;
    }

    const nomeMetadata =
      typeof authUser.user_metadata?.nome === 'string'
        ? authUser.user_metadata.nome
        : typeof authUser.user_metadata?.name === 'string'
          ? authUser.user_metadata.name
          : null;

    const { data, error } = await client
      .from('TB_USUARIO')
      .insert({
        ID_AUTH: authUser.id,
        NM_USUARIO: nomeMetadata?.trim() || obterNomeFallback(email),
        DS_EMAIL: email,
        TP_USUARIO: enumTipoUsuario.NaoDefinido,
        IS_ADM: false,
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return data as SupabaseUsuarioRow;
  }

  private async resolverUsuarioAutenticado(
    client: ReturnType<typeof getSupabaseClient>,
    authUser: { id: string; email?: string | null; user_metadata?: Record<string, unknown> | null },
  ): Promise<Usuario | null> {
    const usuarioPorAuthId = await this.buscarUsuarioPorAuthId(client, authUser.id);
    if (usuarioPorAuthId) {
      return mapSupabaseUsuarioRowToDomain(usuarioPorAuthId);
    }

    const email = authUser.email ?? '';
    if (email) {
      const usuarioPorEmail = await this.buscarUsuarioPorEmail(client, email);
      if (usuarioPorEmail) {
        const usuarioVinculado = await this.vincularAuthAoUsuarioExistente(
          client,
          usuarioPorEmail,
          authUser.id,
        );
        return mapSupabaseUsuarioRowToDomain(usuarioVinculado);
      }
    }

    const usuarioCriado = await this.criarUsuarioParaAuth(client, authUser);
    return usuarioCriado ? mapSupabaseUsuarioRowToDomain(usuarioCriado) : null;
  }

  async getCurrentUsuario(): Promise<Usuario | null> {
    const client = getSupabaseClient(process.env as Record<string, string | undefined>);
    const {
      data: { session },
      error: sessionError,
    } = await client.auth.getSession();

    if (sessionError) {
      if (isAuthSessionMissingError(sessionError)) {
        return null;
      }
      throw sessionError;
    }
    if (!session?.user) return null;

    const {
      data: { user },
      error: authError,
    } = await client.auth.getUser();

    if (authError) {
      if (isAuthSessionMissingError(authError)) {
        return null;
      }
      throw authError;
    }
    if (!user) return null;

    return this.resolverUsuarioAutenticado(client, user);
  }

  async logout(): Promise<void> {
    const client = getSupabaseClient(process.env as Record<string, string | undefined>);
    const { error } = await client.auth.signOut();

    if (error) throw error;
  }

  async login(input: LoginInput): Promise<Usuario | null> {
    const client = getSupabaseClient(process.env as Record<string, string | undefined>);

    const { data: authData, error: authError } = await client.auth.signInWithPassword({
      email: normalizarEmail(input.email),
      password: input.senha,
    });

    if (authError) {
      if (isInvalidLoginCredentialsError(authError)) {
        return null;
      }

      throw authError;
    }
    if (!authData.user) return null;

    return this.resolverUsuarioAutenticado(client, authData.user);
  }

  async finalizarCadastro(input: FinalizarCadastroInput): Promise<Usuario | null> {
    const client = getSupabaseClient(process.env as Record<string, string | undefined>);
    const { email, senha, nome } = input.cadastro;

    const { data: authData, error: authError } = await client.auth.signUp({
      email: normalizarEmail(email),
      password: senha,
    });

    if (authError) {
      throw new Error(getFriendlySupabaseAuthErrorMessage(authError));
    }
    if (!authData.user) return null;

    const tipoUsuarioValor = mapearPerfilParaEnum(input.perfil);

    const { data: dbData, error: dbError } = await client
      .from('TB_USUARIO')
      .insert({
        ID_AUTH: authData.user.id,
        NM_USUARIO: nome,
        DS_EMAIL: normalizarEmail(email),
        TP_USUARIO: tipoUsuarioValor,
        IS_ADM: false
      })
      .select()
      .single();

    if (dbError) {
      console.error("Erro ao salvar na TB_USUARIO:", dbError.message);
      throw dbError;
    }

    return dbData ? mapSupabaseUsuarioRowToDomain(dbData as SupabaseUsuarioRow) : null;
  }
}
