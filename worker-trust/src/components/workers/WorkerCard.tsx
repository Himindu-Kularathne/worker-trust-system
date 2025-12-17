import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import TrustScoreBadge from "./TrustScoreBadge";
import { Worker } from "@/src/types/worker";
import { useTheme } from "@/src/hooks/useThemeHook";

interface Props {
  worker: Worker;
}

const WorkerCard: React.FC<Props> = ({ worker }) => {
  const router = useRouter();
  const { theme } = useTheme();

  const handleRoute = () => {
    router.push(`/workers/${worker.id}`);
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          shadowOpacity: theme.mode === "dark" ? 0.35 : 0.06,
        },
      ]}
      activeOpacity={0.85}
      onPress={handleRoute}
    >
      <View style={styles.row}>
        <Text style={[styles.name, { color: theme.textPrimary }]}>
          {worker.full_name}
        </Text>
        <TrustScoreBadge score={worker.trust_score} />
      </View>

      <View style={styles.metaRow}>
        <Ionicons
          name="star"
          size={14}
          color={theme.primary}
          style={styles.starIcon}
        />

        <Text style={[styles.meta, { color: theme.textSecondary }]}>
          {worker.rating} · {worker.review_count} jobs
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default WorkerCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
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
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  starIcon: {
    marginRight: 4,
  },

  meta: {
    fontSize: 13,
  },
});
