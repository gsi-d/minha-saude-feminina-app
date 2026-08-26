export interface RegistroCiclo {
  id: string;
  dataInicio: Date;
  dataFim?: Date;
  duracaoEmDias?: number;
  notas?: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface CicloPrevisao {
  proximoInicio?: Date;
  proximaFim?: Date;
  diasParaProximo: number;
  cicloPadrao: number;
}
