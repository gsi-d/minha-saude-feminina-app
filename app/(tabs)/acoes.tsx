import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const categoryPalette = {
  pink: {
    background: "#F7E6F0",
    border: "#E8BCD4",
    text: "#A5396C",
    icon: "#C95A9B",
  },
  orange: {
    background: "#FDEBD8",
    border: "#F0C48D",
    text: "#B7651D",
    icon: "#D98E2F",
  },
  green: {
    background: "#E6F7EB",
    border: "#BADCC0",
    text: "#2D7D4D",
    icon: "#3BA96D",
  },
  blue: {
    background: "#E4F4FF",
    border: "#B6DDFB",
    text: "#1976B5",
    icon: "#3B9AD8",
  },
  purple: {
    background: "#F3E8FF",
    border: "#DCC2FF",
    text: "#6F46C9",
    icon: "#8A5AF6",
  },
};

const symptomData = {
  sintomas: [
    {
      key: "estudo-bem",
      label: "Está tudo bem",
      icon: "emoticon-happy-outline",
      color: "pink",
    },
    { key: "colicas", label: "Cólicas", icon: "emoticon-sad-outline", color: "pink" },
    { key: "seios-sensiveis", label: "Seios sensíveis", icon: "heart-pulse", color: "pink" },
    { key: "acne", label: "Acne", icon: "emoticon-devil-outline", color: "pink" },
    { key: "fadiga", label: "Fadiga", icon: "battery-low", color: "pink" },
    { key: "dor-nas-costas", label: "Dor nas costas", icon: "human-male-female", color: "pink" },
    { key: "desejos", label: "Desejos", icon: "heart-outline", color: "pink" },
    { key: "dor-abdominal", label: "Dor abdominal", icon: "medical-bag", color: "pink" },
    { key: "insonia", label: "Insônia", icon: "sleep", color: "pink" },
    { key: "coceira-vaginal", label: "Coceira vaginal", icon: "flower", color: "pink" },
  ],
  humor: [
    { key: "calma", label: "Calma", icon: "emoticon-happy-outline", color: "orange" },
    { key: "feliz", label: "Feliz", icon: "emoticon", color: "orange" },
    { key: "energética", label: "Energetica", icon: "lightning-bolt", color: "orange" },
    { key: "alegre", label: "Alegre", icon: "emoticon-cool-outline", color: "orange" },
    { key: "mudancas-de-humor", label: "Mudanças de humor", icon: "emoticon-sad-outline", color: "orange" },
    { key: "irritada", label: "Irritada", icon: "emoticon-angry-outline", color: "orange" },
    { key: "triste", label: "Triste", icon: "emoticon-cry-outline", color: "orange" },
    { key: "ansiosa", label: "Ansiosa", icon: "emoticon-dead-outline", color: "orange" },
    { key: "desanimada", label: "Desanimada", icon: "emoticon-confused-outline", color: "orange" },
    { key: "culpada", label: "Culpada", icon: "emoticon-sick-outline", color: "orange" },
    { key: "pessimismo", label: "Pensamentos obsessivos", icon: "brain", color: "orange" },
    { key: "pouca-energia", label: "Pouca energia", icon: "flash-off", color: "orange" },
    { key: "apatica", label: "Apática", icon: "emoticon-neutral-outline", color: "orange" },
    { key: "confusa", label: "Confusa", icon: "help-rhombus-outline", color: "orange" },
    { key: "muito-autocritica", label: "Muito autocritica", icon: "account-alert-outline", color: "orange" },
  ],
  secao: [
    { key: "sem-secrecao", label: "Sem secreção", icon: "water", color: "purple" },
    { key: "pastosa", label: "Pastosa", icon: "water", color: "purple" },
    { key: "aquosa", label: "Aquosa", icon: "water-percent", color: "purple" },
    { key: "viscosa", label: "Viscosa", icon: "water-check", color: "purple" },
    { key: "clara-de-ovo", label: "Clara de ovo", icon: "water-outline", color: "purple" },
    { key: "sangramento-de-escape", label: "Sangramento de escape", icon: "water-off", color: "purple" },
    { key: "corrimento-incomum", label: "Corrimento incomum", icon: "water-remove", color: "purple" },
    { key: "branca-grumosa", label: "Branca grumosa", icon: "water", color: "purple" },
    { key: "cinza", label: "Cinza", icon: "water", color: "purple" },
  ],
  digestao: [
    { key: "nausea", label: "Náusea", icon: "emoticon-sick-outline", color: "pink" },
    { key: "inchaço", label: "Inchaço", icon: "arrow-expand", color: "pink" },
    { key: "prisao-de-ventre", label: "Prisão de ventre", icon: "toilet", color: "pink" },
    { key: "diarreia", label: "Diarreia", icon: "water", color: "pink" },
  ],
  gravidez: [
    { key: "nao-fiz-testes", label: "Não fiz testes", icon: "clipboard-text-play-outline", color: "green" },
    { key: "positivo", label: "Positivo", icon: "checkbox-marked-circle-outline", color: "green" },
    { key: "negativo", label: "Negativo", icon: "close-circle-outline", color: "green" },
    { key: "linha-fraca", label: "Linha fraca", icon: "chart-line", color: "green" },
  ],
  ovulacao: [
    { key: "registre-seu-teste", label: "Registre seu teste de ovulação", icon: "plus-circle-outline", color: "blue" },
    { key: "nao-fiz-testes-ovulacao", label: "Não fiz testes", icon: "clipboard-text-play-outline", color: "blue" },
    { key: "ovulacao-meu-metodo", label: "Ovulação: meu método", icon: "chart-timeline-variant", color: "blue" },
  ],
  outros: [
    { key: "viagem", label: "Viagem", icon: "airplane", color: "orange" },
    { key: "estresse", label: "Estresse", icon: "flash", color: "orange" },
    { key: "meditacao", label: "Meditação", icon: "flower", color: "orange" },
    { key: "registros-em-diario", label: "Registros em diário", icon: "notebook-outline", color: "orange" },
    { key: "exercicios-kegel", label: "Exercícios de Kegel", icon: "dumbbell", color: "green" },
    { key: "exercicios-respiracao", label: "Exercícios de respiração", icon: "wind", color: "green" },
    { key: "doenca-ou-ferimento", label: "Doença ou ferimento", icon: "hospital-box-outline", color: "orange" },
    { key: "alcool", label: "Álcool", icon: "glass-wine", color: "orange" },
  ],
  atividade: [
    { key: "nao-fiz-exercicio", label: "Não me exercitei", icon: "cancel", color: "green" },
    { key: "academia", label: "Academia", icon: "dumbbell", color: "green" },
    { key: "natacao", label: "Natação", icon: "swim", color: "green" },
    { key: "corrida", label: "Corrida", icon: "run-fast", color: "green" },
    { key: "caminhada", label: "Caminhada", icon: "walk", color: "green" },
    { key: "aerobica", label: "Aeróbica e dança", icon: "music-note", color: "green" },
    { key: "esportes-de-equipe", label: "Esportes de equipe", icon: "soccer", color: "green" },
    { key: "ciclismo", label: "Ciclismo", icon: "bike", color: "green" },
  ],
  contraceptivos: [
    { key: "tomei-pontualmente", label: "Tomei pontualmente", icon: "pill", color: "blue" },
    { key: "tomei-a-pula-de-ontem", label: "Tomei a pílula de ontem", icon: "pill", color: "blue" },
  ],
  peso: [
    { key: "peso", label: "Peso", icon: "scale-bathroom", color: "pink" },
    { key: "temperatura", label: "Temperatura basal", icon: "thermometer", color: "pink" },
    { key: "notas", label: "Notas", icon: "note-text-outline", color: "pink" },
  ],
};

