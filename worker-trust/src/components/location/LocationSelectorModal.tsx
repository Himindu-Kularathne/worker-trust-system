import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SRI_LANKA_PROVINCES } from "@/src/constants/sriLankaLocations";
import { t } from "@/src/i18n/t";
import { useTheme } from "@/src/hooks/useThemeHook";

interface OptionProps {
  label: string;
  selected?: boolean;
  level?: "province" | "district" | "city";
  onPress: () => void;
}

const Option: React.FC<OptionProps & { theme: any }> = ({
  label,
  selected,
  level = "province",
  onPress,
  theme,
}) => {
  const getBackground = () => {
    if (selected) return `${theme.primary}20`;

    switch (level) {
      case "district":
        return theme.mode === "dark"
          ? theme.surface
          : `${theme.primary}15`;
      case "city":
        return theme.surface;
      default:
        return theme.card;
    }
  };

  const getBorderColor = () => {
    if (selected) return theme.primary;
    return theme.border;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.optionBase,
        {
          backgroundColor: getBackground(),
          borderColor: getBorderColor(),
          borderLeftColor:
            level !== "province" ? theme.primary : undefined,
          borderWidth: level === "province" ? 1 : 0,
          borderLeftWidth: level === "district" ? 4 : level === "city" ? 2 : 0,
        },
      ]}
    >
      <Text
        style={[
          styles.optionText,
          {
            color: selected
              ? theme.primary
              : level === "province"
              ? theme.textPrimary
              : theme.textSecondary,
            fontWeight: selected ? "700" : level === "province" ? "600" : "500",
            fontSize:
              level === "province" ? 15 : level === "district" ? 14 : 13,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface Props {
  visible: boolean;
  onClose: () => void;
  onApply: (location: {
    province?: string;
    district?: string;
    city?: string;
  }) => void;
}
const LocationSelectorModal: React.FC<Props> = ({
  visible,
  onClose,
  onApply,
}) => {
  const [province, setProvince] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const [city, setCity] = useState<string>();
  const { theme } = useTheme();

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={[styles.overlay, { backgroundColor: "rgba(0,0,0,0.45)" }]}>
        <View
          style={[
            styles.modal,
            {
              backgroundColor: theme.surface,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          ]}
        >
          {/* Title */}
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            {t("locations.selectLocation")}
          </Text>

          <ScrollView>
            {SRI_LANKA_PROVINCES.map((p) => {
              const isProvinceSelected = province === p.id;

              return (
                <View key={p.id} style={styles.block}>
                  <Option
                    label={t(`provinces.${p.id}`) ?? p.name}
                    selected={isProvinceSelected}
                    level="province"
                    theme={theme}
                    onPress={() => {
                      setProvince(p.id);
                      setDistrict(undefined);
                      setCity(undefined);
                    }}
                  />

                  {isProvinceSelected &&
                    p.districts.map((d) => {
                      const isDistrictSelected = district === d.id;

                      return (
                        <View key={d.id} style={styles.subBlock}>
                          <Option
                            label={t(`districts.${d.id}`) ?? d.name}
                            selected={isDistrictSelected}
                            level="district"
                            theme={theme}
                            onPress={() => {
                              setDistrict(d.id);
                              setCity(undefined);
                            }}
                          />

                          {isDistrictSelected &&
                            d.cities.map((c) => (
                              <View key={c.id} style={styles.subSubBlock}>
                                <Option
                                  label={c.name}
                                  selected={city === c.id}
                                  level="city"
                                  theme={theme}
                                  onPress={() => setCity(c.id)}
                                />
                              </View>
                            ))}
                        </View>
                      );
                    })}
                </View>
              );
            })}
          </ScrollView>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ color: theme.textSecondary }}>
                {t("common.cancel")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.applyButton,
                { backgroundColor: theme.primary },
              ]}
              onPress={() => onApply({ province, district, city })}
            >
              <Text style={[styles.applyText, { color: theme.primaryText }]}>
                {t("common.apply")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};


export default LocationSelectorModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },

  modal: {
    padding: 20,
    maxHeight: "85%",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  block: {
    marginBottom: 8,
  },

  subBlock: {
    marginLeft: 16,
    marginTop: 4,
  },

  subSubBlock: {
    marginLeft: 16,
    marginTop: 4,
  },

  optionBase: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 6,
  },

  optionText: {
    lineHeight: 20,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  applyButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  applyText: {
    fontWeight: "600",
  },
});
