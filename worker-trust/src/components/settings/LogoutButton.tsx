import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export type LogoutButtonProps = {
  onPress: () => void;
};

const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.label}>Log Out</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DC2626",
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
