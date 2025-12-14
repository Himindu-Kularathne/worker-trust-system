import React from "react";
import { FlatList, StyleSheet } from "react-native";

import WorkerCard from "@/src/components/workers/WorkerCard";
import { MOCK_WORKERS } from "@/src/constants/mockWorkers";

interface Props {
  category: string;
}

const WorkersListSection: React.FC<Props> = ({ category }) => {
  const workers = MOCK_WORKERS.filter((w) => w.category === category);

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
});
