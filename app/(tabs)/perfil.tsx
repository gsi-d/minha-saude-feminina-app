import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Divider,
  List,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

import { useAuth } from "../../contexts/AuthContext";

export default function PerfilScreen() {
  const theme = useTheme();
  const router = useRouter();

  const { usuario, logout } = useAuth();

  const iniciais = usuario?.nome
    ? usuario.nome.substring(0, 2).toUpperCase()
    : "US";

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* --- HEADER PERFIL --- */}
      <Surface
        style={[
          styles.headerContainer,
          { backgroundColor: theme.colors.primaryContainer },
        ]}
        elevation={1}
      >
        <Avatar.Text
          size={90}
          label={iniciais}
          style={[
            styles.avatar,
            { backgroundColor: theme.colors.primary },
          ]}
          color="#FFF"
        />

        <Text variant="headlineSmall" style={styles.nameText}>
          {usuario?.nome || "Usuária não encontrada"}
        </Text>

        <Text
          variant="bodyLarge"
          style={[
            styles.emailText,
            { color: theme.colors.outline },
          ]}
        >
          {usuario?.email}
        </Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Saúde Feminina
          </Text>
        </View>
      </Surface>

      {/* --- CARD RESUMO --- */}
      <Card style={styles.summaryCard} elevation={1}>
        <Card.Content style={styles.summaryContent}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>08</Text>
            <Text style={styles.summaryLabel}>Dias</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>12</Text>
            <Text style={styles.summaryLabel}>Registros</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>03</Text>
            <Text style={styles.summaryLabel}>Lembretes</Text>
          </View>
        </Card.Content>
      </Card>

      {/* --- DADOS PESSOAIS --- */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          Dados pessoais
        </Text>

        <Card style={styles.infoCard} elevation={0}>
          <List.Item
            title="Telefone"
            description={usuario?.telefone || "Não informado"}
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDescription}
            left={(props) => (
              <List.Icon
                {...props}
                icon="phone-outline"
                color={theme.colors.primary}
              />
            )}
          />

          <Divider />

          <List.Item
            title="Data de nascimento"
            description={
              usuario?.dataNascimento
                ? usuario.dataNascimento
                    .split("-")
                    .reverse()
                    .join("/")
                : "Não informada"
            }
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDescription}
            left={(props) => (
              <List.Icon
                {...props}
                icon="cake-variant-outline"
                color={theme.colors.primary}
              />
            )}
          />

          <Divider />

          <List.Item
            title="Tipo de perfil"
            description="Acompanhamento de saúde"
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDescription}
            left={(props) => (
              <List.Icon
                {...props}
                icon="account-heart-outline"
                color={theme.colors.primary}
              />
            )}
          />
        </Card>
      </View>

      {/* --- CONFIGURAÇÕES --- */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          Configurações
        </Text>

        <Card style={styles.infoCard} elevation={0}>
          <List.Item
            title="Notificações"
            description="Gerenciar lembretes e alertas"
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDescription}
            left={(props) => (
              <List.Icon
                {...props}
                icon="bell-outline"
                color={theme.colors.primary}
              />
            )}
            right={(props) => (
              <List.Icon
                {...props}
                icon="chevron-right"
              />
            )}
          />

          <Divider />

          <List.Item
            title="Privacidade"
            description="Controle de dados e segurança"
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDescription}
            left={(props) => (
              <List.Icon
                {...props}
                icon="shield-lock-outline"
                color={theme.colors.primary}
              />
            )}
            right={(props) => (
              <List.Icon
                {...props}
                icon="chevron-right"
              />
            )}
          />
        </Card>
      </View>

      {/* --- BOTÃO SAIR --- */}
      <View style={styles.actionsContainer}>
        <Button
          mode="outlined"
          icon="logout"
          textColor={theme.colors.error}
          style={[
            styles.logoutButton,
            { borderColor: theme.colors.error },
          ]}
          contentStyle={styles.logoutButtonContent}
          onPress={handleLogout}
        >
          Sair da conta
        </Button>
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
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginBottom: 24,
  },

  avatar: {
    elevation: 4,
  },

  nameText: {
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 6,
    color: "#000",
  },

  emailText: {
    marginBottom: 14,
  },

  badge: {
    backgroundColor: "#FFF",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 18,
  },

  badgeText: {
    fontWeight: "600",
    color: "#C43A4A",
    fontSize: 13,
  },

  summaryCard: {
    marginHorizontal: 24,
    borderRadius: 24,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    marginBottom: 28,
  },

  summaryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
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
    height: 36,
    backgroundColor: "#EEE",
  },

  sectionContainer: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 14,
    marginHorizontal: 24,
  },

  infoCard: {
    marginHorizontal: 24,
    borderRadius: 24,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    overflow: "hidden",
  },

  listTitle: {
    color: "#000",
    fontWeight: "600",
  },

  listDescription: {
    color: "#666",
  },

  actionsContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },

  logoutButton: {
    borderWidth: 1,
    borderRadius: 18,
  },

  logoutButtonContent: {
    paddingVertical: 6,
  },
});