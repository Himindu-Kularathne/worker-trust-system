import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import HomeHeaderSection from "@/src/sections/home/HomeHeaderSection";
import ServiceCategoriesSection from "@/src/sections/home/ServiceCategoriesSection";

const HomeView: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeaderSection />
        <ServiceCategoriesSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
});
