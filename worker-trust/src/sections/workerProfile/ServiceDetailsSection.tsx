import React from "react";
import { View, StyleSheet, Text } from "react-native";
import InfoCard from "@/src/components/workerProfile/InfoCard";
import InfoRow from "@/src/components/workerProfile/InfoRow";

export type ServiceDetailsSectionProps = {
  titleRole: string;
  bio: string;
  experience: string;
  priceRange: string;
  serviceAreas: string;
};

const ServiceDetailsSection: React.FC<ServiceDetailsSectionProps> = ({
  titleRole,
  bio,
  experience,
  priceRange,
  serviceAreas,
}) => {
  return (
    <View style={styles.wrapper}>
      <InfoCard title="Service Details" showEdit>
        <InfoRow icon="flash-outline" text={titleRole} />
        <View style={styles.bioRow}>
          <Text style={styles.bioLabel}>Bio: </Text>
          <Text style={styles.bioText}>{bio}</Text>
        </View>
        <InfoRow
          icon="time-outline"
          text={`Experience: ${experience}`}
        />
        <InfoRow
          icon="cash-outline"
          text={`Price Range: ${priceRange}`}
        />
        <InfoRow
          icon="location-outline"
          text={`Service Areas: ${serviceAreas}`}
        />
      </InfoCard>
    </View>
  );
};

export default ServiceDetailsSection;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  bioRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  bioLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  bioText: {
    flex: 1,
    fontSize: 13,
    color: "#4B5563",
  },
});
