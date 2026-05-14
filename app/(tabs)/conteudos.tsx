import { useAuth } from "@/contexts/AuthContext";
import { createConteudosRepository } from "@/data/conteudos/conteudos.repository";
import type { Conteudo } from "@/domain/conteudos/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";

const conteudosRepository = createConteudosRepository();

const CORES_LAYOUT = {
  headerBackground: "#9B51E0",
  chipAtivo: "#E84C71",
  chipInativo: "#666666",
  chipBackgroundAtivo: "#E84C71",
};

const ICONES_TAGS: Record<string, string> = {
  menstruação: "heart",
  contracepção: "shield-outline",
  "bem-estar": "leaf",
  saúde: "medical-bag",
  chat: "chat-outline",
};

export default function ConteudosScreen() {
  const router = useRouter();
  const { usuario } = useAuth();
  const [conteudosDaUsuaria, setConteudosDaUsuaria] = useState<Conteudo[]>([]);
  const [filtroAtivo, setFiltroAtivo] = useState("");
  const tipoAtual = resolveTipoUsuario(usuario?.tipoUsuario);

  useEffect(() => {
    let ativo = true;

    const loadConteudos = async () => {
      const conteudos = await conteudosRepository.listByTipoUsuario(tipoAtual);
      if (ativo) {
        setConteudosDaUsuaria(conteudos);
      }
    };

    void loadConteudos();

    return () => {
      ativo = false;
    };
  }, [tipoAtual]);

  const tagsDisponiveis = useMemo(() => {
    const tags = conteudosDaUsuaria.map((item) => item.tag);
    return [...new Set(tags)];
  }, [conteudosDaUsuaria]);

  useEffect(() => {
    if (tagsDisponiveis.length > 0 && !tagsDisponiveis.includes(filtroAtivo)) {
      setFiltroAtivo(tagsDisponiveis[0]);
    }

    if (tagsDisponiveis.length === 0 && filtroAtivo) {
      setFiltroAtivo("");
    }
  }, [tagsDisponiveis, filtroAtivo]);

  const artigosExibidos = conteudosDaUsuaria.filter(
    (artigo) => artigo.tag === filtroAtivo,
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.appHeaderTitle}>Minha Saúde Feminina</Text>

      <View
        style={[
          styles.banner,
          { backgroundColor: CORES_LAYOUT.headerBackground },
        ]}
      >
        <Text variant="headlineMedium" style={styles.bannerTitle}>
          Educação e Dicas
        </Text>
        <Text variant="bodyMedium" style={styles.bannerSubtitle}>
          Perfil selecionado:{" "}
          <Text style={{ fontWeight: "bold", color: "#FFF" }}>{tipoAtual}</Text>
        </Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {tagsDisponiveis.map((tag) => {
            const isAtivo = filtroAtivo === tag;
            const iconeBase = ICONES_TAGS[tag] || "text-box-outline";
            const nomeIcone = isAtivo
              ? iconeBase.replace("-outline", "")
              : iconeBase;

            return (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.chip,
                  isAtivo
                    ? {
                        backgroundColor: CORES_LAYOUT.chipBackgroundAtivo,
                        borderColor: CORES_LAYOUT.chipAtivo,
                      }
                    : { borderColor: "#F0F0F0" },
                ]}
                onPress={() => setFiltroAtivo(tag)}
              >
                <MaterialCommunityIcons
                  name={nomeIcone as any}
                  size={18}
                  color={isAtivo ? "#FFF" : CORES_LAYOUT.chipInativo}
                />
                <Text
                  style={[
                    styles.chipText,
                    isAtivo
                      ? { color: "#FFF" }
                      : { color: CORES_LAYOUT.chipInativo },
                  ]}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {filtroAtivo ? (
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Artigos sobre{" "}
          {filtroAtivo.charAt(0).toUpperCase() + filtroAtivo.slice(1)}
        </Text>
      ) : null}

      <View style={styles.articleList}>
        {artigosExibidos.map((artigo) => (
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
                      conteudoCompleto: artigo.conteudoCompleto,
                      tag: artigo.tag,
                    },
                  })
                }
              >
                <Text
                  style={[
                    styles.readMoreText,
                    { color: CORES_LAYOUT.chipAtivo },
                  ]}
                >
                  Ler mais
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={16}
                  color={CORES_LAYOUT.chipAtivo}
                />
              </TouchableOpacity>
            </Card.Content>
          </Card>
        ))}

        {artigosExibidos.length === 0 && (
          <Text style={{ textAlign: "center", marginTop: 40, color: "#666" }}>
            Nenhum conteúdo disponível para o seu perfil no momento.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff6f8" },
  appHeaderTitle: {
    textAlign: "center",
    paddingTop: 40,
    fontWeight: "bold",
    color: "#000",
    fontSize: 16,
  },
  banner: { margin: 20, marginTop: 16, padding: 24, borderRadius: 20 },
  bannerTitle: { color: "#FFF", fontWeight: "bold", marginBottom: 8 },
  bannerSubtitle: { color: "#FFF", opacity: 0.9 },
  filterContainer: { marginBottom: 24 },
  filterScroll: { paddingHorizontal: 20, gap: 12 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: "#FFF",
  },
  chipText: { marginLeft: 8, fontWeight: "500" },
  sectionTitle: {
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginBottom: 16,
    color: "#000",
  },
  articleList: { paddingHorizontal: 20, paddingBottom: 40 },
  card: {
    marginBottom: 16,
    backgroundColor: "#FFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { fontWeight: "bold", marginBottom: 8, color: "#000" },
  cardExcerpt: { color: "#666", marginBottom: 16, lineHeight: 20 },
  readMoreContainer: { flexDirection: "row", alignItems: "center" },
  readMoreText: { fontWeight: "600", marginRight: 4 },
});
