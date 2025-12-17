import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Appearance } from "react-native";

import { AppTheme, ThemeMode } from "../theme/colors";
import { getTheme, getSystemThemeMode } from "../theme/themes";

export type ThemePreference = "system" | ThemeMode;

export interface ThemeContextValue {
  theme: AppTheme;
  mode: ThemeMode;                 // actual applied mode
  preference: ThemePreference;     // user choice
  setThemePreference: (p: ThemePreference) => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [preference, setPreference] =
    useState<ThemePreference>("system");

  const [mode, setMode] = useState<ThemeMode>(
    preference === "system" ? getSystemThemeMode() : preference
  );

  // react to system theme changes
  useEffect(() => {
    if (preference !== "system") return;

    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setMode(colorScheme === "dark" ? "dark" : "light");
    });

    return () => sub.remove();
  }, [preference]);

  // apply preference changes
  useEffect(() => {
    if (preference === "system") {
      setMode(getSystemThemeMode());
    } else {
      setMode(preference);
    }
  }, [preference]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        mode,
        preference,
        setThemePreference: setPreference,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
