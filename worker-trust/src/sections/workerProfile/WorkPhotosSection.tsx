// src/sections/profile/WorkPhotosSection.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import InfoCard from "@/components/profile/InfoCard";
import WorkPhotosRow, {
  WorkPhotosRowProps,
} from "@/components/profile/WorkPhotosRow";

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
