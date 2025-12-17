import React from "react";
import { View, StyleSheet } from "react-native";

import SettingsHeader, {
  SettingsHeaderProps,
} from "@/src/components/settings/SettingsHeader";
import { useTheme } from "@/src/hooks/useThemeHook";

const SettingsHeaderSection: React.FC<SettingsHeaderProps> = (props) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: theme.background },
      ]}
    >
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
