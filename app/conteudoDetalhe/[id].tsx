import { ArticleContentRenderer } from "@/components/articles/ArticleContentRenderer";
import { obterUrlHttpSegura, obterUrlImagemSegura } from "@/components/articles/article-content.utils";
import { enumTipoUsuario } from "@/constants/enums";
import { useAuth } from "@/contexts/AuthContext";
import {
  ErroConteudosRepository,
} from "@/data/conteudos/conteudos-supabase.datasource";
import { DocumentoConteudoInvalidoError } from "@/data/conteudos/conteudos-supabase.mapper";
import { createConteudosRepository } from "@/data/conteudos/conteudos.repository";
import type { Conteudo } from "@/domain/conteudos/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Linking, ScrollView, StyleSheet, View } from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";

const conteudosRepository = createConteudosRepository();

function mensagemErroDetalhe(error: unknown) {
  if (error instanceof DocumentoConteudoInvalidoError) {
    return "O documento deste artigo está inválido e não pode ser exibido.";
  }
  if (error instanceof ErroConteudosRepository) {
    if (error.codigo === "CONEXAO") return "Não foi possível conectar. Verifique sua internet e tente novamente.";
    if (error.codigo === "SEM_PERMISSAO") return "Sua sessão não tem permissão para abrir este artigo.";
  }
  return "Não foi possível carregar este artigo agora. Tente novamente.";
}

async function abrirFonte(source: unknown) {
  const url = obterUrlHttpSegura(source);
  if (!url) {
    Alert.alert("Fonte indisponível", "O endereço da fonte não é válido.");
    return;
  }
  try {
    const supported = await Linking.canOpenURL(url);
    if (!supported) throw new Error("unsupported");
    await Linking.openURL(url);
  } catch {
    Alert.alert("Não foi possível abrir", "Tente novamente mais tarde.");
  }
}

export default function ConteudoDetalheScreen() {
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const { usuario } = useAuth();
  const [artigo, setArtigo] = useState<Conteudo | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const requestRef = useRef(0);

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const tipoUsuario = usuario?.tipoUsuario ?? enumTipoUsuario.NaoDefinido;

  const carregarArtigo = useCallback(async () => {
    const requestId = ++requestRef.current;
    setCarregando(true);
    setErro(null);
    setArtigo(null);

    if (!usuario) {
      if (mountedRef.current && requestId === requestRef.current) {
        setErro("Sua sessão não está disponível. Entre novamente para abrir este artigo.");
        setCarregando(false);
      }
      return;
    }
    if (!id || !/^\d+$/.test(id)) {
      if (mountedRef.current && requestId === requestRef.current) {
        setErro("Artigo não encontrado.");
        setCarregando(false);
      }
      return;
    }

    try {
      const resultado = await conteudosRepository.findPublishedByIdForAudience(id, tipoUsuario);
      if (mountedRef.current && requestId === requestRef.current) {
        if (resultado) setArtigo(resultado);
        else setErro("Este artigo não existe ou não está disponível para o seu perfil.");
      }
    } catch (error) {
      if (mountedRef.current && requestId === requestRef.current) setErro(mensagemErroDetalhe(error));
    } finally {
      if (mountedRef.current && requestId === requestRef.current) setCarregando(false);
    }
  }, [id, tipoUsuario, usuario]);

  useEffect(() => {
    mountedRef.current = true;
    void carregarArtigo();
    return () => {
      mountedRef.current = false;
      requestRef.current += 1;
    };
  }, [carregarArtigo]);

  const coverImage = obterUrlImagemSegura(artigo?.imagemCapa);
  const sourceUrl = obterUrlHttpSegura(artigo?.urlFonte);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
        <Text variant="titleMedium" style={styles.headerTitle}>Artigo</Text>
        <View style={styles.headerSpacer} />
      </View>

      {carregando ? (
        <View style={styles.centeredState}>
          <ActivityIndicator color={theme.colors.primary} size="large" />
          <Text style={styles.stateText}>Carregando artigo...</Text>
        </View>
      ) : erro ? (
        <View style={styles.centeredState}>
          <MaterialCommunityIcons color={theme.colors.primary} name="file-alert-outline" size={46} />
          <Text style={styles.errorText}>{erro}</Text>
          <Button mode="contained" onPress={() => void carregarArtigo()}>Tentar novamente</Button>
        </View>
      ) : artigo ? (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {coverImage ? <Image accessibilityLabel="Imagem de capa do artigo" contentFit="cover" source={{ uri: coverImage }} style={styles.coverImage} /> : null}
          <View style={[styles.category, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.categoryText}>{artigo.categoria.nome}</Text>
          </View>
          <Text variant="headlineMedium" style={styles.title}>{artigo.titulo}</Text>
          {artigo.resumo ? <Text variant="bodyLarge" style={styles.summary}>{artigo.resumo}</Text> : null}
          <View style={styles.divider} />
          <View style={styles.articleBody}>
            <ArticleContentRenderer document={artigo.corpo} />
          </View>

          {artigo.urlFonte ? (
            sourceUrl ? (
              <Button
                icon="open-in-new"
                mode="text"
                onPress={() => void abrirFonte(sourceUrl)}
                style={styles.sourceButton}
              >
                Consultar fonte do artigo
              </Button>
            ) : (
              <Text style={styles.invalidSource}>A fonte informada para este artigo é inválida.</Text>
            )
          ) : null}

          <View style={styles.infoBox}>
            <MaterialCommunityIcons color="#9B51E0" name="information" size={20} />
            <Text style={styles.infoText}>Lembre-se: Este conteúdo é informativo e não substitui uma consulta médica.</Text>
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 40, paddingHorizontal: 8 },
  headerTitle: { fontWeight: "bold" },
  headerSpacer: { width: 48 },
  scrollContent: { paddingBottom: 40 },
  coverImage: { aspectRatio: 16 / 9, marginBottom: 20, width: "100%" },
  category: { alignSelf: "flex-start", borderRadius: 8, marginHorizontal: 24, marginBottom: 12, paddingHorizontal: 12, paddingVertical: 4 },
  categoryText: { color: "#FFF", fontSize: 12, fontWeight: "bold" },
  title: { color: "#1D1D1D", fontWeight: "bold", marginHorizontal: 24, marginBottom: 12 },
  summary: { color: "#666", lineHeight: 25, marginHorizontal: 24 },
  divider: { backgroundColor: "#DDD", height: StyleSheet.hairlineWidth, marginHorizontal: 24, marginVertical: 20 },
  articleBody: { marginHorizontal: 24 },
  sourceButton: { alignSelf: "flex-start", marginHorizontal: 14, marginTop: 12 },
  invalidSource: { color: "#8A3030", marginHorizontal: 24, marginTop: 18 },
  infoBox: { flexDirection: "row", backgroundColor: "#F3E5F5", padding: 16, borderRadius: 12, marginHorizontal: 24, marginTop: 28, alignItems: "center" },
  infoText: { marginLeft: 12, flex: 1, color: "#4A148C", fontSize: 14 },
  centeredState: { alignItems: "center", flex: 1, justifyContent: "center", padding: 32 },
  stateText: { color: "#666", marginTop: 14 },
  errorText: { color: "#555", marginBottom: 18, marginTop: 12, textAlign: "center" },
});
