import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "@/src/hooks/UserContextHook";

const HomeHeaderSection: React.FC = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi {user?.name ?? "there"} 👋</Text>
      <Text style={styles.subtitle}>Find trusted workers near you</Text>
    </View>
  );
};

export default HomeHeaderSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B7280",
  },
});
