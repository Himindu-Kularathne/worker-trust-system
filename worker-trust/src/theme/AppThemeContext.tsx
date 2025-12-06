import React, { createContext, useContext } from "react";
import { useColorScheme } from "@/components/useColorScheme";
import { LightAppTheme, DarkAppTheme, AppTheme } from "./themes";

type ThemePreference = "system" | "light" | "dark";

type AppThemeContextType = {
  theme: AppTheme;
  preference: ThemePreference;
  toggleTheme: () => void;
};

const AppThemeContext = createContext<AppThemeContextType | undefined>(undefined);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [preference, setPreference] = React.useState<ThemePreference>("system");
  const resolvedMode = preference === "system" ? systemScheme : preference;
  const theme = resolvedMode === "dark" ? DarkAppTheme : LightAppTheme;

  const toggleTheme = () => {
    setPreference((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return <AppThemeContext.Provider value={{ theme, preference, toggleTheme }}>{children}</AppThemeContext.Provider>;
}

export function useAppTheme() {
  const theme = useContext(AppThemeContext);
  if (!theme) {
    throw new Error("useAppTheme must be used inside AppThemeProvider");
  }
  return theme;
}
