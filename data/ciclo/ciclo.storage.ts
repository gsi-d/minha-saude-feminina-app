import AsyncStorage from '@react-native-async-storage/async-storage';
import { RegistroCiclo } from './ciclo.types';

const STORAGE_KEY = '@menstrual_cycle_registros';

export class CicloStorage {
  async obterTodos(): Promise<RegistroCiclo[]> {
    try {
      const dados = await AsyncStorage.getItem(STORAGE_KEY);
      if (!dados) return [];
      
      const registros = JSON.parse(dados) as Array<{
        id: string;
        dataInicio: string;
        dataFim?: string;
        duracaoEmDias?: number;
        notas?: string;
        criadoEm: string;
        atualizadoEm: string;
      }>;
      
      return registros.map(r => ({
        ...r,
        dataInicio: new Date(r.dataInicio),
        dataFim: r.dataFim ? new Date(r.dataFim) : undefined,
        criadoEm: new Date(r.criadoEm),
        atualizadoEm: new Date(r.atualizadoEm),
      }));
    } catch (error) {
      console.error('Erro ao obter registros:', error);
      return [];
    }
  }

  async salvar(registro: RegistroCiclo): Promise<void> {
    try {
      const todos = await this.obterTodos();
      const indice = todos.findIndex(r => r.id === registro.id);
      
      const registroSerializado = {
        ...registro,
        dataInicio: registro.dataInicio instanceof Date ? registro.dataInicio.toISOString() : registro.dataInicio,
        dataFim: registro.dataFim ? (registro.dataFim instanceof Date ? registro.dataFim.toISOString() : registro.dataFim) : undefined,
        criadoEm: registro.criadoEm instanceof Date ? registro.criadoEm.toISOString() : registro.criadoEm,
        atualizadoEm: registro.atualizadoEm instanceof Date ? registro.atualizadoEm.toISOString() : registro.atualizadoEm,
      };
      
      if (indice >= 0) {
        todos[indice] = registroSerializado as any;
      } else {
        todos.push(registroSerializado as any);
      }
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Erro ao salvar registro:', error);
      throw error;
    }
  }

  async deletar(id: string): Promise<void> {
    try {
      const todos = await this.obterTodos();
      const filtrados = todos.filter(r => r.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtrados));
    } catch (error) {
      console.error('Erro ao deletar registro:', error);
      throw error;
    }
  }

  async obterPorId(id: string): Promise<RegistroCiclo | null> {
    try {
      const todos = await this.obterTodos();
      return todos.find(r => r.id === id) || null;
    } catch (error) {
      console.error('Erro ao obter registro:', error);
      return null;
    }
  }
}

export const cicloStorage = new CicloStorage();
