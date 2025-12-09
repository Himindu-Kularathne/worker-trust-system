import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import SearchHeaderSection from "@/src/sections/search/SearchHeaderSection";
import FilterSection from "@/src/sections/search/FilterSection";
import ServicesSection from "@/src/sections/search/ServicesSection";
import BottomCTASection from "@/src/sections/search/BottomCTASection";

const SearchWorkersView: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <SearchHeaderSection />
        <FilterSection />
        <ServicesSection />
        <View style={{ height: 12 }} />
        <BottomCTASection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchWorkersView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E5E7EB",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 16,
  },
});
