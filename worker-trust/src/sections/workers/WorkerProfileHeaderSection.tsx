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
      {/* Name */}
      <Text style={styles.name}>{worker.full_name}</Text>

      {/* Category + Trust */}
      <View style={styles.row}>
        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>
            {worker.category.toUpperCase()}
          </Text>
        </View>

        <TrustScoreBadge score={worker.trust_score} />
      </View>

      {/* Rating */}
      <View style={styles.ratingRow}>
        <Text style={styles.star}>★</Text>
        <Text style={styles.ratingText}>{worker.rating}</Text>
        <Text style={styles.reviewCount}>({worker.review_count} reviews)</Text>
      </View>
    </View>
  );
};

export default WorkerProfileHeaderSection;

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  categoryPill: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2563EB",
    letterSpacing: 0.5,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  star: {
    color: "#FACC15",
    fontSize: 16,
    marginRight: 4,
  },

  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginRight: 6,
  },

  reviewCount: {
    fontSize: 13,
    color: "#6B7280",
  },
});
