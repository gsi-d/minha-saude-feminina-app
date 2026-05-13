import type { FinalizarCadastroInput, LoginInput, Usuario } from '../../domain/auth/types';
import type { AuthRepository } from './auth.types';

export class SupabaseAuthDataSource implements AuthRepository {
  async login(_input: LoginInput): Promise<Usuario | null> {
    throw new Error('Supabase auth login not implemented');
  }

  async finalizarCadastro(_input: FinalizarCadastroInput): Promise<Usuario | null> {
    throw new Error('Supabase auth signup not implemented');
  }
}
