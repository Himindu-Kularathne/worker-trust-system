import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

import WorkersListSection from "@/src/sections/workers/WorkersListSection";
import WorkersHeaderSection from "../sections/workers/WorkerHeaderSection";

const WorkersListView: React.FC = () => {
  const { category } = useLocalSearchParams<{ category: string }>();

  useEffect(() => {
    console.log("Selected category:", category);
  }, [category]);

  return (
    <SafeAreaView style={styles.container}>
      <WorkersHeaderSection category={category ?? ""} />
      <WorkersListSection category={category ?? ""} />
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
