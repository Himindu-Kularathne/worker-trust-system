import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QuickActionButton from "@/src/components/workerHome/QuickActionButton";

const QuickActionsSection: React.FC = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Quick Actions</Text>
      <View style={styles.row}>
        <QuickActionButton
          label="Update My Location"
          icon="location-outline"
          background="#3B82F6"
        />
        <QuickActionButton
          label="Request Rating"
          icon="star-outline"
          background="#22C55E"
        />
        <QuickActionButton
          label="Edit Profile"
          icon="create-outline"
          background="#F59E0B"
        />
      </View>
    </View>
  );
};

export default QuickActionsSection;

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
