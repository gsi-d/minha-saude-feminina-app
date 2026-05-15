import { AppLightTheme } from "@/constants/theme";
import { ThemeProvider } from "@react-navigation/native";
import { Redirect, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { isPublicRoute } from "../utils/authRouting";

// Congela a Splash Screen
SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { usuario, authReady } = useAuth();
  const segments = useSegments();
  const firstSegment = segments[0];

  useEffect(() => {
    if (!authReady) {
      return;
    }

    SplashScreen.hideAsync();
  }, [authReady]);

  if (!authReady) {
    return null;
  }

  if (!usuario && !isPublicRoute(firstSegment)) {
    return <Redirect href="/login" />;
  }

  if (usuario && isPublicRoute(firstSegment)) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="cadastro" />
      <Stack.Screen name="cadastroGestante" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  const theme = AppLightTheme;

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      }
    };

    void prepareApp();
  }, []);

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <ThemeProvider value={theme}>
          <RootNavigator />
        </ThemeProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
