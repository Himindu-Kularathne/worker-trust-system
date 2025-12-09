import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "@/src/components/search/SearchBar";

const SearchHeaderSection: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Search Workers</Text>
      <View style={{ marginTop: 12 }}>
        <SearchBar />
      </View>
    </View>
  );
};

export default SearchHeaderSection;

const styles = StyleSheet.create({
  wrapper: {},
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
});
