import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function HomeTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Worker Trust System</Text>
      <Text style={styles.subtitle}>What would you like to do today?</Text>

      <TouchableOpacity style={styles.card} onPress={() => router.push("/findWorker")}>
        <Text style={styles.cardTitle}>Find a Worker</Text>
        <Text style={styles.cardText}>Search nearby professionals</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push("/offerService")}>
        <Text style={styles.cardTitle}>Offer a Service</Text>
        <Text style={styles.cardText}>Create or manage your services</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push("/(tabs)/profile")}>
        <Text style={styles.cardTitle}>My Profile</Text>
        <Text style={styles.cardText}>View or update your details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: "#666",
  },
});
