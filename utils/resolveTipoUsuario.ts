import { enumTipoUsuario } from "../constants/enums";

export function resolveTipoUsuario(
  tipo: enumTipoUsuario | string | number | undefined | null,
): string {
  // Garantimos que o 'tipo' seja comparado corretamente
  switch (tipo) {
    case enumTipoUsuario.Adolescente:
    case 1:
      return "Adolescente";
    case enumTipoUsuario.Gestante:
    case 2:
      return "Gestante";
    case enumTipoUsuario.Tentante:
    case 3:
      return "Tentante";
    case enumTipoUsuario.Menopausa:
    case 4:
      return "Menopausa";
    default:
      return "Não Definido";
  }
}
