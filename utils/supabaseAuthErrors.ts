export function isInvalidLoginCredentialsError(error: unknown) {
  return (
    error instanceof Error &&
    error.message.toLowerCase().includes('invalid login credentials')
  );
}

export function isAuthSessionMissingError(error: unknown) {
  return (
    error instanceof Error &&
    error.message.toLowerCase().includes('auth session missing')
  );
}

export function isUserAlreadyRegisteredError(error: unknown) {
  return (
    error instanceof Error &&
    error.message.toLowerCase().includes('user already registered')
  );
}

export function getFriendlySupabaseAuthErrorMessage(error: unknown) {
  if (isUserAlreadyRegisteredError(error)) {
    return 'Este e-mail já está cadastrado. Faça login ou use outro e-mail.';
  }

  if (isInvalidLoginCredentialsError(error)) {
    return 'E-mail ou senha inválidos.';
  }

  if (isAuthSessionMissingError(error)) {
    return 'Sessão não encontrada.';
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Não foi possível concluir a operação.';
}
