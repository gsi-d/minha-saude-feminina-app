import { enumTipoUsuario } from "@/constants/enums";
import { useAuth } from "@/contexts/AuthContext";
import { ErroConteudosRepository } from "@/data/conteudos/conteudos-supabase.datasource";
import { createConteudosRepository } from "@/data/conteudos/conteudos.repository";
import { createDicasRepository } from "@/data/dicas/dicas.repository";
import type { Dica } from "@/data/dicas/dicas.types";
import { extrairCategoriasUnicas, filtrarResumosPorCategoria } from "@/domain/conteudos/conteudos.utils";
import type { ResumoConteudo } from "@/domain/conteudos/types";
import { obterUrlImagemSegura } from "@/components/articles/article-content.utils";
import { resolveTipoUsuario } from "@/utils/resolveTipoUsuario";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

const conteudosRepository = createConteudosRepository();
const dicasRepository = createDicasRepository();

const CORES_LAYOUT = {
  headerBackground: "#9B51E0",
  chipAtivo: "#E84C71",
  chipInativo: "#666666",
  chipBackgroundAtivo: "#E84C71",
};

function mensagemDeErro(error: unknown) {
  if (error instanceof ErroConteudosRepository) {
    if (error.codigo === "CONEXAO") return "Não foi possível conectar. Verifique sua internet e tente novamente.";
    if (error.codigo === "SEM_PERMISSAO") return "Sua sessão não tem permissão para acessar estes conteúdos.";
  }
  return "Não foi possível carregar os artigos agora. Tente novamente.";
}

