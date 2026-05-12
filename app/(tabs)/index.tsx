import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Card, IconButton, Text, useTheme } from "react-native-paper";

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* --- INÍCIO DO CABEÇALHO CUSTOMIZADO --- */}
      <View style={styles.header}>
        <View style={styles.userSection}>
          {/* Pode ser Avatar.Image se tiver a URL da foto, ou Avatar.Text como fallback */}
          <Avatar.Text
            size={48}
            label="MS"
            style={{ backgroundColor: theme.colors.primaryContainer }}
          />

          <View style={styles.greetingText}>
            <Text variant="labelLarge" style={{ color: theme.colors.outline }}>
              Bom dia,
            </Text>
            <Text
              variant="titleLarge"
              style={{ fontWeight: "bold", color: theme.colors.onBackground }}
            >
              Maria Silva
            </Text>
          </View>
        </View>

        <IconButton
          icon="bell-outline"
          iconColor={theme.colors.onBackground}
          size={24}
          onPress={() => console.log("Abrir notificações")}
        />
      </View>
      {/* --- FIM DO CABEÇALHO --- */}

      {/* Conteúdo da Tela */}
      <Text variant="bodyLarge" style={styles.subtitle}>
        Aqui está o resumo do seu ciclo hoje.
      </Text>

      <Card style={styles.card} elevation={2}>
        <Card.Content>
          <Text variant="titleLarge">Fase Folicular</Text>
          <Text variant="bodyMedium" style={{ marginTop: 8 }}>
            Dia 8 do seu ciclo. É um ótimo momento para atividades físicas mais
            intensas e iniciar novos projetos.
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  greetingText: {
    marginLeft: 12,
  },
  subtitle: {
    opacity: 0.7,
    marginBottom: 24,
  },
  card: {
    borderRadius: 16,
  },
});
