import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { RegistroCiclo, CicloPrevisao } from '@/data/ciclo/ciclo.types';
import { createCicloRepository } from '@/data/ciclo/ciclo.repository';

const cicloRepository = createCicloRepository();

interface CicloContextType {
  registros: RegistroCiclo[];
  registroAtivo: RegistroCiclo | null;
  previsao: CicloPrevisao | null;
  carregando: boolean;
  erro: string | null;
  
  novoRegistro: (dataInicio: Date, notas?: string) => Promise<RegistroCiclo>;
  encerrarRegistro: (id: string, dataFim: Date) => Promise<RegistroCiclo>;
  deletarRegistro: (id: string) => Promise<void>;
  atualizarDados: () => Promise<void>;
}

const CicloContext = createContext<CicloContextType | undefined>(undefined);

export function CicloProvider({ children }: { children: React.ReactNode }) {
  const [registros, setRegistros] = useState<RegistroCiclo[]>([]);
  const [registroAtivo, setRegistroAtivo] = useState<RegistroCiclo | null>(null);
  const [previsao, setPrevisao] = useState<CicloPrevisao | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const atualizarDados = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      
      const [regs, ativo, prev] = await Promise.all([
        cicloRepository.obterRegistros(),
        cicloRepository.obterRegistroAtivo(),
        cicloRepository.calcularPrevisao(),
      ]);

      setRegistros(regs);
      setRegistroAtivo(ativo);
      setPrevisao(prev);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : 'Erro ao atualizar dados';
      setErro(mensagem);
      console.error(mensagem);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    atualizarDados();
  }, [atualizarDados]);

  const novoRegistro = useCallback(async (dataInicio: Date, notas?: string) => {
    try {
      setErro(null);
      const registro = await cicloRepository.novoRegistro(dataInicio, notas);
      await atualizarDados();
      return registro;
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : 'Erro ao criar registro';
      setErro(mensagem);
      throw err;
    }
  }, [atualizarDados]);

  const encerrarRegistro = useCallback(async (id: string, dataFim: Date) => {
    try {
      setErro(null);
      const registro = await cicloRepository.encerrarRegistro(id, dataFim);
      await atualizarDados();
      return registro;
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : 'Erro ao encerrar registro';
      setErro(mensagem);
      throw err;
    }
  }, [atualizarDados]);

  const deletarRegistro = useCallback(async (id: string) => {
    try {
      setErro(null);
      await cicloRepository.deletarRegistro(id);
      await atualizarDados();
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : 'Erro ao deletar registro';
      setErro(mensagem);
      throw err;
    }
  }, [atualizarDados]);

  return (
    <CicloContext.Provider
      value={{
        registros,
        registroAtivo,
        previsao,
        carregando,
        erro,
        novoRegistro,
        encerrarRegistro,
        deletarRegistro,
        atualizarDados,
      }}
    >
      {children}
    </CicloContext.Provider>
  );
}

export function useCiclo() {
  const context = useContext(CicloContext);
  if (context === undefined) {
    throw new Error('useCiclo deve ser usado dentro de CicloProvider');
  }
  return context;
}
