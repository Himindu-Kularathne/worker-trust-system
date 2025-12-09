// src/sections/profile/ProfileActionsSection.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import PrimaryButton from "@/components/profile/PrimaryButton";
import DangerButton from "@/components/profile/DangerButton";

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
