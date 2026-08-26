import { CartaoCicloAtivo } from "@/components/CartaoCicloAtivo";
import { CartaoPrevisao } from "@/components/CartaoPrevisao";
import { EncerrarRegistroDialog } from "@/components/EncerrarRegistroDialog";
import { HistoricoRegistros } from "@/components/HistoricoRegistros";
import { NovoRegistroDialog } from "@/components/NovoRegistroDialog";
import { useCiclo } from "@/contexts/CicloContext";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, FAB, Text } from "react-native-paper";

export default function CicloScreen() {
  const {
    registros,
    registroAtivo,
    previsao,
    carregando,
    novoRegistro,
    encerrarRegistro,
    deletarRegistro,
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

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {registroAtivo && (
          <CartaoCicloAtivo
            registro={registroAtivo}
            onEncerrar={handleAbrirEncerrar}
            carregando={carregandoAcao}
          />
        )}

        {previsao && (
          <CartaoPrevisao previsao={previsao} />
        )}

        <View style={styles.secaoHistorico}>
          <Text style={styles.sectionTitle}>Histórico de Ciclos</Text>
          <HistoricoRegistros
            registros={registros.filter(r => r.id !== registroAtivo?.id)}
            onDeletar={handleDeletarRegistro}
            carregando={carregandoAcao}
          />
        </View>

        <View style={styles.padding} />
      </ScrollView>

      <FAB
        icon="plus"
        onPress={() => setDialogNovoVisivel(true)}
        style={styles.fab}
        label="Novo Ciclo"
      />

      <NovoRegistroDialog
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
  appHeaderTitle: {
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 16,
    fontWeight: "bold",
    color: "#000",
    fontSize: 24,
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
