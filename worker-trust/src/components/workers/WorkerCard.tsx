import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TrustScoreBadge from "./TrustScoreBadge";

interface Worker {
  id: string;
  name: string;
  rating: number;
  trustScore: number;
  jobsCompleted: number;
}

interface Props {
  worker: Worker;
}

const WorkerCard: React.FC<Props> = ({ worker }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{worker.name}</Text>
        <TrustScoreBadge score={worker.trustScore} />
      </View>

      <Text style={styles.meta}>
        ⭐ {worker.rating} · {worker.jobsCompleted} jobs
      </Text>
    </TouchableOpacity>
  );
};

export default WorkerCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  meta: {
    marginTop: 6,
    fontSize: 13,
    color: "#6B7280",
  },
});
