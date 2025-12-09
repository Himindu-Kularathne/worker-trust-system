import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export type FilterChipProps = {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
};

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  isActive = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.chip,
        isActive ? styles.chipActive : styles.chipInactive,
      ]}
    >
      <Text
        style={[
          styles.text,
          isActive ? styles.textActive : styles.textInactive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterChip;

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: "#E0F2FE",
    borderColor: "#0EA5E9",
  },
  chipInactive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
  },
  text: {
    fontSize: 12,
  },
  textActive: {
    color: "#0EA5E9",
    fontWeight: "600",
  },
  textInactive: {
    color: "#4B5563",
  },
});
