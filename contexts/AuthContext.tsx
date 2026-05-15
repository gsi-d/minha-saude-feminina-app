import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { createAuthRepository } from '../data/auth/auth.repository';
import type { CadastroBasico, PerfilCadastro, Usuario } from '../domain/auth/types';

interface AuthContextData {
  usuario: Usuario | null;
  authReady: boolean;
  cadastroPendente: CadastroBasico | null;
  login: (email: string, senha: string) => Promise<boolean>;
  iniciarCadastro: (dados: CadastroBasico) => void;
  finalizarCadastro: (perfil: PerfilCadastro) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const authRepository = createAuthRepository();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [cadastroPendente, setCadastroPendente] = useState<CadastroBasico | null>(null);

  useEffect(() => {
    let ativo = true;

    const restoreSession = async () => {
      try {
        const usuarioAtual = await authRepository.getCurrentUsuario();
        if (ativo) {
          setUsuario(usuarioAtual);
          setAuthReady(true);
        }
      } catch (error) {
        console.error(error);
        if (ativo) {
          setAuthReady(true);
        }
      }
    };

    void restoreSession();

    return () => {
      ativo = false;
    };
  }, []);

  const login = async (email: string, senha: string) => {
    const usuarioEncontrado = await authRepository.login({ email, senha });

    if (!usuarioEncontrado) {
      return false;
    }

    setUsuario(usuarioEncontrado);
    return true;
  };

  const iniciarCadastro = (dados: CadastroBasico) => {
    setCadastroPendente(dados);
  };

  const finalizarCadastro = async (perfil: PerfilCadastro) => {
    if (!cadastroPendente) {
      return false;
    }

    const novoUsuario = await authRepository.finalizarCadastro({
      cadastro: cadastroPendente,
      perfil,
    });

    if (!novoUsuario) {
      return false;
    }

    setUsuario(novoUsuario);
    setCadastroPendente(null);
    return true;
  };

  const logout = async () => {
    await authRepository.logout();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{ usuario, authReady, cadastroPendente, login, iniciarCadastro, finalizarCadastro, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
