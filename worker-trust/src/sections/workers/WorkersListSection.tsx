import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import WorkerCard from "@/src/components/workers/WorkerCard";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { fetchWorkers } from "@/src/store/thunks/workersThunks";
import { useSearchFilters } from "@/src/hooks/useSearchFilterHook";

const WorkersListSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const workers = useAppSelector((state) => state.workers.items);
  const loading = useAppSelector((state) => state.workers.loading);
  const error = useAppSelector((state) => state.workers.error);
  const filters = useSearchFilters();

  useEffect(() => {
    dispatch(fetchWorkers(filters.state));
    console.log("Fetching workers with filters:", filters.state);
  }, [filters, dispatch]);

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Something went wrong</Text>
        <Text style={styles.emptySubtitle}>{error}</Text>
      </View>
    );
  }

  if (!workers || workers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No workers found</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={workers}
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
