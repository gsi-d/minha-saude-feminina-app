import { AppTheme } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Text,
  useTheme,
} from "react-native-paper";

const opcoes = [
  {
    icon: "pill",
    label: "Menstruação",
    color: "#c52222",
    background: "#ffeeee",
    view: "sintomas",
  },
  {
    icon: "clipboard-pulse-outline",
    label: "Sintomas",
    color: "#366600",
    background: "#ebffd4",
    view: "sintomas",
  },
  {
    icon: "emoticon-happy-outline",
    label: "Humor",
    color: "#F59E0B",
    background: "#FFF4DB",
    view: "humor",
  },
];

const viewData: Record<string, { title: string; items: { label: string; icon: string; color: string }[] }> = {
  sintomas: {
    title: "Sintomas",
    items: [
      { label: "Está tudo bem", icon: "emoticon-happy-outline", color: "#D39FC8" },
      { label: "Cólicas", icon: "emoticon-sad-outline", color: "#F4B6C9" },
      { label: "Seios sensíveis", icon: "heart-pulse", color: "#EAA6BE" },
      { label: "Acne", icon: "emoticon-devil-outline", color: "#D69DC8" },
      { label: "Fadiga", icon: "battery-low", color: "#D9B0D3" },
      { label: "Dor nas costas", icon: "human-male-female", color: "#D8C2DA" },
      { label: "Desejos", icon: "heart-outline", color: "#F4B8C4" },
      { label: "Dor abdominal", icon: "medical-bag", color: "#E7B3D0" },
      { label: "Insônia", icon: "sleep", color: "#C7B8E6" },
      { label: "Coceira vaginal", icon: "flower", color: "#D7B4E5" },
    ],
  },
  humor: {
    title: "Humor",
    items: [
      { label: "Calma", icon: "emoticon-happy-outline", color: "#F0C387" },
      { label: "Feliz", icon: "emoticon", color: "#F0C387" },
      { label: "Energética", icon: "lightning-bolt", color: "#F0C387" },
      { label: "Alegre", icon: "emoticon-cool-outline", color: "#F0C387" },
      { label: "Mudanças de humor", icon: "emoticon-sad-outline", color: "#F0C387" },
      { label: "Irritada", icon: "emoticon-angry-outline", color: "#F0C387" },
      { label: "Triste", icon: "emoticon-cry-outline", color: "#F0C387" },
      { label: "Ansiosa", icon: "emoticon-dead-outline", color: "#F0C387" },
      { label: "Desanimada", icon: "emoticon-confused-outline", color: "#F0C387" },
      { label: "Culpada", icon: "emoticon-sick-outline", color: "#F0C387" },
    ],
  },
};

const BotaoAcoes = ({ onPress }: any) => {
  const theme = useTheme<AppTheme>();
  const [menuAberto, setMenuAberto] = useState(false);
  const [activeView, setActiveView] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const currentViewData = activeView ? viewData[activeView] : viewData.sintomas;
  const filteredItems = currentViewData.items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleMenu = () => {
    setMenuAberto((prev) => !prev);
  };

  const abrirCategoria = (view: string) => {
    setMenuAberto(false);
    setActiveView(view);
    setSearch("");
  };

  return (
    <View style={styles.container}>
      {menuAberto && (
        <View style={styles.menuContainer}>
          {opcoes.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              style={[styles.optionWrapper, { backgroundColor: item.background }]}
              onPress={() => abrirCategoria(item.view)}
            >
              <View style={[styles.iconWrapper, { backgroundColor: item.color }]}>
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={18}
                  color="#FFF"
                />
              </View>

              <Text style={styles.optionText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Modal
        transparent
        visible={!!activeView}
        animationType="slide"
        onRequestClose={() => setActiveView(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setActiveView(null)} style={styles.headerIconButton}>
                <MaterialCommunityIcons name="chevron-left" size={28} color="#1F1F1F" />
              </TouchableOpacity>

              <View style={styles.headerTitleWrap}>
                <Text style={styles.headerTitle}>Hoje</Text>
                <Text style={styles.headerSubtitle}>23° dia do ciclo</Text>
              </View>

              <TouchableOpacity onPress={() => setActiveView(null)} style={styles.headerIconButton}>
                <MaterialCommunityIcons name="chevron-right" size={28} color="#1F1F1F" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <MaterialCommunityIcons name="magnify" size={20} color="#5F5F5F" />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar"
                placeholderTextColor="#7D7D7D"
                style={styles.searchInput}
              />
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionTitle}>{currentViewData.title}</Text>

              <View style={styles.chipsWrap}>
                {filteredItems.map((item, index) => (
                  <TouchableOpacity
                    key={`${item.label}-${index}`}
                    activeOpacity={0.9}
                    style={[
                      styles.chip,
                      {
                        backgroundColor: "#F2F2F2",
                        borderColor: "#E4E4E4",
                      },
                    ]}
                  >
                    <View style={[styles.iconBadge, { backgroundColor: item.color }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={18} color="#FFF" />
                    </View>
                    <Text style={styles.chipText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.customButtonContainer}
        activeOpacity={0.9}
        onPress={() => {
          if (activeView) {
            setActiveView(null);
          }
          toggleMenu();
          if (onPress) {
            onPress();
          }
        }}
      >
        <View
          style={[
            styles.customButton,
            {
              backgroundColor: theme.colors.primary,
              shadowColor: theme.colors.primary,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={menuAberto ? "close" : "plus"}
            size={34}
            color="#FFF"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  menuContainer: {
    position: "absolute",
    width: 180,
    bottom: 88,
    alignItems: "center",
    justifyContent: "flex-end",
    rowGap: 8,
  },
  optionWrapper: {
    minWidth: 160,
    height: 56,
    borderRadius: 28,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "left",
  },
  customButtonContainer: {
    top: -14,
    justifyContent: "center",
    alignItems: "center",
  },
  customButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 10,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  modalCard: {
    width: "88%",
    maxWidth: 420,
    height: "88%",
    backgroundColor: "#F2F2F2",
    borderRadius: 30,
    overflow: "hidden",
    paddingTop: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  headerIconButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleWrap: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F1F1F",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#757575",
  },
  searchContainer: {
    marginHorizontal: 18,
    marginTop: 6,
    marginBottom: 12,
    backgroundColor: "#E4E4E4",
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
    color: "#1F1F1F",
  },
  modalBody: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F1F1F",
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
    borderRadius: 999,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  chipText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },
});

export default BotaoAcoes;