// src/sections/profile/VerificationStatusSection.tsx
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import InfoCard from "@/components/profile/InfoCard";
import VerificationChip from "@/components/profile/VerificationChip";
import PrimaryButton from "@/components/profile/PrimaryButton";

const VerificationStatusSection: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <InfoCard title="Verification Status">
        <Text style={styles.statusText}>
          Status: <Text style={styles.statusValue}>Verified Worker</Text>
        </Text>

        <View style={styles.chipsRow}>
          <VerificationChip label="NIC" />
          <VerificationChip label="Business Registration" />
        </View>

        <PrimaryButton
          label="Upload Document"
          variant="outline"
          onPress={() => {}}
        />
      </InfoCard>
    </View>
  );
};

export default VerificationStatusSection;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  statusText: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 8,
  },
  statusValue: {
    fontWeight: "600",
    color: "#16A34A",
  },
  chipsRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
});
