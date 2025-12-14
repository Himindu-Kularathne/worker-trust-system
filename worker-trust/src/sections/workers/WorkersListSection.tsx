import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import WorkerCard from "@/src/components/workers/WorkerCard";
import { MOCK_WORKERS } from "@/src/constants/mockWorkers";
import { useSearchFilters } from "@/src/hooks/useSearchFilterHook";

const WorkersListSection: React.FC = () => {
  const { state } = useSearchFilters();
  const { category, province, district, city } = state;

  const filteredWorkers = MOCK_WORKERS.filter((w) => {
    if (category && w.category !== category) return false;
    if (province && w.province !== province) return false;
    if (district && w.district !== district) return false;
    if (city && w.city !== city) return false;
    return true;
  });

  if (filteredWorkers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No workers found</Text>
        <Text style={styles.emptySubtitle}>
          Try changing the location or category
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={filteredWorkers}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <WorkerCard worker={item} />}
    />
  );
};

export default WorkersListSection;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});
