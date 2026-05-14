import { enumTipoUsuario } from '../constants/enums';

export function mapTipoUsuarioDbToEnum(tipoUsuario?: number | null): enumTipoUsuario {
  switch (tipoUsuario) {
    case 1:
      return enumTipoUsuario.Adolescente;
    case 2:
      return enumTipoUsuario.Gestante;
    case 3:
      return enumTipoUsuario.Tentante;
    case 4:
      return enumTipoUsuario.Menopausa;
    case 5:
    default:
      return enumTipoUsuario.NaoDefinido;
  }
}

export function mapTipoUsuarioEnumToDb(tipoUsuario: enumTipoUsuario): number {
  switch (tipoUsuario) {
    case enumTipoUsuario.Adolescente:
      return 1;
    case enumTipoUsuario.Gestante:
      return 2;
    case enumTipoUsuario.Tentante:
      return 3;
    case enumTipoUsuario.Menopausa:
      return 4;
    case enumTipoUsuario.NaoDefinido:
    default:
      return 5;
  }
}
