import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import WorkerProfileHeaderSection from "@/src/sections/workers/WorkerProfileHeaderSection";
import WorkerInfoSection from "@/src/sections/workers/WorkerInfoSection";
import WorkerActionsSection from "@/src/sections/workers/WorkerActionsSection";

import {
  fetchWorkerById,
  fetchWorkerReviews,
} from "@/src/store/thunks/workersThunks";
import { clearSelectedWorker } from "@/src/store/slices/workerSlice";
import type { RootState, AppDispatch } from "@/src/store";
import WorkerReviewsSection from "../sections/workers/WorkerReviewsSection";

const WorkerDetailView: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedWorker, selectedWorkerReviews, loading } = useSelector(
    (state: RootState) => state.workers
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchWorkerById(id));
      dispatch(fetchWorkerReviews(id));
    }

    return () => {
      dispatch(clearSelectedWorker());
    };
  }, [id, dispatch]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading worker details...</Text>
      </SafeAreaView>
    );
  }

  if (!selectedWorker) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>No worker found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <WorkerProfileHeaderSection worker={selectedWorker} />
        <WorkerInfoSection worker={selectedWorker} />
        <WorkerActionsSection worker={selectedWorker} />
        <WorkerReviewsSection
          workerId={selectedWorker.id}
          reviews={selectedWorkerReviews || []}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkerDetailView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 8,
    color: "#6B7280",
  },
  errorText: {
    color: "#DC2626",
    fontSize: 16,
  },
});
