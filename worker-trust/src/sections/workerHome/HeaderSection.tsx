import React from "react";
import { View, StyleSheet } from "react-native";
import WorkerHeader, {
  WorkerHeaderProps,
} from "@/src/components/workerHome/WorkerHeader";

const HeaderSection: React.FC<WorkerHeaderProps> = (props) => {
  return (
    <View style={styles.wrapper}>
      <WorkerHeader {...props} />
    </View>
  );
};

export default HeaderSection;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
});
