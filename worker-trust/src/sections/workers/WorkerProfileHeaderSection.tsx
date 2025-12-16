import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TrustScoreBadge from "@/src/components/workers/TrustScoreBadge";
import { Worker } from "@/src/types/worker";

interface Props {
  worker: Worker;
}

const WorkerProfileHeaderSection: React.FC<Props> = ({ worker }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{worker.full_name}</Text>

      <View style={styles.row}>
        <Text style={styles.category}>{worker.category.toUpperCase()}</Text>
        <TrustScoreBadge score={worker.trust_score} />
      </View>

      <Text style={styles.rating}>
        ⭐ {worker.rating} · {worker.review_count} reviews
      </Text>
    </View>
  );
};

export default WorkerProfileHeaderSection;

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  category: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2563EB",
  },
  rating: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
  },
});
