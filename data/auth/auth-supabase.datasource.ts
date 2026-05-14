import { getSupabaseClient } from '../../services/supabase/client';
import type { FinalizarCadastroInput, LoginInput, Usuario } from '../../domain/auth/types';
import type { AuthRepository } from './auth.types';
import {
  mapSupabaseUsuarioRowToDomain,
  type SupabaseUsuarioRow,
} from './auth-supabase.mapper';

export class SupabaseAuthDataSource implements AuthRepository {
  async login(input: LoginInput): Promise<Usuario | null> {
    const client = getSupabaseClient(process.env as Record<string, string | undefined>);
    const emailNormalizado = input.email.trim().toLowerCase();
    const senhaInformada = input.senha.trim();

    const { data, error } = await client
      .rpc('fn_login_usuario', {
        p_email: emailNormalizado,
        p_senha: senhaInformada,
      })
      .maybeSingle<SupabaseUsuarioRow>();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    return mapSupabaseUsuarioRowToDomain(data);
  }

  async finalizarCadastro(_input: FinalizarCadastroInput): Promise<Usuario | null> {
    throw new Error('Supabase auth signup not implemented');
  }
}
