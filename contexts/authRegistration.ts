import { enumTipoUsuario } from '../constants/enums';

export type PerfilCadastro = 'gravida' | 'tentante' | 'adolescente' | 'menopausa';

export interface CadastroBasico {
  nome: string;
  email: string;
  senha: string;
  dataNascimento: string;
  telefone: string;
}

export interface UsuarioAuth extends CadastroBasico {
  id: string;
  tipoUsuario: enumTipoUsuario;
  administrador: boolean;
  dataCadastro: string;
}

interface FinalizarCadastroResultado {
  success: boolean;
  novoUsuario?: UsuarioAuth;
  usuariosAtualizados: UsuarioAuth[];
}

export function mapPerfilParaTipoUsuario(perfil: PerfilCadastro): enumTipoUsuario {
  switch (perfil) {
    case 'gravida':
      return enumTipoUsuario.Gestante;
    case 'tentante':
      return enumTipoUsuario.Tentante;
    case 'adolescente':
      return enumTipoUsuario.Adolescente;
    case 'menopausa':
      return enumTipoUsuario.Menopausa;
  }
}

export function buildUsuarioCadastro(
  dadosBasicos: CadastroBasico,
  perfil: PerfilCadastro
): Omit<UsuarioAuth, 'id' | 'dataCadastro'> {
  return {
    ...dadosBasicos,
    tipoUsuario: mapPerfilParaTipoUsuario(perfil),
    administrador: false,
  };
}

export function finalizeCadastroEmMemoria(
  usuariosAtuais: UsuarioAuth[],
  dadosBasicos: CadastroBasico,
  perfil: PerfilCadastro
): FinalizarCadastroResultado {
  const emailJaExiste = usuariosAtuais.some((usuario) => usuario.email === dadosBasicos.email);
  if (emailJaExiste) {
    return {
      success: false,
      usuariosAtualizados: usuariosAtuais,
    };
  }

  const novoUsuario: UsuarioAuth = {
    ...buildUsuarioCadastro(dadosBasicos, perfil),
    id: Math.random().toString(36).substring(2, 9),
    dataCadastro: new Date().toISOString(),
  };

  return {
    success: true,
    novoUsuario,
    usuariosAtualizados: [...usuariosAtuais, novoUsuario],
  };
}
