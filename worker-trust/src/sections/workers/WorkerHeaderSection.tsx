import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import LocationSelectorModal from "@/src/components/location/LocationSelectorModal";
import { useSearchFilters } from "@/src/hooks/useSearchFilterHook";
import { SRI_LANKA_PROVINCES } from "@/src/constants/sriLankaLocations";
import { t } from "@/src/i18n/t";
import { useTheme } from "@/src/hooks/useThemeHook";

interface Props {
  category?: string;
}

const WorkersHeaderSection: React.FC<Props> = ({ category }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { state, setProvince, setDistrict, setCity } = useSearchFilters();
  const { theme } = useTheme();

  /* ---------------- derive readable location label ---------------- */

  const locationLabel = useMemo(() => {
    if (state.city) {
      for (const p of SRI_LANKA_PROVINCES) {
        for (const d of p.districts) {
          const c = d.cities.find((c) => c.id === state.city);
          if (c) return c.name;
        }
      }
    }

    if (state.district) {
      for (const p of SRI_LANKA_PROVINCES) {
        const d = p.districts.find((d) => d.id === state.district);
        if (d) return d.name;
      }
    }

    if (state.province) {
      const p = SRI_LANKA_PROVINCES.find((p) => p.id === state.province);
      return p?.name;
    }

    return t("locations.anywhere");
  }, [state]);

  return (
    <>
      <View
        style={[
          styles.headerCardWorker,
          {
            backgroundColor: theme.card,
            shadowOpacity: theme.mode === "dark" ? 0.35 : 0.08,
          },
        ]}
      >
        <View style={styles.textBlock}>
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            {category
              ? t(`categories.${category}.plural`)
              : t("workers.all")}
          </Text>

          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {t("home.subHeading")}
          </Text>
        </View>

        {/* Location Selector */}
        <TouchableOpacity
          style={[
            styles.locationChip,
            {
              backgroundColor:
                theme.mode === "dark"
                  ? theme.surface
                  : `${theme.primary}15`,
            },
          ]}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons
            name="location-outline"
            size={16}
            color={theme.primary}
          />

          <Text
            style={[styles.locationText, { color: theme.primary }]}
            numberOfLines={1}
          >
            {locationLabel}
          </Text>

          <Ionicons
            name="chevron-down"
            size={14}
            color={theme.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <LocationSelectorModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onApply={({ province, district, city }) => {
          setProvince(province);
          setDistrict(district);
          setCity(city);
          setModalVisible(false);
        }}
      />
    </>
  );
};

export default WorkersHeaderSection;

const styles = StyleSheet.create({
  headerCardWorker: {
    margin: 16,
    padding: 16,
    borderRadius: 18,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },

  textBlock: {
    marginBottom: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
  },

  locationChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  locationText: {
    marginHorizontal: 6,
    fontSize: 13,
    fontWeight: "500",
    maxWidth: 160,
  },
});
