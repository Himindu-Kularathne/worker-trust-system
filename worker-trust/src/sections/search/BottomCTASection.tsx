import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PrimaryCTAButton from "@/src/components/search/PrimaryCTAButton";

const BottomCTASection: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.viewToggle}>
        <Text style={styles.viewActive}>List View</Text>
        <Text style={styles.viewDivider}> / </Text>
        <Text style={styles.viewInactive}>Map View</Text>
      </Text>

      <View style={{ marginTop: 12 }}>
        <PrimaryCTAButton
          label="Request Rating from Customer"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default BottomCTASection;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    gap: 4,
  },
  viewToggle: {
    fontSize: 13,
    color: "#6B7280",
  },
  viewActive: {
    fontWeight: "600",
    color: "#111827",
  },
  viewInactive: {
    color: "#9CA3AF",
  },
  viewDivider: {
    color: "#9CA3AF",
  },
});
