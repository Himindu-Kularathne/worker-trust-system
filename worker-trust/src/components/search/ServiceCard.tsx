// src/components/search/ServiceCard.tsx
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export type ServiceCardProps = {
  label: string;
  background: string;
  icon: (size: number, color: string) => React.ReactNode;
  onPress?: () => void;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  label,
  background,
  icon,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: background }]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.iconWrapper}>{icon(30, "#FFFFFF")}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 14,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  iconWrapper: {
    alignItems: "flex-start",
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
