import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ReminderItem from "@/src/components/workerHome/ReminderItem";

const RemindersSection: React.FC = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Today&apos;s Reminders</Text>
      <ReminderItem
        icon="notifications-outline"
        iconColor="#3B82F6"
        text="You have 1 pending rating request"
      />
      <ReminderItem
        icon="chatbubble-ellipses-outline"
        iconColor="#10B981"
        text="New review received today"
      />
    </View>
  );
};

export default RemindersSection;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
});
