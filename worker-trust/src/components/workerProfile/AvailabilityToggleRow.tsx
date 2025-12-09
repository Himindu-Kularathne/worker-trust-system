import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

export type AvailabilityToggleRowProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

const AvailabilityToggleRow: React.FC<AvailabilityToggleRowProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>
        {label}:{" "}
        <Text style={value ? styles.onText : styles.offText}>
          {value ? "On" : "Off"}
        </Text>
      </Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
};

export default AvailabilityToggleRow;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  text: {
    fontSize: 14,
    color: "#111827",
  },
  onText: {
    color: "#16A34A",
    fontWeight: "600",
  },
  offText: {
    color: "#B91C1C",
    fontWeight: "600",
  },
});
