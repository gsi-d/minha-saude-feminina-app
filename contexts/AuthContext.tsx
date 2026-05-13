import { enumTipoUsuario } from '@/constants/enums';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
  type CadastroBasico,
  finalizeCadastroEmMemoria,
  type PerfilCadastro,
  type UsuarioAuth,
} from './authRegistration';

export interface Usuario extends UsuarioAuth {}

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
  cadastroPendente: CadastroBasico | null;
  login: (email: string, senha: string) => Promise<boolean>;
  iniciarCadastro: (dados: CadastroBasico) => void;
  finalizarCadastro: (perfil: PerfilCadastro) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cadastroPendente, setCadastroPendente] = useState<CadastroBasico | null>(null);

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

  const iniciarCadastro = (dados: CadastroBasico) => {
    setCadastroPendente(dados);
  };

  const finalizarCadastro = async (perfil: PerfilCadastro) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        if (!cadastroPendente) {
          resolve(false);
          return;
        }

        const resultado = finalizeCadastroEmMemoria(usuariosDB, cadastroPendente, perfil);
        if (!resultado.success || !resultado.novoUsuario) {
          resolve(false);
          return;
        }

        usuariosDB = resultado.usuariosAtualizados;
        const { senha: _, ...userData } = resultado.novoUsuario;
        setUsuario(userData as Usuario);
        setCadastroPendente(null);
        resolve(true);
      }, 800);
    });
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{ usuario, cadastroPendente, login, iniciarCadastro, finalizarCadastro, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
