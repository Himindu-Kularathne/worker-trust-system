import React from "react";
import { View, StyleSheet } from "react-native";
import ServiceCard from "@/src/components/search/ServiceCard";
import { Ionicons } from "@expo/vector-icons";

const ServicesSection: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <ServiceCard
          label="Electrician"
          icon={(size, color) => (
            <Ionicons name="flash-outline" size={size} color={color} />
          )}
          background="#3B82F6"
        />
        <ServiceCard
          label="Plumber"
          icon={(size, color) => (
            <Ionicons name="water-outline" size={size} color={color} />
          )}
          background="#22C55E"
        />
      </View>

      <View style={styles.row}>
        <ServiceCard
          label="Carpenter"
          icon={(size, color) => (
            <Ionicons name="construct-outline" size={size} color={color} />
          )}
          background="#F59E0B"
        />
        <ServiceCard
          label="Painter"
          icon={(size, color) => (
            <Ionicons name="color-palette-outline" size={size} color={color} />
          )}
          background="#8B5CF6"
        />
      </View>

      <View style={styles.row}>
        <ServiceCard
          label="Cleaner"
          icon={(size, color) => (
            <Ionicons name="broom-outline" size={size} color={color} />
          )}
          background="#A855F7"
        />
        <ServiceCard
          label="More Services"
          icon={(size, color) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          )}
          background="#0EA5E9"
        />
      </View>
    </View>
  );
};

export default ServicesSection;

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
});
