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

  /* States */
  border: string;
  muted: string;
  success: string;
  error: string;
}

export const DarkAppTheme: AppTheme = {
  mode: "dark",

  background: "#0B1220",      // deep navy
  surface: "#111827",         // sheets
  card: "#1F2937",

  textPrimary: "#F9FAFB",
  textSecondary: "#9CA3AF",

  primary: "#3B82F6",         // lighter blue for dark bg
  primaryText: "#FFFFFF",

  border: "#374151",
  muted: "#6B7280",

  success: "#22C55E",
  error: "#EF4444",
};

export const LightAppTheme: AppTheme = {
  mode: "light",

  background: "#F3F4F6",      // app background
  surface: "#FFFFFF",        // sheets / modals
  card: "#FFFFFF",

  textPrimary: "#111827",     // main text
  textSecondary: "#6B7280",   // subtitles

  primary: "#2563EB",         // brand blue
  primaryText: "#FFFFFF",

  border: "#E5E7EB",
  muted: "#9CA3AF",

  success: "#16A34A",
  error: "#DC2626",
};
