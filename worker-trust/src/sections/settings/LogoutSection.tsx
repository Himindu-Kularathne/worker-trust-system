import React from "react";
import { View, StyleSheet } from "react-native";

import LogoutButton from "@/src/components/settings/LogoutButton";
import { useTheme } from "@/src/hooks/useThemeHook";

const LogoutSection: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: theme.background },
      ]}
    >
      <LogoutButton onPress={() => {}} />
    </View>
  );
};

export default LogoutSection;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 12,
  },
});
