import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Worker Trust System</Text>
        <Text style={styles.subtitle}>Welcome Back</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Rating</Text>
          <Text style={styles.rating}>4.8 ⭐</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Completed Jobs</Text>
          <Text style={styles.statNumber}>24</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Active Jobs</Text>
          <Text style={styles.statNumber}>3</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#2563eb",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#e0e7ff",
    marginTop: 8,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  rating: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563eb",
  },
});
