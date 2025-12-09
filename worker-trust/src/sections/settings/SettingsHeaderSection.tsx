// src/sections/settings/SettingsHeaderSection.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import SettingsHeader, {
  SettingsHeaderProps,
} from "@/src/components/settings/SettingsHeader";

const SettingsHeaderSection: React.FC<SettingsHeaderProps> = (props) => {
  return (
    <View style={styles.wrapper}>
      <SettingsHeader {...props} />
    </View>
  );
};

export default SettingsHeaderSection;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 4,
  },
});
