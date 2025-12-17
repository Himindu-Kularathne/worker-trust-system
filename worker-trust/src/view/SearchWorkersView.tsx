import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchHeaderSection from "@/src/sections/search/SearchHeaderSection";
import BottomCTASection from "@/src/sections/search/BottomCTASection";
import ServiceCategoriesSection from "../ui-components/ServiceCategoriesSection";

const SearchWorkersView: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <SearchHeaderSection />
        <ServiceCategoriesSection />
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
