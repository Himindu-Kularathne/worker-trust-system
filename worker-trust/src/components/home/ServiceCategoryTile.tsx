import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const ServiceCategoryTile: React.FC<Props> = ({ title, icon }) => {
  return (
    <TouchableOpacity style={styles.tile}>
      <Ionicons name={icon} size={28} color="#2563EB" />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ServiceCategoryTile;

const styles = StyleSheet.create({
  tile: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 20,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
});
