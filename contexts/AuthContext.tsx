import { enumTipoUsuario } from '@/constants/enums';
import React, { createContext, ReactNode, useContext, useState } from 'react';


export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  dataNascimento: string;
  tipoUsuario: enumTipoUsuario;
  administrador: boolean;
  dataCadastro: string;
  telefone: string;
}

// 2. Nosso "Banco de Dados" em memória
let usuariosDB: Usuario[] = [
  {
    id: '1',
    nome: 'Maria Padrão',
    email: 'maria@ciclo.com',
    senha: '123',
    dataNascimento: '1995-05-20',
    tipoUsuario: enumTipoUsuario.Adolescente,
    administrador: false,
    dataCadastro: new Date().toISOString(),
    telefone: '11999999999',
  },
  {
    id: '2',
    nome: 'Admin',
    email: 'admin',
    senha: 'admin',
    dataNascimento: '1990-01-01',
    tipoUsuario: enumTipoUsuario.NaoDefinido,
    administrador: true,
    dataCadastro: new Date().toISOString(),
    telefone: '11988888888',
  },
  {
    id: '3',
    nome: 'Pessoa Padrão',
    email: 'pessoa@ciclo.com',
    senha: '123',
    dataNascimento: '1995-05-20',
    tipoUsuario: enumTipoUsuario.Gestante,
    administrador: false,
    dataCadastro: new Date().toISOString(),
    telefone: '11999999999',
  }
];

interface AuthContextData {
  usuario: Usuario | null;
  login: (email: string, senha: string) => Promise<boolean>;
  cadastrar: (novoUsuario: Omit<Usuario, 'id' | 'dataCadastro'>) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  // Simula uma chamada assíncrona ao banco
  const login = async (email: string, senha: string) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const userEncontrado = usuariosDB.find(u => u.email === email && u.senha === senha);

        if (userEncontrado) {
          const { senha: _, ...userData } = userEncontrado;
          setUsuario(userData as Usuario);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  };
  
  const cadastrar = async (dados: Omit<Usuario, 'id' | 'dataCadastro'>) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const emailJaExiste = usuariosDB.some(u => u.email === dados.email);
        if (emailJaExiste) {
          resolve(false);
          return;
        }

        const novoUsuario: Usuario = {
          ...dados,
          id: Math.random().toString(36).substring(2, 9),
          dataCadastro: new Date().toISOString(),
        };

        usuariosDB.push(novoUsuario);

        const { senha: _, ...userData } = novoUsuario;
        setUsuario(userData as Usuario);
        resolve(true);
      }, 800);
    });
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, cadastrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);