import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import {
  Avatar,
  Card,
  IconButton,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* --- HEADER --- */}
      <Surface
        style={[
          styles.headerContainer,
          {
            backgroundColor: "#FFF",
          },
        ]}
        elevation={1}
      >
        <View style={styles.header}>
          <View style={styles.userSection}>
            <Avatar.Text
              size={56}
              label="MS"
              style={styles.avatar}
              labelStyle={[
                styles.avatarLabel,
                {
                  color: theme.colors.primary,
                },
              ]}
            />

            <View style={styles.greetingText}>
              <Text
                variant="labelLarge"
                style={[
                  styles.greeting,
                  {
                    color: theme.colors.outline,
                  },
                ]}
              >
                Bem-vinda,
              </Text>

              <Text
                variant="headlineSmall"
                style={[
                  styles.userName,
                  {
                    color: theme.colors.onBackground,
                  },
                ]}
              >
                Maria Silva
              </Text>
            </View>
          </View>

          <IconButton
            icon="bell-outline"
            iconColor={theme.colors.onBackground}
            size={26}
            onPress={() => console.log("Abrir notificações")}
          />
        </View>

        <Text style={styles.headerDescription}>
          Acompanhe seu ciclo, hábitos e bem-estar diário.
        </Text>
      </Surface>

      {/* --- RESUMO --- */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            08
          </Text>

          <Text style={styles.summaryLabel}>
            Dia do ciclo
          </Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            02
          </Text>

          <Text style={styles.summaryLabel}>
            Lembretes
          </Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            03
          </Text>

          <Text style={styles.summaryLabel}>
            Registros
          </Text>
        </View>
      </View>

      {/* --- CARD PRINCIPAL CICLO --- */}
      <Card
        style={styles.mainCard}
        elevation={1}
        onPress={() => router.push("/ciclo")}
      >
        <Card.Content>
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor:
                    theme.colors.primaryContainer,
                },
              ]}
            >
              <IconButton
                icon="calendar-month-outline"
                size={28}
                iconColor={theme.colors.primary}
                style={styles.cardIcon}
              />
            </View>

            <View style={styles.cardHeaderText}>
              <Text
                variant="titleLarge"
                style={styles.cardTitle}
              >
                Ciclo Menstrual
              </Text>

              <Text style={styles.cardSubtitle}>
                Atualizado hoje
              </Text>
            </View>
          </View>

          <Text
            variant="bodyMedium"
            style={styles.cardDescription}
          >
            Você está na fase folicular. Seu corpo
            tende a apresentar mais energia e
            disposição física neste período.
          </Text>
        </Card.Content>
      </Card>

      {/* --- CALENDÁRIO CICLO --- */}
      <Card
        style={styles.calendarCard}
        elevation={1}
      >
        <Card.Content>
          <View style={styles.calendarHeader}>
            <View style={styles.calendarTitleContainer}>
              <MaterialCommunityIcons
                name="calendar-heart"
                size={22}
                color="#C43A4A"
              />

              <Text style={styles.calendarTitle}>
                Próximo ciclo
              </Text>
            </View>

            <Text style={styles.calendarStatus}>
              Regular
            </Text>
          </View>

          <View style={styles.calendarInfoContainer}>
            <View style={styles.calendarInfoItem}>
              <Text style={styles.calendarLabel}>
                Menstruação
              </Text>

              <Text style={styles.calendarDate}>
                12 Ago
              </Text>
            </View>

            <View style={styles.calendarInfoItem}>
              <Text style={styles.calendarLabel}>
                Ovulação
              </Text>

              <Text style={styles.calendarDate}>
                24 Ago
              </Text>
            </View>

            <View style={styles.calendarInfoItem}>
              <Text style={styles.calendarLabel}>
                Ciclo
              </Text>

              <Text style={styles.calendarDate}>
                Dia 08
              </Text>
            </View>
          </View>

          {/* MINI CALENDÁRIO */}
          <View style={styles.miniCalendar}>
            {["S", "T", "Q", "Q", "S", "S", "D"].map(
              (dia, index) => (
                <Text
                  key={index}
                  style={styles.weekDay}
                >
                  {dia}
                </Text>
              )
            )}

            {[8, 9, 10, 11, 12, 13, 14].map(
              (dia, index) => (
                <View
                  key={index}
                  style={[
                    styles.dayCircle,
                    dia === 12 &&
                      styles.activeDayCircle,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      dia === 12 &&
                        styles.activeDayText,
                    ]}
                  >
                    {dia}
                  </Text>
                </View>
              )
            )}
          </View>
        </Card.Content>
      </Card>

      {/* --- DICA DO DIA --- */}
      <Card style={styles.tipCard} elevation={0}>
        <Card.Content>
          <View style={styles.tipHeader}>
            <IconButton
              icon="heart-pulse"
              size={22}
              iconColor="#C43A4A"
              style={styles.tipIcon}
            />

            <Text style={styles.tipTitle}>
              Dica do dia
            </Text>
          </View>

          <Text
            variant="bodyMedium"
            style={styles.tipText}
          >
            Dormir bem ajuda no equilíbrio hormonal
            e melhora o bem-estar emocional.
          </Text>
        </Card.Content>
      </Card>

      {/* --- ACESSOS RÁPIDOS --- */}
      <Text style={styles.sectionTitle}>
        Acessos rápidos
      </Text>

      <View style={styles.quickAccessContainer}>
        {/* CONTEÚDOS */}
        <Card
          style={styles.smallCard}
          elevation={0}
          onPress={() => router.push("/conteudos")}
        >
          <Card.Content style={styles.smallCardContent}>
            <View
              style={[
                styles.smallIconContainer,
                {
                  backgroundColor: "#EEF3FF",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="newspaper-variant-outline"
                size={24}
                color="#4F6BED"
              />
            </View>

            <Text
              variant="titleMedium"
              style={styles.smallCardTitle}
            >
              Conteúdos
            </Text>

            <Text
              variant="bodySmall"
              style={styles.smallCardText}
            >
              Artigos e dicas personalizadas.
            </Text>
          </Card.Content>
        </Card>

        {/* AÇÕES */}
        <Card
          style={styles.smallCard}
          elevation={0}
          onPress={() => router.push("/acoes")}
        >
          <Card.Content style={styles.smallCardContent}>
            <View
              style={[
                styles.smallIconContainer,
                {
                  backgroundColor: "#FDE7F3",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="clipboard-check-outline"
                size={24}
                color="#EC4899"
              />
            </View>

            <Text
              variant="titleMedium"
              style={styles.smallCardTitle}
            >
              Registros
            </Text>

            <Text
              variant="bodySmall"
              style={styles.smallCardText}
            >
              Sintomas, hábitos e acompanhamento.
            </Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    paddingTop: 24,
    paddingBottom: 40,
  },

  /* HEADER */

  headerContainer: {
    marginHorizontal: 20,
    borderRadius: 32,
    paddingHorizontal: 22,
    paddingVertical: 28,
    marginBottom: 28,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  userSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    backgroundColor: "#FFF",
  },

  avatarLabel: {
    fontWeight: "bold",
  },

  greetingText: {
    marginLeft: 14,
  },

  greeting: {
    marginBottom: 2,
  },

  userName: {
    fontWeight: "bold",
  },

  headerDescription: {
    marginTop: 16,
    color: "#555",
    lineHeight: 22,
    fontSize: 14,
  },

  /* RESUMO */

  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: "#FFF",
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },

  summaryItem: {
    flex: 1,
    alignItems: "center",
  },

  summaryNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#C43A4A",
  },

  summaryLabel: {
    marginTop: 4,
    color: "#666",
    fontSize: 12,
  },

  summaryDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#EEE",
  },

  /* CARD PRINCIPAL */

  mainCard: {
    marginHorizontal: 24,
    marginBottom: 20,
    borderRadius: 28,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  cardIcon: {
    margin: 0,
  },

  cardHeaderText: {
    marginLeft: 14,
    flex: 1,
  },

  cardTitle: {
    fontWeight: "bold",
    color: "#000",
  },

  cardSubtitle: {
    marginTop: 2,
    color: "#777",
    fontSize: 13,
  },

  cardDescription: {
    marginTop: 18,
    lineHeight: 22,
    color: "#666",
  },

  /* CALENDÁRIO */

  calendarCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 28,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  calendarTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  calendarTitle: {
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 17,
    color: "#000",
  },

  calendarStatus: {
    color: "#C43A4A",
    fontWeight: "600",
    fontSize: 13,
  },

  calendarInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  calendarInfoItem: {
    alignItems: "center",
  },

  calendarLabel: {
    color: "#777",
    fontSize: 12,
    marginBottom: 6,
  },

  calendarDate: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 15,
  },

  miniCalendar: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },

  weekDay: {
    width: "14%",
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    fontWeight: "600",
  },

  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  activeDayCircle: {
    backgroundColor: "#C43A4A",
  },

  dayText: {
    color: "#444",
    fontWeight: "600",
  },

  activeDayText: {
    color: "#FFF",
  },

  /* DICA */

  tipCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 24,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  tipIcon: {
    margin: 0,
    marginRight: 6,
  },

  tipTitle: {
    fontWeight: "bold",
    color: "#C43A4A",
    fontSize: 15,
  },

  tipText: {
    color: "#666",
    lineHeight: 21,
  },

  /* ACESSOS */

  sectionTitle: {
    marginHorizontal: 24,
    marginBottom: 16,
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
  },

  quickAccessContainer: {
    flexDirection: "row",
    gap: 16,
    marginHorizontal: 24,
  },

  smallCard: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  smallCardContent: {
    alignItems: "flex-start",
  },

  smallIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  smallCardTitle: {
    fontWeight: "bold",
    color: "#000",
  },

  smallCardText: {
    marginTop: 6,
    color: "#666",
    lineHeight: 18,
  },
});