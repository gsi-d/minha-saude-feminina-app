import { enumTipoUsuario } from '../constants/enums';
import type { CadastroBasico, PerfilCadastro, Usuario } from '../domain/auth/types';

interface FinalizarCadastroResultado {
  success: boolean;
  novoUsuario?: Usuario;
  usuariosAtualizados: Usuario[];
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
): Omit<Usuario, 'id' | 'dataCadastro'> {
  return {
    ...dadosBasicos,
    tipoUsuario: mapPerfilParaTipoUsuario(perfil),
    administrador: false,
  };
}

export function finalizeCadastroEmMemoria(
  usuariosAtuais: Usuario[],
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

  const novoUsuario: Usuario = {
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
