import React from "react";
import { View, StyleSheet } from "react-native";

import SectionTitle from "@/src/components/home/SectionTitle";
import ServiceCategoryTile from "@/src/components/home/ServiceCategoryTile";
import { SERVICE_CATEGORIES } from "@/src/constants/ServiceCategories";

const ServiceCategoriesSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <SectionTitle title="Service Categories" />

      <View style={styles.grid}>
        {SERVICE_CATEGORIES.map((category) => (
          <ServiceCategoryTile
            key={category.id}
            title={category.title}
            icon={category.icon}
          />
        ))}
      </View>
    </View>
  );
};

export default ServiceCategoriesSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