const sectionOrder = [
  "sintomas",
  "humor",
  "secao",
  "digestao",
  "gravidez",
  "ovulacao",
  "outros",
  "atividade",
  "contraceptivos",
  "peso",
];

const titlesByView: Record<string, string> = {
  sintomas: "Sintomas",
  humor: "Humor",
  secao: "Secreção vaginal",
  digestao: "Digestão e fezes",
  gravidez: "Testes de gravidez",
  ovulacao: "Testes de ovulação",
  outros: "Outros",
  atividade: "Atividade física",
  contraceptivos: "Contraceptivos orais",
  peso: "Peso e temperatura",
};

export default function AcoesScreen() {
  const router = useRouter();
  const { view } = useLocalSearchParams<{ view?: string }>();
  const currentView = view || "sintomas";
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  const sections = useMemo(() => {
    return sectionOrder
      .filter((key) => key === currentView || key === "sintomas")
      .map((key) => ({
        key,
        title: titlesByView[key],
        items: symptomData[key as keyof typeof symptomData],
      }));
  }, [currentView]);

  const filteredSections = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return sections;
    return sections.map((section) => ({
      ...section,
      items: section.items.filter((item) => item.label.toLowerCase().includes(query)),
    }));
  }, [search, sections]);

  const toggleItem = (sectionKey: string, itemKey: string) => {
    const current = selected[sectionKey] || [];
    const next = current.includes(itemKey)
      ? current.filter((value) => value !== itemKey)
      : [...current, itemKey];

    setSelected((prev) => ({
      ...prev,
      [sectionKey]: next,
    }));
  };

  const visibleSummary = Object.values(selected).flat().length;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={28} color="#1f1f1f" />
        </TouchableOpacity>

        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Hoje</Text>
          <Text style={styles.headerSubtitle}>23° dia do ciclo</Text>
        </View>

        <TouchableOpacity onPress={() => router.back()} style={styles.backButtonRight}>
          <MaterialCommunityIcons name="chevron-right" size={28} color="#1f1f1f" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color="#5f5f5f" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar"
          placeholderTextColor="#7d7d7d"
          style={styles.searchInput}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {filteredSections.map((section) => (
          <View key={section.key} style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>{section.title}</Text>

            <View style={styles.chipsWrap}>
              {section.items.map((item) => {
                const palette = categoryPalette[item.color as keyof typeof categoryPalette];
                const active = Boolean(selected[section.key]?.includes(item.key));

                return (
                  <TouchableOpacity
                    key={item.key}
                    activeOpacity={0.9}
                    onPress={() => toggleItem(section.key, item.key)}
                    style={[
                      styles.chip,
                      {
                        backgroundColor: active ? palette.background : "#F4F4F4",
                        borderColor: active ? palette.border : "#E7E7E7",
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.iconBadge,
                        {
                          backgroundColor: active ? palette.icon : "#D9D9D9",
                        },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={item.icon as any}
                        size={18}
                        color={active ? "#FFF" : "#7A7A7A"}
                      />
                    </View>
                    <Text
                      style={[
                        styles.chipText,
                        {
                          color: active ? palette.text : "#333",
                          fontWeight: active ? "700" : "500",
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Sintomas selecionados</Text>
          <Text style={styles.summaryValue}>{visibleSummary}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 8,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonRight: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleWrap: {
    alignItems: "center",
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f1f1f",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#777",
  },
  searchContainer: {
    marginHorizontal: 18,
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: "#E7E7E7",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#1f1f1f",
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 30,
  },
  sectionBox: {
    backgroundColor: "#F9F9F9",
    borderRadius: 18,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ECECEC",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f1f1f",
    marginBottom: 12,
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 42,
    marginBottom: 8,
  },
  iconBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  chipText: {
    fontSize: 13,
  },
  summaryBox: {
    marginTop: 18,
    backgroundColor: "#F9F9F9",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#555",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#A5396C",
  },
});