function normalizarTexto(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function selecionarDicaRelacionada(dicas: Dica[], categoriaNome?: string) {
  if (!categoriaNome) return [];

  const categoriaNormalizada = normalizarTexto(categoriaNome);
  return dicas.filter((dica) => {
    const categoriaDica = dica.categoriaNome ?? dica.tag;
    return normalizarTexto(categoriaDica) === categoriaNormalizada;
  });
}

export default function ConteudosScreen() {
  const router = useRouter();
  const { usuario } = useAuth();
  const [resumos, setResumos] = useState<ResumoConteudo[]>([]);
  const [dicas, setDicas] = useState<Dica[]>([]);
  const [categoriaAtivaId, setCategoriaAtivaId] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const requestRef = useRef(0);

  const tipoUsuarioAtual = usuario?.tipoUsuario ?? enumTipoUsuario.NaoDefinido;
  const tipoAtual = resolveTipoUsuario(tipoUsuarioAtual);

  const carregarConteudos = useCallback(async (refresh = false) => {
    const requestId = ++requestRef.current;
    if (refresh) setAtualizando(true);
    else setCarregando(true);
    setErro(null);

    if (!usuario) {
      if (mountedRef.current && requestId === requestRef.current) {
        setResumos([]);
        setErro("Sua sessão não está disponível. Entre novamente para ver os artigos.");
        setCarregando(false);
        setAtualizando(false);
      }
      return;
    }

    try {
      const resultadoConteudos = await conteudosRepository.listPublishedByAudience(tipoUsuarioAtual);

      let dicasCarregadas: Dica[] = [];
      try {
        const [resultadoDicasPerfil, resultadoDicasGerais] = await Promise.all([
          dicasRepository.listByTipoUsuario(tipoUsuarioAtual),
          dicasRepository.listByTipoUsuario(enumTipoUsuario.NaoDefinido),
        ]);
        dicasCarregadas = resultadoDicasPerfil.length > 0 ? resultadoDicasPerfil : resultadoDicasGerais;
      } catch {
        dicasCarregadas = [];
      }

      if (mountedRef.current && requestId === requestRef.current) {
        setResumos(resultadoConteudos);
        setDicas(dicasCarregadas);
      }
    } catch (error) {
      if (mountedRef.current && requestId === requestRef.current) {
        setResumos([]);
        setDicas([]);
        setErro(mensagemDeErro(error));
      }
    } finally {
      if (mountedRef.current && requestId === requestRef.current) {
        setCarregando(false);
        setAtualizando(false);
      }
    }
  }, [tipoUsuarioAtual, usuario]);

  useEffect(() => {
    mountedRef.current = true;
    void carregarConteudos();
    return () => {
      mountedRef.current = false;
      requestRef.current += 1;
    };
  }, [carregarConteudos]);

  const categorias = useMemo(() => extrairCategoriasUnicas(resumos), [resumos]);

  useEffect(() => {
    if (categorias.length === 0) setCategoriaAtivaId("");
    else if (!categorias.some((categoria) => categoria.id === categoriaAtivaId)) setCategoriaAtivaId(categorias[0].id);
  }, [categoriaAtivaId, categorias]);

  const artigosExibidos = useMemo(
    () => filtrarResumosPorCategoria(resumos, categoriaAtivaId),
    [categoriaAtivaId, resumos],
  );
  const categoriaAtiva = categorias.find((categoria) => categoria.id === categoriaAtivaId);
  const dicasDaCategoria = useMemo(
    () => selecionarDicaRelacionada(dicas, categoriaAtiva?.nome),
    [categoriaAtiva?.nome, dicas],
  );

  const header = (
    <>
      <Text style={styles.appHeaderTitle}>Minha Saúde Feminina</Text>
      <View style={[styles.banner, { backgroundColor: CORES_LAYOUT.headerBackground }]}>
        <Text variant="headlineMedium" style={styles.bannerTitle}>Educação e Dicas</Text>
        <Text variant="bodyMedium" style={styles.bannerSubtitle}>
          Perfil selecionado: <Text style={styles.profileName}>{tipoAtual}</Text>
        </Text>
      </View>

      {categorias.length > 0 ? (
        <View style={styles.filterContainer}>
          <ScrollView contentContainerStyle={styles.filterScroll} horizontal showsHorizontalScrollIndicator={false}>
            {categorias.map((categoria) => {
              const ativa = categoria.id === categoriaAtivaId;
              return (
                <TouchableOpacity
                  accessibilityRole="button"
                  key={categoria.id}
                  onPress={() => setCategoriaAtivaId(categoria.id)}
                  style={[styles.chip, ativa
                    ? { backgroundColor: CORES_LAYOUT.chipBackgroundAtivo, borderColor: CORES_LAYOUT.chipAtivo }
                    : styles.chipInativo]}
                >
                  <MaterialCommunityIcons
                    color={ativa ? "#FFF" : CORES_LAYOUT.chipInativo}
                    name={ativa ? "text-box" : "text-box-outline"}
                    size={18}
                  />
                  <Text style={[styles.chipText, { color: ativa ? "#FFF" : CORES_LAYOUT.chipInativo }]}>
                    {categoria.nome}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : null}

      {categoriaAtiva ? (
        <>
          <Text variant="titleLarge" style={styles.sectionTitle}>Artigos sobre {categoriaAtiva.nome}</Text>
        </>
      ) : null}
    </>
  );

  if (carregando) {
    return (
      <View style={styles.centeredState}>
        <ActivityIndicator color={CORES_LAYOUT.headerBackground} size="large" />
        <Text style={styles.stateText}>Carregando artigos...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centeredState}>
        <MaterialCommunityIcons color="#9B51E0" name="alert-circle-outline" size={42} />
        <Text style={styles.errorText}>{erro}</Text>
        <Button mode="contained" onPress={() => void carregarConteudos()}>Tentar novamente</Button>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContent}
      data={artigosExibidos}
      keyExtractor={(artigo) => artigo.id}
      ListEmptyComponent={(
        <Text style={styles.emptyText}>
          {tipoUsuarioAtual === enumTipoUsuario.NaoDefinido
            ? "Defina seu perfil para receber conteúdos personalizados."
            : categoriaAtivaId
              ? "Nenhum artigo disponível nesta categoria."
              : "Nenhum conteúdo disponível para o seu perfil no momento."}
        </Text>
      )}
      ListHeaderComponent={header}
      ListFooterComponent={categoriaAtiva && dicasDaCategoria.length > 0 ? (
        <View style={styles.tipsSection}>
          <Text variant="titleMedium" style={styles.tipsSectionTitle}>Dicas sobre {categoriaAtiva.nome}</Text>
          {dicasDaCategoria.map((dica) => (
            <Card key={dica.id} style={styles.tipCard} elevation={0}>
              <Card.Content>
                <View style={styles.tipHeader}>
                  <MaterialCommunityIcons color={CORES_LAYOUT.chipAtivo} name="lightbulb-on-outline" size={20} />
                  <Text style={styles.tipTitle}>{dica.titulo || `Dica sobre ${categoriaAtiva.nome}`}</Text>
                </View>
                <Text style={styles.tipText}>{dica.texto}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      ) : null}
      onRefresh={() => void carregarConteudos(true)}
      refreshing={atualizando}
      renderItem={({ item: artigo }) => (
        <Card style={styles.card} elevation={0}>
          {obterUrlImagemSegura(artigo.imagemCapa) ? (
            <Image
              contentFit="cover"
              source={{ uri: obterUrlImagemSegura(artigo.imagemCapa) ?? undefined }}
              style={styles.coverImage}
            />
          ) : null}
          <Card.Content style={styles.cardContent}>
            <Text style={styles.categoryLabel}>{artigo.categoria.nome}</Text>
            <Text variant="titleMedium" style={styles.cardTitle}>{artigo.titulo}</Text>
            {artigo.resumo ? <Text numberOfLines={4} variant="bodyMedium" style={styles.cardExcerpt}>{artigo.resumo}</Text> : null}
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => router.push({ pathname: "/conteudoDetalhe/[id]", params: { id: artigo.id } })}
              style={styles.readMoreContainer}
            >
              <Text style={[styles.readMoreText, { color: CORES_LAYOUT.chipAtivo }]}>Ler mais</Text>
              <MaterialCommunityIcons color={CORES_LAYOUT.chipAtivo} name="chevron-right" size={16} />
            </TouchableOpacity>
          </Card.Content>
        </Card>
      )}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF6F8" },
  listContent: { paddingBottom: 40 },
  appHeaderTitle: { textAlign: "center", paddingTop: 40, fontWeight: "bold", color: "#000", fontSize: 16 },
  banner: { margin: 20, marginTop: 16, padding: 24, borderRadius: 20 },
  bannerTitle: { color: "#FFF", fontWeight: "bold", marginBottom: 8 },
  bannerSubtitle: { color: "#FFF", opacity: 0.9 },
  profileName: { color: "#FFF", fontWeight: "bold" },
  filterContainer: { marginBottom: 24 },
  filterScroll: { paddingHorizontal: 20, gap: 12 },
  chip: { flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 24, borderWidth: 1 },
  chipInativo: { backgroundColor: "#FFF", borderColor: "#F0F0F0" },
  chipText: { marginLeft: 8, fontWeight: "500" },
  sectionTitle: { fontWeight: "bold", paddingHorizontal: 20, marginBottom: 16, color: "#000" },
  tipsSection: { paddingTop: 8, paddingBottom: 8 },
  tipsSectionTitle: { color: "#000", fontWeight: "700", marginBottom: 12, marginHorizontal: 20 },
  tipCard: { marginHorizontal: 20, marginBottom: 20, backgroundColor: "#FFF", borderRadius: 16, borderWidth: 1, borderColor: "#F4D7DE" },
  tipHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8, gap: 8 },
  tipTitle: { color: "#C43A4A", fontSize: 15, fontWeight: "700", flex: 1 },
  tipText: { color: "#666", lineHeight: 20 },
  card: { marginHorizontal: 20, marginBottom: 16, backgroundColor: "#FFF", borderRadius: 16, borderWidth: 1, borderColor: "#F0F0F0", overflow: "hidden", elevation: 2 },
  coverImage: { aspectRatio: 16 / 9, width: "100%" },
  cardContent: { paddingTop: 16 },
  categoryLabel: { alignSelf: "flex-start", color: "#9B51E0", fontSize: 12, fontWeight: "700", marginBottom: 8 },
  cardTitle: { fontWeight: "bold", marginBottom: 8, color: "#000" },
  cardExcerpt: { color: "#666", marginBottom: 16, lineHeight: 20 },
  readMoreContainer: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start" },
  readMoreText: { fontWeight: "600", marginRight: 4 },
  centeredState: { alignItems: "center", backgroundColor: "#FFF6F8", flex: 1, justifyContent: "center", padding: 32 },
  stateText: { color: "#666", marginTop: 14 },
  errorText: { color: "#555", marginBottom: 18, marginTop: 12, textAlign: "center" },
  emptyText: { color: "#666", marginHorizontal: 32, marginTop: 32, textAlign: "center" },
});
