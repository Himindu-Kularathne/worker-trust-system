import React from "react";
import { View, StyleSheet } from "react-native";

export type SettingsCardProps = {
  children: React.ReactNode;
};

const SettingsCard: React.FC<SettingsCardProps> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default SettingsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
});
