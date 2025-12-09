import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import AvailabilityToggleRow from "@/src/components/workerProfile/AvailabilityToggleRow";

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
