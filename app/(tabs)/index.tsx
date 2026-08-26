import { enumTipoUsuario } from "@/constants/enums";
import { useAuth } from "@/contexts/AuthContext";
import { createConteudosRepository } from "@/data/conteudos/conteudos.repository";
import { createDicasRepository } from "@/data/dicas/dicas.repository";
import { Dica } from "@/data/dicas/dicas.types";
import type { ResumoConteudo } from "@/domain/conteudos/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

const conteudosRepository = createConteudosRepository();
const dicasRepository = createDicasRepository();

const HOME_CARD_CONFIG: Record<enumTipoUsuario, {
  titulo: string;
  subtitulo: string;
  descricaoVazia: string;
}> = {
  [enumTipoUsuario.Adolescente]: {
    titulo: "Ciclo Menstrual",
    subtitulo: "Dicas para sua fase de desenvolvimento",
    descricaoVazia: "Conteúdos sobre ciclo e fluxo aparecerão aqui.",
  },
  [enumTipoUsuario.Gestante]: {
    titulo: "Gestação",
    subtitulo: "Acompanhando sua jornada",
    descricaoVazia: "Informações sobre pré-natal aparecerão aqui.",
  },
  [enumTipoUsuario.Tentante]: {
    titulo: "Planejamento",
    subtitulo: "Conteúdo para sua janela fértil",
    descricaoVazia: "Dicas de fertilidade aparecerão aqui.",
  },
  [enumTipoUsuario.Menopausa]: {
    titulo: "Climatério",
    subtitulo: "Bem-estar nesta nova fase",
    descricaoVazia: "Conteúdos sobre menopausa aparecerão aqui.",
  },
  [enumTipoUsuario.NaoDefinido]: {
    titulo: "Saúde Feminina",
    subtitulo: "Dicas gerais para o seu dia",
    descricaoVazia: "Configure seu perfil para dicas personalizadas.",
  },
  [enumTipoUsuario.Administrador]: {
    titulo: "Painel Admin",
    subtitulo: "Gestão do sistema",
    descricaoVazia: "Nenhum dado pendente.",
  },
};

function selecionarConteudoDestaque(
  conteudos: ResumoConteudo[],
): ResumoConteudo | null {
  return conteudos[0] ?? null;
}

function selecionarDicaDoDia(dicas: Dica[]): Dica | null {
  return dicas[0] ?? null;
}

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { usuario } = useAuth();
  const [conteudoDestaque, setConteudoDestaque] = useState<ResumoConteudo | null>(null);
  const [dicaDoDia, setDicaDoDia] = useState<Dica | null>(null);

const tipoUsuarioAtual = (usuario?.tipoUsuario as enumTipoUsuario) || enumTipoUsuario.NaoDefinido;
const config = HOME_CARD_CONFIG[tipoUsuarioAtual];
  useEffect(() => {
    let ativo = true;

    const loadHomeData = async () => {
      try {
        const conteudos = await conteudosRepository.listPublishedByAudience(tipoUsuarioAtual);

        let dicaSelecionada: Dica | null = null;
        try {
          const [dicasPerfil, dicasFallback] = await Promise.all([
            dicasRepository.listByTipoUsuario(tipoUsuarioAtual),
            dicasRepository.listByTipoUsuario(enumTipoUsuario.NaoDefinido),
          ]);

          dicaSelecionada =
            selecionarDicaDoDia(dicasPerfil) ?? selecionarDicaDoDia(dicasFallback);
        } catch {
          dicaSelecionada = null;
        }

        if (!ativo) return;
        setConteudoDestaque(selecionarConteudoDestaque(conteudos));
        setDicaDoDia(dicaSelecionada);
      } catch {
        if (!ativo) return;
        setConteudoDestaque(null);
        setDicaDoDia(null);
      }
    };

    void loadHomeData();

    return () => {
      ativo = false;
    };
  }, [tipoUsuarioAtual]);

  const abrirConteudoDestaque = () => {
    if (!conteudoDestaque) {
      router.push("/conteudos");
      return;
    }

    router.push({
      pathname: "/conteudoDetalhe/[id]",
      params: {
        id: conteudoDestaque.id,
      },
    });
  };

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
                {usuario?.nome}
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
          {tipoUsuarioAtual === enumTipoUsuario.NaoDefinido
            ? "Acompanhe sua saúde, hábitos e bem-estar diário."
            : `Acompanhe conteúdos e cuidados pensados para o perfil ${tipoUsuarioAtual}.`}
        </Text>
      </Surface>

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

      <Card
        style={styles.mainCard}
        elevation={1}
        onPress={abrirConteudoDestaque}
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
                {config.titulo}
              </Text>

              <Text style={styles.cardSubtitle}>
                {conteudoDestaque?.titulo ?? config.subtitulo}
              </Text>
            </View>
          </View>

          <Text
            variant="bodyMedium"
            style={styles.cardDescription}
          >
            {conteudoDestaque?.resumo ?? config.descricaoVazia}
          </Text>
        </Card.Content>
      </Card>

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
              {dicaDoDia?.titulo ?? "Dica do dia"}
            </Text>
          </View>

          <Text
            variant="bodyMedium"
            style={styles.tipText}
          >
            {dicaDoDia?.texto ??
              "Em breve, você verá dicas rápidas e personalizadas para o seu perfil aqui."}
          </Text>
        </Card.Content>
      </Card>

      <Text style={styles.sectionTitle}>
        Acessos rápidos
      </Text>

      <View style={styles.quickAccessContainer}>
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
