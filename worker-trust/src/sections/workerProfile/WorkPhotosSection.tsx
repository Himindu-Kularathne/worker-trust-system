import React from "react";
import { View, StyleSheet } from "react-native";
import InfoCard from "@/src/components/workerProfile/InfoCard";
import WorkPhotosRow, {
  WorkPhotosRowProps,
} from "@/src/components/workerProfile/WorkPhotosRow";

const WorkPhotosSection: React.FC<WorkPhotosRowProps> = (props) => {
  return (
    <View style={styles.wrapper}>
      <InfoCard title="My Work Photos">
        <WorkPhotosRow {...props} />
      </InfoCard>
    </View>
  );
};

export default WorkPhotosSection;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
});
