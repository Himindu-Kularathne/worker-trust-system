// src/components/profile/PrimaryButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "solid" | "outline";
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  variant = "solid",
}) => {
  const isOutline = variant === "outline";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isOutline ? styles.outlineButton : styles.solidButton,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.label,
          isOutline ? styles.outlineLabel : styles.solidLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  solidButton: {
    backgroundColor: "#2563EB",
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#2563EB",
    backgroundColor: "#FFFFFF",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
  },
  solidLabel: {
    color: "#FFFFFF",
  },
  outlineLabel: {
    color: "#2563EB",
  },
});
