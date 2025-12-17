import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import LocationSelectorModal from "@/src/components/location/LocationSelectorModal";
import { useSearchFilters } from "@/src/hooks/useSearchFilterHook";
import { SRI_LANKA_PROVINCES } from "@/src/constants/sriLankaLocations";
import { t } from "@/src/i18n/t";

interface Props {
  category?: string;
}

const WorkersHeaderSection: React.FC<Props> = ({ category }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { state, setProvince, setDistrict, setCity } = useSearchFilters();

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
      <View style={styles.headerCardWorker}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>
            {category ? t(`categories.${category}.plural`) : "All Workers"}
          </Text>
          <Text style={styles.subtitle}>{t("home.subHeading")}</Text>
        </View>

        {/* Location Selector */}
        <TouchableOpacity
          style={styles.locationChip}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="location-outline" size={16} color="#1D4ED8" />
          <Text style={styles.locationText} numberOfLines={1}>
            {locationLabel}
          </Text>
          <Ionicons name="chevron-down" size={14} color="#1D4ED8" />
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
    borderRadius: 16,
    backgroundColor: "#ffffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  textBlock: {
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },
  locationChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  locationText: {
    marginHorizontal: 6,
    fontSize: 13,
    fontWeight: "500",
    color: "#1D4ED8",
    maxWidth: 160,
  },
});
