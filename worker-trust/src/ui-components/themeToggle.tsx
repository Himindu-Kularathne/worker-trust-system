import { View, Text, StyleSheet, Switch } from "react-native";
import { useAppTheme } from "@/src/context/AppThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>Dark Mode</Text>
      <Switch value={theme.mode === "dark"} onValueChange={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
});
