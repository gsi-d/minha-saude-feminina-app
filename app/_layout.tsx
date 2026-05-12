import { AppLightTheme } from '@/constants/theme';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';

// Congela a Splash Screen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = AppLightTheme;

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Oculta a Splash Screen
        SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={theme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}