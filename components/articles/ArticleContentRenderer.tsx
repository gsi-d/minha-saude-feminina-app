import { Image } from "expo-image";
import React, { Fragment, type ReactNode, useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
  type TextStyle,
} from "react-native";
import { useTheme } from "react-native-paper";
import { WebView } from "react-native-webview";

import { isDocumentoConteudo } from "../../domain/conteudos/documento";
import type {
  DocumentoConteudo,
  MarcaConteudo,
  NoConteudo,
} from "../../domain/conteudos/types";
import {
  normalizarUrlYoutube,
  obterEstrategiaNoConteudo,
  obterTextoProprioFallback,
  obterUrlHttpSegura,
  obterUrlImagemSegura,
  particionarConteudoTextual,
} from "./article-content.utils";

interface ArticleContentRendererProps {
  document: DocumentoConteudo | unknown;
}

interface RenderContext {
  listKind?: "bullet" | "ordered";
  listIndex?: number;
}

async function abrirUrlExterna(source: unknown) {
  const url = obterUrlHttpSegura(source);
  if (!url) {
    Alert.alert("Link inválido", "Não foi possível abrir este endereço.");
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

function obterAlinhamento(attrs?: Record<string, unknown>): TextStyle["textAlign"] {
  const value = attrs?.textAlign;
  return value === "center" || value === "right" || value === "justify" ? value : "left";
}

function TextoMarcado({ marks = [], text }: { marks?: MarcaConteudo[]; text: string }) {
  const theme = useTheme();

  return marks.reduce<ReactNode>((content, mark, index) => {
    const key = `${mark.type}-${index}`;
    switch (mark.type) {
      case "bold":
        return <Text key={key} style={styles.bold}>{content}</Text>;
      case "italic":
        return <Text key={key} style={styles.italic}>{content}</Text>;
      case "underline":
        return <Text key={key} style={styles.underline}>{content}</Text>;
      case "strike":
        return <Text key={key} style={styles.strike}>{content}</Text>;
      case "link": {
        const href = obterUrlHttpSegura(mark.attrs?.href);
        return href ? (
          <Text
            accessibilityRole="link"
            key={key}
            onPress={() => void abrirUrlExterna(href)}
            style={[styles.link, { color: theme.colors.primary }]}
          >
            {content}
          </Text>
        ) : content;
      }
      case "highlight":
        return (
          <Text
            key={key}
            style={{ backgroundColor: typeof mark.attrs?.color === "string" ? mark.attrs.color : "#FFF1A8" }}
          >
            {content}
          </Text>
        );
      case "textStyle":
        return (
          <Text
            key={key}
            style={{ color: typeof mark.attrs?.color === "string" ? mark.attrs.color : undefined }}
          >
            {content}
          </Text>
        );
      default:
        return content;
    }
  }, text);
}

function YoutubeNode({ source }: { source: unknown }) {
  const [falhou, setFalhou] = useState(false);
  const embedUrl = normalizarUrlYoutube(source);
  const externalUrl = obterUrlHttpSegura(source);

  if (!embedUrl || falhou) {
    return (
      <View style={styles.videoFallback}>
        <Text style={styles.videoFallbackText}>Este vídeo não pôde ser incorporado.</Text>
        {externalUrl ? (
          <Pressable accessibilityRole="link" onPress={() => void abrirUrlExterna(externalUrl)}>
            <Text style={styles.videoFallbackLink}>Abrir vídeo externamente</Text>
          </Pressable>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.videoContainer}>
      <WebView
        allowsFullscreenVideo
        domStorageEnabled
        javaScriptEnabled
        onError={() => setFalhou(true)}
        onHttpError={() => setFalhou(true)}
        onShouldStartLoadWithRequest={(request) => {
          if (request.url === embedUrl || request.url === "about:blank") return true;
          const external = obterUrlHttpSegura(request.url);
          if (external) void abrirUrlExterna(external);
          return false;
        }}
        originWhitelist={["https://www.youtube-nocookie.com"]}
        source={{ uri: embedUrl }}
        style={styles.video}
      />
    </View>
  );
}

function renderChildren(node: NoConteudo, key: string, context?: RenderContext): ReactNode {
  return node.content?.map((child, index) => renderNode(child, `${key}-${index}`, context));
}

function renderInlineNode(node: NoConteudo, key: string): ReactNode {
  const strategy = obterEstrategiaNoConteudo(node.type);
  if (strategy === "text") {
    return <TextoMarcado key={key} marks={node.marks} text={node.text ?? ""} />;
  }
  if (strategy === "hardBreak") return <Fragment key={key}>{"\n"}</Fragment>;
  if (strategy === "children") {
    return (
      <Fragment key={key}>
        {obterTextoProprioFallback(node) ? (
          <TextoMarcado marks={node.marks} text={obterTextoProprioFallback(node)} />
        ) : null}
        {node.content?.map((child, index) => renderInlineNode(child, `${key}-${index}`))}
      </Fragment>
    );
  }
  return null;
}

function renderNode(node: NoConteudo, key: string, context: RenderContext = {}): ReactNode {
  const strategy = obterEstrategiaNoConteudo(node.type);

  if (strategy === "text") {
    return (
      <Text key={key} style={styles.inlineFallbackText}>
        <TextoMarcado marks={node.marks} text={node.text ?? ""} />
      </Text>
    );
  }

  const textAlign = obterAlinhamento(node.attrs);
  switch (strategy) {
    case "doc":
      return <Fragment key={key}>{renderChildren(node, key)}</Fragment>;
    case "paragraph": {
      const paragraphNodes = node.text
        ? [{ type: "text", text: node.text, marks: node.marks }, ...(node.content ?? [])]
        : node.content ?? [];
      const partes = particionarConteudoTextual(paragraphNodes);
      return (
        <View key={key} style={styles.paragraphContainer}>
          {partes.map((parte, index) => parte.tipo === "inline" ? (
            <Text key={`${key}-inline-${index}`} style={[styles.paragraph, { textAlign }]}>
              {parte.nodes.map((child, childIndex) => renderInlineNode(child, `${key}-inline-${index}-${childIndex}`))}
            </Text>
          ) : renderNode(parte.node, `${key}-block-${index}`))}
        </View>
      );
    }
    case "heading": {
      const rawLevel = Number(node.attrs?.level ?? 2);
      const level = rawLevel === 1 || rawLevel === 3 ? rawLevel : 2;
      const headingNodes = node.text
        ? [{ type: "text", text: node.text, marks: node.marks }, ...(node.content ?? [])]
        : node.content ?? [];
      const partes = particionarConteudoTextual(headingNodes);
      return (
        <View key={key} style={styles.headingContainer}>
          {partes.map((parte, index) => parte.tipo === "inline" ? (
            <Text
              key={`${key}-inline-${index}`}
              style={[styles.heading, level === 1 ? styles.heading1 : level === 2 ? styles.heading2 : styles.heading3, { textAlign }]}
            >
              {parte.nodes.map((child, childIndex) => renderInlineNode(child, `${key}-inline-${index}-${childIndex}`))}
            </Text>
          ) : renderNode(parte.node, `${key}-block-${index}`))}
        </View>
      );
    }
    case "bulletList":
    case "orderedList": {
      const listKind = strategy === "orderedList" ? "ordered" : "bullet";
      return (
        <View key={key} style={styles.list}>
          {node.content?.map((child, index) => renderNode(child, `${key}-${index}`, { listKind, listIndex: index + 1 }))}
        </View>
      );
    }
    case "listItem":
      return (
        <View key={key} style={styles.listItem}>
          <Text style={styles.listMarker}>{context.listKind === "ordered" ? `${context.listIndex ?? 1}.` : "•"}</Text>
          <View style={styles.listContent}>{renderChildren(node, key)}</View>
        </View>
      );
    case "blockquote":
      return (
        <View key={key} style={styles.blockquote}>
          {renderChildren(node, key)}
        </View>
      );
    case "image": {
      const src = obterUrlImagemSegura(node.attrs?.src);
      if (!src) return null;
      const title = typeof node.attrs?.title === "string" ? node.attrs.title.trim() : "";
      const alt = typeof node.attrs?.alt === "string" ? node.attrs.alt : "";
      return (
        <View key={key} style={styles.figure}>
          <Image accessibilityLabel={alt} contentFit="contain" source={{ uri: src }} style={styles.image} />
          {title ? <Text style={styles.caption}>{title}</Text> : null}
        </View>
      );
    }
    case "youtube":
      return <YoutubeNode key={key} source={node.attrs?.src} />;
    case "horizontalRule":
      return <View key={key} style={styles.horizontalRule} />;
    case "hardBreak":
      return <Text key={key}>{"\n"}</Text>;
    case "children":
    default:
      return (
        <Fragment key={key}>
          {obterTextoProprioFallback(node) ? (
            <Text style={styles.inlineFallbackText}>
              <TextoMarcado marks={node.marks} text={obterTextoProprioFallback(node)} />
            </Text>
          ) : null}
          {renderChildren(node, key)}
        </Fragment>
      );
  }
}

export function ArticleContentRenderer({ document }: ArticleContentRendererProps) {
  if (!isDocumentoConteudo(document)) {
    return (
      <View style={styles.invalidDocument}>
        <Text style={styles.invalidDocumentText}>Não foi possível exibir o conteúdo deste artigo.</Text>
      </View>
    );
  }

  return (
    <View>
      {document.document.content.map((node, index) => renderNode(node, `root-${index}`))}
    </View>
  );
}

const styles = StyleSheet.create({
  paragraphContainer: { marginBottom: 12 },
  paragraph: { color: "#333", fontSize: 16, lineHeight: 27 },
  inlineFallbackText: { color: "#333", fontSize: 16, lineHeight: 27 },
  bold: { fontWeight: "700" },
  italic: { fontStyle: "italic" },
  underline: { textDecorationLine: "underline" },
  strike: { textDecorationLine: "line-through" },
  link: { textDecorationLine: "underline" },
  headingContainer: { marginBottom: 12, marginTop: 18 },
  heading: { color: "#1D1D1D", fontWeight: "700", lineHeight: 32 },
  heading1: { fontSize: 28, lineHeight: 35 },
  heading2: { fontSize: 23, lineHeight: 30 },
  heading3: { fontSize: 19, lineHeight: 26 },
  list: { marginBottom: 12 },
  listItem: { flexDirection: "row", marginBottom: 4, paddingRight: 12 },
  listMarker: { color: "#333", fontSize: 16, lineHeight: 27, marginRight: 8, minWidth: 18, textAlign: "right" },
  listContent: { flex: 1 },
  blockquote: { borderLeftColor: "#9B51E0", borderLeftWidth: 4, marginVertical: 12, paddingLeft: 14 },
  figure: { marginVertical: 16 },
  image: { aspectRatio: 16 / 9, borderRadius: 12, width: "100%" },
  caption: { color: "#666", fontSize: 12, marginTop: 6, textAlign: "center" },
  videoContainer: { aspectRatio: 16 / 9, borderRadius: 12, marginVertical: 16, overflow: "hidden", width: "100%" },
  video: { backgroundColor: "#000", flex: 1 },
  videoFallback: { alignItems: "center", backgroundColor: "#F2F2F2", borderRadius: 12, marginVertical: 16, padding: 20 },
  videoFallbackText: { color: "#555", marginBottom: 8, textAlign: "center" },
  videoFallbackLink: { color: "#9B51E0", fontWeight: "600", textDecorationLine: "underline" },
  horizontalRule: { backgroundColor: "#DDD", height: StyleSheet.hairlineWidth, marginVertical: 22 },
  invalidDocument: { backgroundColor: "#FFF2F2", borderRadius: 10, padding: 16 },
  invalidDocumentText: { color: "#8A3030", textAlign: "center" },
});
