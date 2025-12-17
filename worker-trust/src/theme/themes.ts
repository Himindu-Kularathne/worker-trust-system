import { Appearance } from "react-native";
import { ThemeMode } from "./colors";
import { LightAppTheme, DarkAppTheme } from "./colors";

export const getSystemThemeMode = (): ThemeMode => {
  return Appearance.getColorScheme() === "dark" ? "dark" : "light";
};

export const getTheme = (mode: ThemeMode) => {
  return mode === "dark" ? DarkAppTheme : LightAppTheme;
};
