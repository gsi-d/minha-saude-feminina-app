import React, { createContext, ReactNode, useContext, useState } from 'react';

import { createAuthRepositoryFromEnv } from '../data/auth/auth.repository';
import type { CadastroBasico, PerfilCadastro, Usuario } from '../domain/auth/types';

interface AuthContextData {
  usuario: Usuario | null;
  cadastroPendente: CadastroBasico | null;
  login: (email: string, senha: string) => Promise<boolean>;
  iniciarCadastro: (dados: CadastroBasico) => void;
  finalizarCadastro: (perfil: PerfilCadastro) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const authRepository = createAuthRepositoryFromEnv(process.env as Record<string, string | undefined>);

function sanitizeUsuario(usuario: Usuario): Usuario {
  const { senha: _senha, ...userData } = usuario;
  return userData;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cadastroPendente, setCadastroPendente] = useState<CadastroBasico | null>(null);

  const login = async (email: string, senha: string) => {
    const usuarioEncontrado = await authRepository.login({ email, senha });

    if (!usuarioEncontrado) {
      return false;
    }

    setUsuario(sanitizeUsuario(usuarioEncontrado));
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

    setUsuario(sanitizeUsuario(novoUsuario));
    setCadastroPendente(null);
    return true;
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
