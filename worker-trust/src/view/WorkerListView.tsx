import React from "react";
import { StyleSheet, View , SafeAreaView} from "react-native";
import WorkersHeaderSection from "@/src/sections/workers/WorkerHeaderSection";
import WorkersListSection from "@/src/sections/workers/WorkersListSection";
import { useSearchFilters } from "@/src/hooks/useSearchFilterHook";


const WorkersListView: React.FC = () => {
  const { state } = useSearchFilters();
  const { category } = state;

  return (
    <SafeAreaView style={styles.containerW}>
      <WorkersHeaderSection category={category ?? ""} />
      <WorkersListSection />
    </SafeAreaView>
  );
};

export default WorkersListView;

const styles = StyleSheet.create({
  containerW: {
    flex: 1,
  },
});
