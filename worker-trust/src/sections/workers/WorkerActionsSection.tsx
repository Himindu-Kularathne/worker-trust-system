import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const WorkerActionsSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.primaryButton}>
        <Ionicons name="call-outline" size={18} color="#FFF" />
        <Text style={styles.primaryText}>Contact Worker</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryText}>Request Service</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkerActionsSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  primaryButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  primaryText: {
    marginLeft: 8,
    color: "#FFF",
    fontWeight: "600",
  },
  secondaryButton: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2563EB",
    alignItems: "center",
  },
  secondaryText: {
    color: "#2563EB",
    fontWeight: "600",
  },
});
