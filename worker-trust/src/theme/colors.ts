export type ThemeMode = "light" | "dark";

export interface AppTheme {
  mode: ThemeMode;

  /* Core */
  background: string;
  surface: string;
  card: string;
  textPrimary: string;
  textSecondary: string;

  /* Brand */
  primary: string;
  primaryText: string;

  star: string;
  switchThumb: string;

  /* States */
  border: string;
  muted: string;
  success: string;
  error: string;
  warning: string;
  danger: string;
}

export const DarkAppTheme: AppTheme = {
  mode: "dark",

  background: "#0F172A",
  surface: "#111827",
  card: "#1E293B",

  textPrimary: "#F8FAFC",
  textSecondary: "#CBD5E1",

  primary: "#60A5FA",
  primaryText: "#020617",

  star: "#FBBF24",

  border: "#1E293B",
  muted: "#94A3B8",
  switchThumb: "#F9FAFB",

  success: "#4ADE80",
  error: "#F87171",
  warning: "#FBBF24",
  danger: "#EF4444",
};

export const LightAppTheme: AppTheme = {
  mode: "light",

  background: "#F3F4F6",
  surface: "#FFFFFF",
  card: "#FFFFFF",

  textPrimary: "#111827",
  textSecondary: "#6B7280",

  primary: "#2563EB",
  primaryText: "#FFFFFF",

  star: "#D97706",

  border: "#E5E7EB",
  muted: "#9CA3AF",
  switchThumb: "#FFFFFF",

  success: "#16A34A",
  error: "#DC2626",
  warning: "#F59E0B",
  danger: "#EF4444",
};
