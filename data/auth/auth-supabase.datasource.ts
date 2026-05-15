import { enumTipoUsuario } from '../../constants/enums';
import type { FinalizarCadastroInput, LoginInput, PerfilCadastro, Usuario } from '../../domain/auth/types';
import { getSupabaseClient } from '../../services/supabase/client';
import {
  mapSupabaseUsuarioRowToDomain,
  type SupabaseUsuarioRow,
} from './auth-supabase.mapper';
import type { AuthRepository } from './auth.types';

// CORREÇÃO AQUI: O mapeamento precisa bater com as strings do seu Enum
function mapearPerfilParaEnum(perfil: PerfilCadastro): enumTipoUsuario {
  const depara: Record<string, enumTipoUsuario> = {
    'adolescente': enumTipoUsuario.Adolescente,
    'gravida':      enumTipoUsuario.Gestante,
    'gestante':     enumTipoUsuario.Gestante, // Adicionado por segurança
    'tentante':     enumTipoUsuario.Tentante,
    'menopausa':    enumTipoUsuario.Menopausa,
  };
  
  // Converte para minúsculo para evitar erro de digitação (ex: 'Gravida' vs 'gravida')
  const chave = perfil.toLowerCase();
  return depara[chave] || enumTipoUsuario.NaoDefinido;
}

export class SupabaseAuthDataSource implements AuthRepository {
  
  async login(input: LoginInput): Promise<Usuario | null> {
    const client = getSupabaseClient(process.env as Record<string, string | undefined>);
    
    const { data: authData, error: authError } = await client.auth.signInWithPassword({
      email: input.email.trim().toLowerCase(),
      password: input.senha.trim(),
    });

    if (authError) throw authError;
    if (!authData.user) return null;

    const { data, error } = await client
      .from('TB_USUARIO')
      .select('*')
      .eq('ID_AUTH', authData.user.id)
      .single();

    if (error) throw error;
    return data ? mapSupabaseUsuarioRowToDomain(data as SupabaseUsuarioRow) : null;
  }

  async finalizarCadastro(input: FinalizarCadastroInput): Promise<Usuario | null> {
    const client = getSupabaseClient(process.env as Record<string, string | undefined>);
    const { email, senha, nome } = input.cadastro;

    const { data: authData, error: authError } = await client.auth.signUp({
      email: email.trim().toLowerCase(),
      password: senha.trim(),
    });

    if (authError) throw authError;
    if (!authData.user) return null;

    // Obtém a string do Enum (ex: 'Gestante' ou 'Menopausa')
    const tipoUsuarioValor = mapearPerfilParaEnum(input.perfil);

    const { data: dbData, error: dbError } = await client
      .from('TB_USUARIO')
      .insert({
        ID_AUTH: authData.user.id,
        NM_USUARIO: nome,
        DS_EMAIL: email.trim().toLowerCase(),
        TP_USUARIO: tipoUsuarioValor, // Agora envia a String correta
        IS_ADM: false 
      })
      .select()
      .single();

    if (dbError) {
      // Se der erro aqui, verifique se a coluna TP_USUARIO no Supabase é TEXT
      console.error("Erro ao salvar na TB_USUARIO:", dbError.message);
      throw dbError;
    }

    return dbData ? mapSupabaseUsuarioRowToDomain(dbData as SupabaseUsuarioRow) : null;
  }
}