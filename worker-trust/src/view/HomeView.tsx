import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeHeaderSection from "@/src/sections/home/HomeHeaderSection";
import ServiceCategoriesSection from "@/src/ui-components/ServiceCategoriesSection";

import { useTheme } from "@/src/hooks/useThemeHook";

const HomeView: React.FC = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
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
  },
});
