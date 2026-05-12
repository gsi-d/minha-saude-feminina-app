import { Tabs } from "expo-router";
import React from "react";

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
          elevation: 8,
          height: '7%', 
          paddingBottom: 5,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="forum-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ciclo"
        options={{
          title: "Ciclo",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="acoes"
        options={{
          title: "",
          tabBarButton: (props) => <BotaoAcoes {...props} />,
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            console.log("Abrir registro de sintomas!");
          },
        })}
      />

      <Tabs.Screen
        name="conteudos"
        options={{
          title: "Conteúdos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="leaf" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="face-woman-profile" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}