import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkerProfileHeaderSection from "@/src/sections/workers/WorkerProfileHeaderSection";
import WorkerInfoSection from "@/src/sections/workers/WorkerInfoSection";
import WorkerActionsSection from "@/src/sections/workers/WorkerActionsSection";
import { MOCK_WORKERS } from "@/src/constants/mockWorkers";

const WorkerDetailView: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const worker = MOCK_WORKERS.find((w) => w.id === id);

  if (!worker) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <WorkerProfileHeaderSection worker={worker} />
        <WorkerInfoSection worker={worker} />
        <WorkerActionsSection />
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
});
