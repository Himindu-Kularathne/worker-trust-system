import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { t } from "@/src/i18n/t";

import { useSearchFilters } from "@/src/hooks/useSearchFilterHook";

interface Props {
  title: string;
  icon: string;
  categoryTitle: string;
}

const ServiceCategoryTile: React.FC<Props> = ({
  title,
  icon,
  categoryTitle,
}) => {
  const router = useRouter();
  const { setCategory, resetLocation } = useSearchFilters();

  const handlePress = () => {
    // Set selected category globally
    setCategory(categoryTitle);

    // Optional but recommended: reset previous location filters
    resetLocation();

    // Navigate to workers list
    router.push("/workers");
  };

  return (
    <TouchableOpacity style={styles.tile} onPress={handlePress}>
      <Ionicons
        name={icon as keyof typeof Ionicons.glyphMap}
        size={28}
        color="#2563EB"
      />
      <Text style={styles.text}>{t(`categories.${title}`)}</Text>
    </TouchableOpacity>
  );
};

export default ServiceCategoryTile;

const styles = StyleSheet.create({
  tile: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 20,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
});
