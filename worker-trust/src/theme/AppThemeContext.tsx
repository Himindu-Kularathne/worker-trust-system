import React, { createContext, useContext } from "react";
import { useColorScheme } from "@/components/useColorScheme";
import { LightAppTheme, DarkAppTheme, AppTheme } from "./themes";

const AppThemeContext = createContext<AppTheme | undefined>(undefined);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? DarkAppTheme : LightAppTheme;

  return <AppThemeContext.Provider value={theme}>{children}</AppThemeContext.Provider>;
}

export function useAppTheme() {
  const theme = useContext(AppThemeContext);
  if (!theme) {
    throw new Error("useAppTheme must be used inside AppThemeProvider");
  }
  return theme;
}
