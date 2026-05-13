import { enumTipoUsuario } from '../../constants/enums';
import type { FinalizarCadastroInput, LoginInput, Usuario } from '../../domain/auth/types';
import { finalizeCadastroEmMemoria } from '../../contexts/authRegistration';
import type { AuthRepository } from './auth.types';

function createSeedUsuarios(): Usuario[] {
  return [
    {
      id: '1',
      nome: 'Maria Padrão',
      email: 'maria@ciclo.com',
      senha: '123',
      dataNascimento: '1995-05-20',
      tipoUsuario: enumTipoUsuario.Adolescente,
      administrador: false,
      dataCadastro: new Date().toISOString(),
      telefone: '11999999999',
    },
    {
      id: '2',
      nome: 'Admin',
      email: 'admin',
      senha: 'admin',
      dataNascimento: '1990-01-01',
      tipoUsuario: enumTipoUsuario.NaoDefinido,
      administrador: true,
      dataCadastro: new Date().toISOString(),
      telefone: '11988888888',
    },
    {
      id: '3',
      nome: 'Pessoa Padrão',
      email: 'pessoa@ciclo.com',
      senha: '123',
      dataNascimento: '1995-05-20',
      tipoUsuario: enumTipoUsuario.Gestante,
      administrador: false,
      dataCadastro: new Date().toISOString(),
      telefone: '11999999999',
    },
  ];
}

export class MemoryAuthDataSource implements AuthRepository {
  private usuarios: Usuario[];

  constructor(seedUsuarios: Usuario[] = createSeedUsuarios()) {
    this.usuarios = seedUsuarios;
  }

  async login(input: LoginInput): Promise<Usuario | null> {
    const usuario = this.usuarios.find(
      (item) => item.email === input.email && item.senha === input.senha
    );

    return usuario ?? null;
  }

  async finalizarCadastro(input: FinalizarCadastroInput): Promise<Usuario | null> {
    const resultado = finalizeCadastroEmMemoria(this.usuarios, input.cadastro, input.perfil);

    if (!resultado.success || !resultado.novoUsuario) {
      return null;
    }

    this.usuarios = resultado.usuariosAtualizados;
    return resultado.novoUsuario;
  }
}
