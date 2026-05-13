import { Tabs } from "expo-router";

import BotaoAcoes from "@/components/BotaoAcoes";
import { AppTheme } from "@/constants/theme";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

export default function TabLayout() {
  const theme = useTheme<AppTheme>();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "#8E8E93",

        tabBarStyle: {
          backgroundColor: "#FFFFFF",

          borderTopColor:
            theme.colors.surfaceVariant,

          borderTopWidth: 1,

          height: 74,

          paddingBottom: 10,
          paddingTop: 8,

          elevation: 10,

          shadowColor: "#000",

          shadowOffset: {
            width: 0,
            height: -2,
          },

          shadowOpacity: 0.05,
          shadowRadius: 6,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: -5
        },

        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      {/* --- HOME --- */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({
            color,
            size,
            focused,
          }) => (
            <MaterialCommunityIcons
              name={
                focused
                  ? "home"
                  : "home-outline"
              }
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* --- CICLO --- */}
      <Tabs.Screen
        name="ciclo"
        options={{
          title: "Ciclo",

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <MaterialCommunityIcons
              name={
                focused
                  ? "heart"
                  : "heart-outline"
              }
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* --- BOTÃO CENTRAL --- */}
      <Tabs.Screen
        name="acoes"
        options={{
          title: "",

          tabBarButton: (props) => (
            <BotaoAcoes {...props} />
          ),
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
          },
        })}
      />

      {/* --- CONTEÚDOS --- */}
      <Tabs.Screen
        name="conteudos"
        options={{
          title: "Conteúdos",

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <MaterialCommunityIcons
              name={
                focused
                  ? "leaf"
                  : "leaf"
              }
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* --- PERFIL --- */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <MaterialCommunityIcons
              name={
                focused
                  ? "account-circle"
                  : "account-circle-outline"
              }
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}