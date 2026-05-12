import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";

export default function ConteudoDetalheScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { titulo, resumo } = useLocalSearchParams();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
        <Text variant="titleMedium" style={styles.headerTitle}>
          Artigo
        </Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="headlineMedium" style={styles.title}>
          {titulo}
        </Text>

        <View style={[styles.tag, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.tagText}>Menstruação</Text>
        </View>

        <Text variant="bodyLarge" style={styles.contentBody}>
          {resumo}
          {"\n\n"}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
          {"\n\n"}
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </Text>

        <View style={styles.infoBox}>
          <MaterialCommunityIcons
            name="information"
            size={20}
            color="#9B51E0"
          />
          <Text style={styles.infoText}>
            Lembre-se: Este conteúdo é informativo e não substitui uma consulta
            médica.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontWeight: "bold",
  },
  scrollContent: {
    padding: 24,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 12,
    color: "#000",
  },
  tag: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  tagText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  contentBody: {
    lineHeight: 28,
    color: "#333",
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#F3E5F5",
    padding: 16,
    borderRadius: 12,
    marginTop: 32,
    alignItems: "center",
  },
  infoText: {
    marginLeft: 12,
    flex: 1,
    color: "#4A148C",
    fontSize: 14,
  },
});
