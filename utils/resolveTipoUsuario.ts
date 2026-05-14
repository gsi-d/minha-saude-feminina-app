import { enumTipoUsuario } from '../constants/enums';

export function resolveTipoUsuario(tipoUsuario?: string | null): enumTipoUsuario {
  if (!tipoUsuario) {
    return enumTipoUsuario.NaoDefinido;
  }

  const tipoEncontrado = Object.values(enumTipoUsuario).find(
    (valor) => valor.toLowerCase() === tipoUsuario.toLowerCase()
  );

  return tipoEncontrado ?? enumTipoUsuario.NaoDefinido;
}
