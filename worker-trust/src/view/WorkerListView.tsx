import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkersHeaderSection from "@/src/sections/workers/WorkerHeaderSection";
import WorkersListSection from "@/src/sections/workers/WorkersListSection";
import { useSearchFilters } from "@/src/hooks/useSearchFilterHook";

const WorkersListView: React.FC = () => {
  const { state } = useSearchFilters();
  const { category } = state;

  return (
    <SafeAreaView style={styles.container}>
      <WorkersHeaderSection category={category ?? ""} />
      <WorkersListSection />
    </SafeAreaView>
  );
};

export default WorkersListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
});
