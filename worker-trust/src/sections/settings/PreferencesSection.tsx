import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SettingsCard from "@/src/components/settings/SettingsCard";
import SettingsValueRow from "@/src/components/settings/SettingsValueRow";
import SettingsToggleRow from "@/src/components/settings/SettingsToggleRow";

const PreferencesSection: React.FC = () => {
  const [notificationsOn, setNotificationsOn] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Preferences</Text>
      <SettingsCard>
        <SettingsValueRow
          icon="language-outline"
          label="Language"
          value="English"
        />
        <SettingsValueRow
          icon="sunny-outline"
          label="Theme Mode"
          value="System Default"
        />
        <SettingsToggleRow
          icon="notifications-outline"
          label="Notification Settings"
          value={notificationsOn}
          onChange={setNotificationsOn}
        />
      </SettingsCard>
    </View>
  );
};

export default PreferencesSection;

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
