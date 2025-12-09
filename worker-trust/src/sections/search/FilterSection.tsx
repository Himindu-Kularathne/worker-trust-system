import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import FilterChip from "@/src/components/search/FilterChip";

const FILTERS = [
  "All",
  "Electrician",
  "Carpenter",
  "Mechanic",
  "Painter",
  "Plumber",
];

const FilterSection: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        {FILTERS.map((item, index) => (
          <FilterChip
            key={item}
            label={item}
            isActive={index === 1} // Electrician active for now
          />
        ))}
      </ScrollView>

      <Text style={styles.filtersText}>Filters</Text>
    </View>
  );
};

export default FilterSection;

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  chipsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  filtersText: {
    fontSize: 13,
    color: "#2563EB",
    fontWeight: "600",
  },
});
