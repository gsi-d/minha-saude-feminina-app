import type { FinalizarCadastroInput, LoginInput, Usuario } from '../../domain/auth/types';

export interface AuthRepository {
  login(input: LoginInput): Promise<Usuario | null>;
  finalizarCadastro(input: FinalizarCadastroInput): Promise<Usuario | null>;
}
