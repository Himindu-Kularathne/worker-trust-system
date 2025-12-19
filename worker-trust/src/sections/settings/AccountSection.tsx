import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import SettingsCard from "@/src/components/settings/SettingsCard";
import SettingsValueRow from "@/src/components/settings/SettingsValueRow";
import SettingsToggleRow from "@/src/components/settings/SettingsToggleRow";
import { useTheme } from "@/src/hooks/useThemeHook";
import { SearchFilterContext } from "@/src/context/SearchFilterContext";

const AccountSection: React.FC = () => {
  const { theme } = useTheme();

  const searchFilterContext = useContext(SearchFilterContext);
  if (!searchFilterContext) {
    throw new Error(
      "AccountSection must be used within SearchFilterProvider"
    );
  }

  const { locationOn, setLocationOn } = searchFilterContext;

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
        Account
      </Text>

      <SettingsCard>
        <SettingsValueRow
          icon="lock-closed-outline"
          label="Change Password"
          value="••••••••"
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
  },
});
