import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/src/hooks/useThemeHook";

export type SettingsToggleRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

const SettingsToggleRow: React.FC<SettingsToggleRowProps> = ({
  icon,
  label,
  value,
  onChange,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Ionicons
          name={icon}
          size={18}
          color={theme.textSecondary}
          style={styles.icon}
        />
        <Text style={[styles.label, { color: theme.textPrimary }]}>
          {label}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{
          false: theme.border,
          true: theme.primary,
        }}
        thumbColor={theme.primaryText}
      />
    </View>
  );
};

export default SettingsToggleRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    justifyContent: "space-between",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    marginRight: 10,
  },

  label: {
    fontSize: 14,
  },
});
