import { Stack } from "expo-router";
import { useTheme } from "@/src/hooks/useThemeHook";

export default function AuthLayout() {
  const { theme } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.surface,
        },
        headerTitleStyle: {
          color: theme.textPrimary,
        },
        headerTintColor: theme.primary,
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen name="register" options={{ title: "Register" }} />
    </Stack>
  );
}
