import React from "react";
import { View, StyleSheet, Text } from "react-native";
import InfoCard from "@/src/components/workerProfile/InfoCard";
import VerificationChip from "@/src/components/workerProfile/VerificationChip";
import PrimaryButton from "@/src/components/workerProfile/PrimaryButton";

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
