import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
} from "react-native";
import { Button, List, Text, TextInput, useTheme } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { type PerfilCadastro } from "../domain/auth/types";

type SectionKey = "gravida" | "tentante" | "adolescente" | "menopausa";

export default function CadastroGestandeScreen() {
  const { cadastroPendente, finalizarCadastro } = useAuth();
  const [selectedProfile, setSelectedProfile] = useState<PerfilCadastro | null>(
    null,
  );

  // Estado para gravida
  const [semanaGestacao, setSemanaGestacao] = useState("");
  const [dataPrevistaParto, setDataPrevistaParto] = useState("");

  // Estado para tentante
  const [infoTentante, setInfoTentante] = useState("");

  // Estado para adolescente
  const [infoAdolescente, setInfoAdolescente] = useState("");

  // Estado para menopausa
  const [inicioMenupausa, setInicioMenupausa] = useState("");
  const [sintomasMenupausa, setSintomasMenupausa] = useState("");

  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const toggleSection = (section: SectionKey) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedProfile((prev) => (prev === section ? null : section));
  };

  const handleContinue = async () => {
    if (!selectedProfile) {
      Alert.alert("Erro", "Selecione um perfil para continuar.");
      return;
    }

    if (!cadastroPendente) {
      Alert.alert(
        "Erro",
        "Preencha primeiro os dados da etapa inicial do cadastro.",
      );
      router.back();
      return;
    }

    setLoading(true);

    const sucesso = await finalizarCadastro(selectedProfile);

    setLoading(false);

    if (sucesso) {
      router.replace("/(tabs)");
    } else {
      Alert.alert("Erro", "Não foi possível concluir o cadastro.");
    }
  };

  const canContinue = selectedProfile !== null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text
            variant="displaySmall"
            style={[styles.title, { color: theme.colors.primary }]}
          >
            Ciclo+
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Para te oferecer a melhor experiência, queremos conhecer um pouco
            mais sobre você.
          </Text>

          <List.Section style={styles.listSection}>
            <List.Accordion
              title="Estou grávida"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="baby-face-outline"
                  color={selectedProfile === "gravida" ? "#fff" : undefined}
                />
              )}
              right={(props) => (
                <List.Icon
                  {...props}
                  icon={
                    selectedProfile === "gravida"
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  color={selectedProfile === "gravida" ? "#fff" : undefined}
                />
              )}
              expanded={selectedProfile === "gravida"}
              onPress={() => toggleSection("gravida")}
              style={[
                styles.accordion,
                selectedProfile === "gravida" && {
                  backgroundColor: theme.colors.primary,
                },
              ]}
              titleStyle={{
                color: selectedProfile === "gravida" ? "#fff" : undefined,
              }}
            >
              <View style={styles.accordionContent}>
                <TextInput
                  label="Semana de Gestação"
                  mode="outlined"
                  keyboardType="numeric"
                  value={semanaGestacao}
                  onChangeText={setSemanaGestacao}
                  placeholder="Ex: 12"
                  style={styles.input}
                />

                <TextInput
                  label="Data Prevista do Parto"
                  mode="outlined"
                  value={dataPrevistaParto}
                  onChangeText={setDataPrevistaParto}
                  placeholder="DD/MM/YYYY"
                  style={styles.input}
                />
              </View>
            </List.Accordion>

            <List.Accordion
              title="Estou tentando engravidar"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="heart-outline"
                  color={selectedProfile === "tentante" ? "#fff" : undefined}
                />
              )}
              right={(props) => (
                <List.Icon
                  {...props}
                  icon={
                    selectedProfile === "tentante"
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  color={selectedProfile === "tentante" ? "#fff" : undefined}
                />
              )}
              expanded={selectedProfile === "tentante"}
              onPress={() => toggleSection("tentante")}
              style={[
                styles.accordion,
                selectedProfile === "tentante" && {
                  backgroundColor: theme.colors.primary,
                },
              ]}
              titleStyle={{
                color: selectedProfile === "tentante" ? "#fff" : undefined,
              }}
            >
              <View style={styles.accordionContent}>
                <TextInput
                  label="Informações sobre sua tentativa"
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  value={infoTentante}
                  onChangeText={setInfoTentante}
                  placeholder="Descreva há quanto tempo está tentando, medicações, etc..."
                  style={styles.input}
                />
              </View>
            </List.Accordion>

            <List.Accordion
              title="Quero acompanhar meu ciclo"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="account-school-outline"
                  color={selectedProfile === "adolescente" ? "#fff" : undefined}
                />
              )}
              right={(props) => (
                <List.Icon
                  {...props}
                  icon={
                    selectedProfile === "adolescente"
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  color={selectedProfile === "adolescente" ? "#fff" : undefined}
                />
              )}
              expanded={selectedProfile === "adolescente"}
              onPress={() => toggleSection("adolescente")}
              style={[
                styles.accordion,
                selectedProfile === "adolescente" && {
                  backgroundColor: theme.colors.primary,
                },
              ]}
              titleStyle={{
                color: selectedProfile === "adolescente" ? "#fff" : undefined,
              }}
            >
              <View style={styles.accordionContent}>
                <TextInput
                  label="Informações adicionais"
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  value={infoAdolescente}
                  onChangeText={setInfoAdolescente}
                  placeholder="Se quiser, conte um pouco sobre seus sintomas ou objetivos."
                  style={styles.input}
                />
              </View>
            </List.Accordion>

            <List.Accordion
              title="Estou na menopausa"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="thermometer"
                  color={selectedProfile === "menopausa" ? "#fff" : undefined}
                />
              )}
              right={(props) => (
                <List.Icon
                  {...props}
                  icon={
                    selectedProfile === "menopausa"
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  color={selectedProfile === "menopausa" ? "#fff" : undefined}
                />
              )}
              expanded={selectedProfile === "menopausa"}
              onPress={() => toggleSection("menopausa")}
              style={[
                styles.accordion,
                selectedProfile === "menopausa" && {
                  backgroundColor: theme.colors.primary,
                },
              ]}
              titleStyle={{
                color: selectedProfile === "menopausa" ? "#fff" : undefined,
              }}
            >
              <View style={styles.accordionContent}>
                <TextInput
                  label="Data de Início da Menopausa"
                  mode="outlined"
                  value={inicioMenupausa}
                  onChangeText={setInicioMenupausa}
                  placeholder="DD/MM/YYYY"
                  style={styles.input}
                />

                <TextInput
                  label="Sintomas"
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  value={sintomasMenupausa}
                  onChangeText={setSintomasMenupausa}
                  placeholder="Descreva seus sintomas..."
                  style={styles.input}
                />
              </View>
            </List.Accordion>
          </List.Section>

          <Button
            mode="contained"
            onPress={handleContinue}
            loading={loading}
            disabled={loading || !canContinue}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Criar Conta
          </Button>
          <Button
            mode="text"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            Voltar
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 24,
    opacity: 0.7,
  },
  listSection: {
    marginBottom: 24,
  },
  accordion: {
    marginBottom: 2,
    backgroundColor: "transparent",
    borderRadius: 16,
    overflow: "hidden",
  },
  accordionContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    marginBottom: 16,
    borderRadius: 16,
  },
  button: {
    marginTop: 8,
    borderRadius: 20,
  },
  skipButton: {
    marginTop: 16,
  },
  backButton: {
    marginTop: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
