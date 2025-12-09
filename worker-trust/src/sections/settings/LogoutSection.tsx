import React from "react";
import { View, StyleSheet } from "react-native";
import LogoutButton from "@/src/components/settings/LogoutButton";

const LogoutSection: React.FC = () => {
  return (
    <View style={styles.wrapper}>
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
