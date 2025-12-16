import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SRI_LANKA_PROVINCES } from "@/src/constants/sriLankaLocations";
import { Worker } from "@/src/types/worker";

interface Props {
  worker: Worker;
}

const WorkerInfoSection: React.FC<Props> = ({ worker }) => {
  const provinceName = SRI_LANKA_PROVINCES.find(
    (p) => p.id === worker.province
  )?.name;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Details</Text>

      <InfoRow label="Location" value={`${worker.city}, ${provinceName}`} />
      <InfoRow label="Experience" value={`${worker.review_count} reviews`} />
      <InfoRow label="Category" value={worker.category} />
    </View>
  );
};

export default WorkerInfoSection;

/* ------------ helpers ------------ */

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

/* ------------ styles ------------ */

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
});
