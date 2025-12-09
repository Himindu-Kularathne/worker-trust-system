import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type QuickActionButtonProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  background: string;
};

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  label,
  icon,
  background,
}) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: background }]}>
      <Ionicons name={icon} size={22} color="#fff" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default QuickActionButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
