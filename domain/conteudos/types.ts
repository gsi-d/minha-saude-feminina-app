import { enumTipoUsuario } from '../../constants/enums';

export interface Conteudo {
  id: string;
  titulo: string;
  resumo: string;
  conteudoCompleto: string;
  tag: string;
  tipo: enumTipoUsuario;
}
