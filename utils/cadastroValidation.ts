export function getCadastroValidationError(input: {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  dataNascimento: string;
}) {
  const nome = input.nome.trim();
  const email = input.email.trim();
  const senha = input.senha.trim();
  const telefone = input.telefone.trim();
  const dataNascimento = input.dataNascimento.trim();

  if (!nome || !email || !senha || !telefone || !dataNascimento) {
    return 'Por favor, preencha todos os campos.';
  }

  if (senha.length < 6) {
    return 'A senha deve ter pelo menos 6 caracteres.';
  }

  return null;
}
