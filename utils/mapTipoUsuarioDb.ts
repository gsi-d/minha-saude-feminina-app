import { enumTipoUsuario } from '../constants/enums';

function normalizeTipoUsuarioLabel(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s_-]+/g, '');
}

function obterRotulosTipoUsuario(tipoUsuario: enumTipoUsuario): string[] {
  switch (tipoUsuario) {
    case enumTipoUsuario.Adolescente:
      return ['adolescente', 'adolescencia', 'tipopessoaadolescente', 'perfiladolescente'];
    case enumTipoUsuario.Gestante:
      return ['gestante', 'gravida', 'gravidez', 'tipopessoagestante', 'perfilgestante'];
    case enumTipoUsuario.Tentante:
      return ['tentante', 'fertilidade', 'tentandoengravidar', 'tipopessoatentante', 'perfiltentante'];
    case enumTipoUsuario.Menopausa:
      return ['menopausa', 'climaterio', 'tipopessoamenopausa', 'perfilmenopausa'];
    case enumTipoUsuario.Administrador:
      return ['administrador', 'admin'];
    case enumTipoUsuario.NaoDefinido:
    default:
      return ['naodefinido', 'geral', 'todos', 'todas', 'todospublicos', 'publicogeral', 'all', ''];
  }
}

export function mapTipoUsuarioDbToEnum(
  tipoUsuario?: number | string | null,
): enumTipoUsuario {
  if (typeof tipoUsuario === 'string') {
    switch (normalizeTipoUsuarioLabel(tipoUsuario)) {
      case 'adolescente':
        return enumTipoUsuario.Adolescente;
      case 'gestante':
      case 'gravida':
        return enumTipoUsuario.Gestante;
      case 'tentante':
        return enumTipoUsuario.Tentante;
      case 'menopausa':
        return enumTipoUsuario.Menopausa;
      case 'naodefinido':
      case '':
        return enumTipoUsuario.NaoDefinido;
      case 'administrador':
        return enumTipoUsuario.Administrador;
      default:
        return enumTipoUsuario.NaoDefinido;
    }
  }

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

export function tipoUsuarioDbCorrespondeEnum(
  tipoUsuarioDb: number | string | null | undefined,
  tipoUsuario: enumTipoUsuario,
): boolean {
  if (mapTipoUsuarioDbToEnum(tipoUsuarioDb) === tipoUsuario) {
    return true;
  }

  if (typeof tipoUsuarioDb !== 'string') {
    return false;
  }

  const valorNormalizado = normalizeTipoUsuarioLabel(tipoUsuarioDb);
  return obterRotulosTipoUsuario(tipoUsuario).some((rotulo) =>
    rotulo === valorNormalizado
    || valorNormalizado.includes(rotulo)
    || rotulo.includes(valorNormalizado),
  );
}
