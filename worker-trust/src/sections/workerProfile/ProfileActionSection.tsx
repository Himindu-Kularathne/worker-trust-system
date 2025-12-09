import React from "react";
import { View, StyleSheet } from "react-native";
import PrimaryButton from "@/src/components/workerProfile/PrimaryButton";
import DangerButton from "@/src/components/workerProfile/DangerButton";

const ProfileActionsSection: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <PrimaryButton label="Save Changes" onPress={() => {}} />
      <DangerButton label="Delete Account" onPress={() => {}} />
    </View>
  );
};

export default ProfileActionsSection;

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
});
