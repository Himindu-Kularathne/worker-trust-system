import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type StatCardProps = {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={18} color="#2563EB" />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default StatCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  iconWrapper: {
    alignSelf: "flex-start",
    padding: 6,
    borderRadius: 999,
    backgroundColor: "#EEF2FF",
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
});
