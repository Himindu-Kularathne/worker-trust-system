// src/sections/profile/AvailabilitySection.tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import AvailabilityToggleRow from "@/components/profile/AvailabilityToggleRow";

const AvailabilitySection: React.FC = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <View style={styles.wrapper}>
      <AvailabilityToggleRow
        label="Availability"
        value={isAvailable}
        onChange={setIsAvailable}
      />
    </View>
  );
};

export default AvailabilitySection;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
});
