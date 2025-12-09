// src/components/profile/VerificationChip.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type VerificationChipProps = {
  label: string;
};

const VerificationChip: React.FC<VerificationChipProps> = ({ label }) => {
  return (
    <View style={styles.chip}>
      <Ionicons name="document-text-outline" size={14} color="#2563EB" />
      <Text style={styles.text}>{label}</Text>
      <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
    </View>
  );
};

export default VerificationChip;

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#EFF6FF",
    marginRight: 8,
  },
  text: {
    marginHorizontal: 4,
    fontSize: 12,
    color: "#1F2937",
  },
});
