import { Tabs } from "expo-router";
import React from "react";

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
          backgroundColor: "#FFFF",
          borderTopColor: theme.colors.surfaceVariant,
          elevation: 8,
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
        name="conteudos"
        options={{
          title: "Conteúdos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="leaf" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
