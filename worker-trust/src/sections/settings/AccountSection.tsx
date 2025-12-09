import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SettingsCard from "@/src/components/settings/SettingsCard";
import SettingsValueRow from "@/src/components/settings/SettingsValueRow";
import SettingsToggleRow from "@/src/components/settings/SettingsToggleRow";

const AccountSection: React.FC = () => {
  const [locationOn, setLocationOn] = useState(true);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Account</Text>
      <SettingsCard>
        <SettingsValueRow
          icon="lock-closed-outline"
          label="Change Password"
          value="English"
        />
        <SettingsValueRow
          icon="alarm-outline"
          label="System Default"
          value="System Default"
        />
        <SettingsToggleRow
          icon="location-outline"
          label="Location Sharing"
          value={locationOn}
          onChange={setLocationOn}
        />
      </SettingsCard>
    </View>
  );
};

export default AccountSection;

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
