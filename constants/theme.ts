import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme as NavigationTheme,
} from "@react-navigation/native";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
} from "react-native-paper";

export type AppTheme = MD3Theme & NavigationTheme;

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const brandPrimary = "#C56682";
const brandSecondary = "#fff6f8";
const brandTertiary = "#C43A4A";
const brandSurface = "#FBF4EB";
const brandError = "#b00020";

export const AppLightTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    primary: brandPrimary,
    secondary: brandSecondary,
    tertiary: brandTertiary,
    surface: brandSurface,
    background: "#fff6f8",
    error: brandError,
  },
  fonts: MD3LightTheme.fonts,
} as unknown as AppTheme;

export const AppDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    primary: brandPrimary,
    secondary: brandSecondary,
    surface: brandSurface,
    background: "#fff6f8",
    error: brandError,
  },
  fonts: MD3DarkTheme.fonts,
} as unknown as AppTheme;
