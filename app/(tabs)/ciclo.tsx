import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, FAB, ActivityIndicator, Button } from "react-native-paper";
import { useCiclo } from "@/contexts/CicloContext";
import { CartaoCicloAtivo } from "@/components/CartaoCicloAtivo";
import { CartaoPrevisao } from "@/components/CartaoPrevisao";
import { CartaoEstatisticas } from "@/components/CartaoEstatisticas";
import { CalendarioCiclos } from "@/components/CalendarioCiclos";
import { HistoricoRegistros } from "@/components/HistoricoRegistros";
import { NovoRegistroDialogCalendario } from "@/components/NovoRegistroDialogCalendario";
import { EncerrarRegistroDialog } from "@/components/EncerrarRegistroDialog";

export default function CicloScreen() {
  const {
    registros,
    registroAtivo,
    previsao,
    carregando,
    erro,
    novoRegistro,
    encerrarRegistro,
    deletarRegistro,
    atualizarDados,
  } = useCiclo();

  const [dialogNovoVisivel, setDialogNovoVisivel] = useState(false);
  const [dialogEncerrarVisivel, setDialogEncerrarVisivel] = useState(false);
  const [carregandoAcao, setCarregandoAcao] = useState(false);

  const handleNovoRegistro = async (dataInicio: Date, notas?: string) => {
    setCarregandoAcao(true);
    try {
      await novoRegistro(dataInicio, notas);
    } finally {
      setCarregandoAcao(false);
    }
  };

  const handleEncerrarRegistro = async (dataFim: Date) => {
    if (!registroAtivo) return;
    setCarregandoAcao(true);
    try {
      await encerrarRegistro(registroAtivo.id, dataFim);
    } finally {
      setCarregandoAcao(false);
    }
  };

  const handleDeletarRegistro = async (id: string) => {
    setCarregandoAcao(true);
    try {
      await deletarRegistro(id);
    } finally {
      setCarregandoAcao(false);
    }
  };

  const handleAbrirEncerrar = () => {
    if (registroAtivo) {
      setDialogEncerrarVisivel(true);
    }
  };

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator animating size="large" color="#D946A6" />
        <Text style={styles.textoCarregando}>Carregando...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.erro}>
        <Text style={styles.textoErro}>⚠️ Erro ao carregar</Text>
        <Text style={styles.detalhesErro}>{erro}</Text>
        <Button 
          mode="contained" 
          onPress={() => atualizarDados()}
          style={{ marginTop: 16 }}
        >
          Tentar Novamente
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {registroAtivo ? (
          <CartaoCicloAtivo
            registro={registroAtivo}
            onEncerrar={handleAbrirEncerrar}
            carregando={carregandoAcao}
          />
        ) : (
          <View style={styles.cardVazio}>
            <Text style={styles.textoVazio}>Nenhum ciclo em andamento</Text>
            <Text style={styles.subtextoVazio}>Clique no + para registrar um novo ciclo</Text>
          </View>
        )}

        {previsao && (
          <CartaoPrevisao previsao={previsao} />
        )}

        {registros.length > 0 && (
          <>
            <CartaoEstatisticas registros={registros} previsao={previsao} />
            <CalendarioCiclos registros={registros} />
          </>
        )}

        {registros.length > 0 && (
          <View style={styles.secaoHistorico}>
            <Text style={styles.sectionTitle}>Histórico Completo</Text>
            <HistoricoRegistros
              registros={registros.filter(r => r.id !== registroAtivo?.id)}
              onDeletar={handleDeletarRegistro}
              carregando={carregandoAcao}
            />
          </View>
        )}

        <View style={styles.padding} />
      </ScrollView>

      <FAB
        icon="plus"
        onPress={() => setDialogNovoVisivel(true)}
        style={styles.fab}
        label="Novo Ciclo"
      />

      <NovoRegistroDialogCalendario
        visivel={dialogNovoVisivel}
        carregando={carregandoAcao}
        onFechar={() => setDialogNovoVisivel(false)}
        onSalvar={handleNovoRegistro}
      />

      <EncerrarRegistroDialog
        visivel={dialogEncerrarVisivel}
        registro={registroAtivo}
        carregando={carregandoAcao}
        onFechar={() => setDialogEncerrarVisivel(false)}
        onConfirmar={handleEncerrarRegistro}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff6f8",
  },
  carregando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff6f8",
  },
  textoCarregando: {
    marginTop: 16,
    color: "#D946A6",
    fontWeight: "600",
  },
  erro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff6f8",
    padding: 20,
  },
  textoErro: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D946A6",
    marginBottom: 8,
  },
  detalhesErro: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  appHeaderTitle: {
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 16,
    fontWeight: "bold",
    color: "#000",
    fontSize: 24,
  },
  cardVazio: {
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 24,
    backgroundColor: "#FFF9FB",
    borderColor: "#F0D0E0",
    borderWidth: 2,
    borderRadius: 16,
    alignItems: "center",
  },
  textoVazio: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  subtextoVazio: {
    fontSize: 13,
    color: "#999",
  },
  secaoHistorico: {
    marginTop: 12,
  },
  sectionTitle: {
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginBottom: 12,
    color: "#000",
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
  },
  padding: {
    height: 80,
  },
});
