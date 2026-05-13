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
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.outline,

        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: theme.colors.surfaceVariant,
          borderTopWidth: 1,
          elevation: 8,
          height: 72,
          paddingBottom: 8,
          paddingTop: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        headerShown: false,
      }}
    >
      {/* --- HOME --- */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              size={size}
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

          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={
                focused
                  ? "calendar-month"
                  : "calendar-month-outline"
              }
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* --- AÇÕES --- */}
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
            console.log("Abrir registro de sintomas!");
          },
        })}
      />

      {/* --- CONTEÚDOS --- */}
      <Tabs.Screen
        name="conteudos"
        options={{
          title: "Conteúdos",

          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={
                focused
                  ? "newspaper-variant"
                  : "newspaper-variant-outline"
              }
              size={size}
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

          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={
                focused
                  ? "account-circle"
                  : "account-circle-outline"
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}