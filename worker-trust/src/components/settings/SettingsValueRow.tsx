import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/src/hooks/useThemeHook";

export type SettingsValueRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  onPress?: () => void;
};

const SettingsValueRow: React.FC<SettingsValueRowProps> = ({
  icon,
  label,
  value,
  onPress,
}) => {
  const { theme } = useTheme();
  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper
      onPress={onPress}
      style={[
        styles.row,
        { borderBottomColor: theme.border },
      ]}
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

      <Text style={[styles.value, { color: theme.primary }]}>
        {value}
      </Text>
    </Wrapper>
  );
};

export default SettingsValueRow;

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

  value: {
    fontSize: 13,
    fontWeight: "500",
  },
});
