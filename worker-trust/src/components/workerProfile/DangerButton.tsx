// src/components/profile/DangerButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type DangerButtonProps = {
  label: string;
  onPress: () => void;
};

const DangerButton: React.FC<DangerButtonProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons
        name="trash-outline"
        size={18}
        color="#B91C1C"
        style={{ marginRight: 6 }}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default DangerButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    backgroundColor: "#FEF2F2",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#B91C1C",
  },
});
