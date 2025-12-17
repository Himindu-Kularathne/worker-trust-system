import React, { use, useEffect } from "react";
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
import LoadingView from "@/src/view/ActivityIndicator";

const WorkersListSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const workers = useAppSelector((state) => state.workers.items);
  const loading = useAppSelector((state) => state.workers.loading);
  const filters = useSearchFilters();

  useEffect(() => {
    dispatch(fetchWorkers(filters.state));
  }, [filters, dispatch]);

  if (!workers || workers.length === 0 ) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>{loading ? "" : "No workers found"}</Text>
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
