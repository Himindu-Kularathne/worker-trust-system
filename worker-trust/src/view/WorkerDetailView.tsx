import React, { useContext, useEffect, useMemo } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import WorkerProfileHeaderSection from "@/src/sections/workers/WorkerProfileHeaderSection";
import WorkerInfoSection from "@/src/sections/workers/WorkerInfoSection";
import WorkerActionsSection from "@/src/sections/workers/WorkerActionsSection";
import WorkerReviewsSection from "@/src/sections/workers/WorkerReviewsSection";

import {
  fetchWorkerById,
  fetchWorkerReviews,
} from "@/src/store/thunks/workersThunks";
import { clearSelectedWorker } from "@/src/store/slices/workerSlice";
import type { RootState, AppDispatch } from "@/src/store";
import { ThemeContext } from "@react-navigation/native";

const WorkerDetailView: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const theme = useContext(ThemeContext);

  const styles = useMemo(() => createStyles(theme), [theme]);

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
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading worker details...</Text>
      </SafeAreaView>
    );
  }

  if (!selectedWorker) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>No worker found.</Text>
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

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    center: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background,
    },
    loadingText: {
      marginTop: 8,
      color: theme.colors.textSecondary,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 16,
    },
  });
