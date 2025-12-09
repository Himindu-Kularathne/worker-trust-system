import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type InfoRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
};

const InfoRow: React.FC<InfoRowProps> = ({ icon, text }) => {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={16} color="#6B7280" style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default InfoRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 13,
    color: "#374151",
    flexShrink: 1,
  },
});
