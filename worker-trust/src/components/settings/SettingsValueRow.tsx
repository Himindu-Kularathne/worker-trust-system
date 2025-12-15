import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper onPress={onPress} style={styles.row}>
      <View style={styles.left}>
        <Ionicons name={icon} size={18} color="#6B7280" style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
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
    borderBottomColor: "#E5E7EB",
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
    color: "#111827",
  },
  value: {
    fontSize: 13,
    color: "#2563EB",
  },
});
