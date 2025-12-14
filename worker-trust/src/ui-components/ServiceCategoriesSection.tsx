import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";

import SectionTitle from "@/src/components/home/SectionTitle";
import ServiceCategoryTile from "@/src/ui-components/ServiceCategoryTile";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { fetchCategories } from "@/src/store/thunks/categoriesThunk";

const ServiceCategoriesSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <SectionTitle title="Service Categories" />

      {loading && <ActivityIndicator />}

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.grid}>
        {items.map((category) => (
          <ServiceCategoryTile
            key={category.id}
            title={category.title}
            icon={category.icon}
            categoryTitle={category.title}
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
  error: {
    color: "red",
    marginVertical: 8,
  },
});
