// src/sections/settings/HelpSupportSection.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SettingsCard from "@/src/components/settings/SettingsCard";
import SettingsNavigationRow from "@/src/components/settings/SettingsNavigationRow";

const HelpSupportSection: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Help & Support</Text>
      <SettingsCard>
        <SettingsNavigationRow
          icon="document-text-outline"
          label="Manage Verification Documents"
          onPress={() => {}}
        />
        <SettingsNavigationRow
          icon="help-circle-outline"
          label="Help Center / FAQ"
          onPress={() => {}}
        />
        <SettingsNavigationRow
          icon="alert-circle-outline"
          label="Report Problem"
          onPress={() => {}}
        />
        <SettingsNavigationRow
          icon="information-circle-outline"
          label="Terms & Privacy Policy"
          onPress={() => {}}
        />
      </SettingsCard>
    </View>
  );
};

export default HelpSupportSection;

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
});
