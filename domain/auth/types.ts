import { enumTipoUsuario } from '../../constants/enums';

export type PerfilCadastro = 'gravida' | 'tentante' | 'adolescente' | 'menopausa';

export interface CadastroBasico {
  nome: string;
  email: string;
  senha: string;
  dataNascimento: string;
  telefone: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  dataNascimento: string;
  tipoUsuario: enumTipoUsuario;
  administrador: boolean;
  dataCadastro: string;
  telefone: string;
}

export interface LoginInput {
  email: string;
  senha: string;
}

export interface FinalizarCadastroInput {
  cadastro: CadastroBasico;
  perfil: PerfilCadastro;
}
