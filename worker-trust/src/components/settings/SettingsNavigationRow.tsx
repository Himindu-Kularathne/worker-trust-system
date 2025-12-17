import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/src/hooks/useThemeHook";

export type SettingsNavigationRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

const SettingsNavigationRow: React.FC<SettingsNavigationRowProps> = ({
  icon,
  label,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.row,
        { borderBottomColor: theme.border },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
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

      <Ionicons
        name="chevron-forward"
        size={18}
        color={theme.textSecondary}
      />
    </TouchableOpacity>
  );
};

export default SettingsNavigationRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },

  icon: {
    marginRight: 10,
  },

  label: {
    fontSize: 14,
  },
});
