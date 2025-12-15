import React, { use } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TrustScoreBadge from "./TrustScoreBadge";
import { useRouter } from "expo-router";
import { Worker } from "@/src/types/worker";

interface Props {
  worker: Worker;
}

const WorkerCard: React.FC<Props> = ({ worker }) => {
  const router = useRouter();

  const handledRoute = () => {
    router.push(`/workers/${worker.id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handledRoute}>
      <View style={styles.row}>
        <Text style={styles.name}>{worker.full_name}</Text>
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
