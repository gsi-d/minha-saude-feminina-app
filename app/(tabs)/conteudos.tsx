import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

// Mock de dados (Estáticos para o modelo básico)
const ARTIGOS_MOCK = [
  {
    id: "1",
    titulo: "Ciclo Menstrual: Entenda as Fases",
    resumo:
      "O ciclo menstrual é dividido em quatro fases: menstrual, folicular, ovulatória e lútea. Cada fase tem características e hormônios específ...",
    categoria: "menstruacao",
  },
  {
    id: "2",
    titulo: "Sintomas Comuns e Alívio",
    resumo:
      "Cólicas, alterações de humor e inchaço são sintomas comuns. Exercícios, bolsa de água...",
    categoria: "menstruacao",
  },
  {
    id: "3",
    titulo: "Produtos de Higiene Menstrual",
    resumo:
      "Absorventes internos e externos, coletores menstruais, calcinhas absorventes - conheça as opções e escolha a mais adequada para s...",
    categoria: "menstruacao",
  },
];

export default function EducacaoBasicScreen() {
  const [filtroAtivo, setFiltroAtivo] = useState("menstruacao");
  const theme = useTheme();
  const router = useRouter();

  // Filtra a lista (Nesse modelo básico, só Menstruação tem dados)
  const artigosFiltrados = ARTIGOS_MOCK.filter(
    (artigo) => artigo.categoria === filtroAtivo,
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.appHeaderTitle}>{""}</Text>

      <View style={[styles.banner, { backgroundColor: theme.colors.tertiary }]}>
        <Text variant="headlineMedium" style={styles.bannerTitle}>
          Educação Sexual
        </Text>
        <Text variant="bodyMedium" style={styles.bannerSubtitle}>
          Informação segura para sua saúde e bem-estar
        </Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          <TouchableOpacity
            style={[
              styles.chip,
              filtroAtivo === "menstruacao"
                ? {
                    backgroundColor: theme.colors.primary,
                    borderColor: theme.colors.primary,
                  }
                : { borderColor: "#F0F0F0" },
            ]}
            onPress={() => setFiltroAtivo("menstruacao")}
          >
            <MaterialCommunityIcons
              name={filtroAtivo === "menstruacao" ? "heart" : "heart-outline"}
              size={18}
              color={
                filtroAtivo === "menstruacao" ? "#FFF" : theme.colors.outline
              }
            />
            <Text
              style={[
                styles.chipText,
                filtroAtivo === "menstruacao"
                  ? { color: "#FFF" }
                  : { color: theme.colors.outline },
              ]}
            >
              Menstruação
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.chip, { borderColor: "#F0F0F0" }]}
            onPress={() => setFiltroAtivo("contracepcao")}
          >
            <MaterialCommunityIcons
              name="shield-outline"
              size={18}
              color={theme.colors.outline}
            />
            <Text style={[styles.chipText, { color: theme.colors.outline }]}>
              Contracepção
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.chip, { borderColor: "#F0F0F0" }]}
            onPress={() => setFiltroAtivo("chat")}
          >
            <MaterialCommunityIcons
              name="chat-outline"
              size={18}
              color={theme.colors.outline}
            />
            <Text style={[styles.chipText, { color: theme.colors.outline }]}>
              Chat
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Text variant="titleLarge" style={styles.sectionTitle}>
        Artigos sobre Menstruação
      </Text>

      <View style={styles.articleList}>
        {artigosFiltrados.map((artigo) => (
          <Card key={artigo.id} style={styles.card} elevation={0}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.cardTitle}>
                {artigo.titulo}
              </Text>
              <Text variant="bodyMedium" style={styles.cardExcerpt}>
                {artigo.resumo}
              </Text>

              <TouchableOpacity
                style={styles.readMoreContainer}
                onPress={() =>
                  router.push({
                    pathname: "/conteudoDetalhe/[id]",
                    params: {
                      id: artigo.id,
                      titulo: artigo.titulo,
                      resumo: artigo.resumo,
                    },
                  })
                }
              >
                <Text
                  style={[styles.readMoreText, { color: theme.colors.primary }]}
                >
                  Ler mais
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={16}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  appHeaderTitle: {
    textAlign: "center",
    paddingTop: 40,
    fontWeight: "bold",
    color: "#000",
    fontSize: 16,
  },
  banner: {
    margin: 20,
    marginTop: 16,
    padding: 24,
    borderRadius: 20,
  },
  bannerTitle: {
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: "#FFF",
    opacity: 0.9,
  },
  filterContainer: {
    marginBottom: 24,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: "#FFF",
  },
  chipText: {
    marginLeft: 8,
    fontWeight: "500",
  },
  sectionTitle: {
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginBottom: 16,
    color: "#000",
  },
  articleList: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#FFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  cardExcerpt: {
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  readMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  readMoreText: {
    fontWeight: "600",
    marginRight: 4,
  },
});
