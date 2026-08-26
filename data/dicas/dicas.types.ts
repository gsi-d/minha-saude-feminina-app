import { enumTipoUsuario } from '../../constants/enums';

export interface Dica {
  id: string;
  titulo: string;
  texto: string;
  tag: string;
  tipo: enumTipoUsuario;
  categoriaId: string | null;
  categoriaNome: string | null;
  dataExibicaoSugerida: Date | null;
}
