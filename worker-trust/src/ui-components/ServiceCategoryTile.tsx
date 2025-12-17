import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { t } from "@/src/i18n/t";

import { useSearchFilters } from "@/src/hooks/useSearchFilterHook";
import { useTheme } from "@/src/hooks/useThemeHook";

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
  const { theme } = useTheme();

  const handlePress = () => {
    setCategory(categoryTitle);
    resetLocation();
    router.push("/workers");
  };

  return (
    <TouchableOpacity
      style={[
        styles.tile,
        {
          backgroundColor: theme.card,
          shadowColor: theme.mode === "dark" ? "#000" : "#000",
        },
      ]}
      activeOpacity={0.85}
      onPress={handlePress}
    >
      <Ionicons
        name={icon as keyof typeof Ionicons.glyphMap}
        size={28}
        color={theme.primary}
      />

      <Text style={[styles.text, { color: theme.textPrimary }]}>
        {t(`categories.${title}.singular`)}
      </Text>
    </TouchableOpacity>
  );
};

export default ServiceCategoryTile;

const styles = StyleSheet.create({
  tile: {
    width: "48%",
    borderRadius: 14,
    paddingVertical: 22,
    marginBottom: 16,
    alignItems: "center",

    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },

  text: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
  },
});
