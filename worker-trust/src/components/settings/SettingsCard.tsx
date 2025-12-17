import React from "react";
import { View, StyleSheet } from "react-native";

import { useTheme } from "@/src/hooks/useThemeHook";

export type SettingsCardProps = {
  children: React.ReactNode;
};

const SettingsCard: React.FC<SettingsCardProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          shadowOpacity: theme.mode === "dark" ? 0.3 : 0.04,
          borderColor: theme.border,
          borderWidth: theme.mode === "dark" ? 1 : 0,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default SettingsCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
});
