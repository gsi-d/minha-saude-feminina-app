import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function CicloScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.appHeaderTitle}>{"Ciclo"}</Text>
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
