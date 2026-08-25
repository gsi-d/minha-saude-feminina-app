import { RegistroCiclo, CicloPrevisao } from './ciclo.types';
import { cicloStorage } from './ciclo.storage';

function gerarId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export class CicloRepository {
  async novoRegistro(dataInicio: Date, notas?: string): Promise<RegistroCiclo> {
    const registro: RegistroCiclo = {
      id: gerarId(),
      dataInicio,
      notas,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    await cicloStorage.salvar(registro);
    return registro;
  }

  async encerrarRegistro(id: string, dataFim: Date): Promise<RegistroCiclo> {
    const registro = await cicloStorage.obterPorId(id);
    if (!registro) {
      throw new Error('Registro não encontrado');
    }

    const duracao = Math.floor(
      (dataFim.getTime() - registro.dataInicio.getTime()) / (1000 * 60 * 60 * 24)
    );

    const atualizado: RegistroCiclo = {
      ...registro,
      dataFim,
      duracaoEmDias: duracao + 1,
      atualizadoEm: new Date(),
    };

    await cicloStorage.salvar(atualizado);
    return atualizado;
  }

  async obterRegistros(): Promise<RegistroCiclo[]> {
    const registros = await cicloStorage.obterTodos();
    return registros.sort(
      (a, b) => new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime()
    );
  }

  async obterRegistroAtivo(): Promise<RegistroCiclo | null> {
    const registros = await this.obterRegistros();
    return registros.find(r => !r.dataFim) || null;
  }

  async deletarRegistro(id: string): Promise<void> {
    await cicloStorage.deletar(id);
  }

  async calcularPrevisao(): Promise<CicloPrevisao> {
    const registros = await this.obterRegistros();
    
    if (registros.length === 0) {
      return {
        diasParaProximo: 0,
        cicloPadrao: 28,
      };
    }

    // Calcula duração média do ciclo (intervalo entre inícios)
    let duracoesCiclos: number[] = [];
    for (let i = 1; i < registros.length; i++) {
      const duracao = Math.floor(
        (registros[i - 1].dataInicio.getTime() - registros[i].dataInicio.getTime()) / 
        (1000 * 60 * 60 * 24)
      );
      if (duracao > 0) {
        duracoesCiclos.push(duracao);
      }
    }

    const cicloPadrao = duracoesCiclos.length > 0
      ? Math.round(duracoesCiclos.reduce((a, b) => a + b, 0) / duracoesCiclos.length)
      : 28;

    const ultimoRegistro = registros[0];
    const proximoInicio = new Date(ultimoRegistro.dataInicio);
    proximoInicio.setDate(proximoInicio.getDate() + cicloPadrao);

    const diasParaProximo = Math.ceil(
      (proximoInicio.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    const proximaFim = new Date(proximoInicio);
    proximaFim.setDate(proximaFim.getDate() + (ultimoRegistro.duracaoEmDias || 5) - 1);

    return {
      proximoInicio,
      proximaFim,
      diasParaProximo,
      cicloPadrao,
    };
  }

  async obterRegistrosPorMes(ano: number, mes: number): Promise<RegistroCiclo[]> {
    const registros = await this.obterRegistros();
    return registros.filter(r => {
      const data = new Date(r.dataInicio);
      return data.getFullYear() === ano && data.getMonth() === mes;
    });
  }
}

export const createCicloRepository = () => new CicloRepository();
