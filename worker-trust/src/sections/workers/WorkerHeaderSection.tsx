import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  category: string;
}

const WorkersHeaderSection: React.FC<Props> = ({ category }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {category.charAt(0).toUpperCase() + category.slice(1)}s
      </Text>
      <Text style={styles.subtitle}>Trusted workers available near you</Text>
    </View>
  );
};

export default WorkersHeaderSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },
});
