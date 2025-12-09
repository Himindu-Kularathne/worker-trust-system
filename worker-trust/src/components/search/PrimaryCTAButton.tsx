// src/components/search/PrimaryCTAButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export type PrimaryCTAButtonProps = {
  label: string;
  onPress: () => void;
};

const PrimaryCTAButton: React.FC<PrimaryCTAButtonProps> = ({
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryCTAButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
