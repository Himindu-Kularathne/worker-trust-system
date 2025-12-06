export type ThemeMode = "light" | "dark";

export interface AppTheme {
  mode: ThemeMode;
  background: string;
  text: string;
  card: string;
}

export const LightAppTheme: AppTheme = {
  mode: "light",
  background: "#d0d0c0",
  text: "#242c40",
  card: "#ffffff",
};

export const DarkAppTheme: AppTheme = {
  mode: "dark",
  background: "#242c40",
  text: "#d0d0c0",
  card: "#121826",
};
