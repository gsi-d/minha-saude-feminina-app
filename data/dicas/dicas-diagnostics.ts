export interface ErroDicasDiagnostico {
  code: string | null;
  message: string;
  details: string | null;
  hint: string | null;
}

function obterTexto(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

export function normalizarErroDicas(error: unknown): ErroDicasDiagnostico {
  const value = error && typeof error === "object"
    ? error as Record<string, unknown>
    : null;

  return {
    code: obterTexto(value?.code),
    message: obterTexto(value?.message)
      ?? (error instanceof Error ? error.message : "Erro desconhecido ao carregar dicas."),
    details: obterTexto(value?.details),
    hint: obterTexto(value?.hint),
  };
}

export function registrarDiagnosticoDicas(
  evento: string,
  dados: Record<string, unknown>,
  nivel: "info" | "error" = "info",
) {
  if (typeof __DEV__ === "undefined" || !__DEV__) return;

  console[nivel](`[Dicas] ${evento}`, dados);
}
