import React from "react";
import { View, StyleSheet } from "react-native";
import StatCard from "@/src/components/workerHome/StatCard";

const StatsSection: React.FC = () => {
  return (
    <View style={styles.row}>
      <StatCard label="Jobs Completed" value="120" icon="hammer-outline" />
      <StatCard label="New Reviews" value="3" icon="chatbubbles-outline" />
      <StatCard label="Profile Views" value="18" icon="eye-outline" />
    </View>
  );
};

export default StatsSection;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
