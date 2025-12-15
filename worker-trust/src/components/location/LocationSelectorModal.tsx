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

interface OptionProps {
  label: string;
  selected?: boolean;
  level?: "province" | "district" | "city";
  onPress: () => void;
}

const Option: React.FC<OptionProps> = ({
  label,
  selected,
  level = "province",
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.optionBase,
        level === "province" && styles.provinceOption,
        level === "district" && styles.districtOption,
        level === "city" && styles.cityOption,
        selected && styles.optionSelected,
      ]}
    >
      <Text
        style={[
          styles.optionText,
          level === "province" && styles.provinceText,
          level === "district" && styles.districtText,
          level === "city" && styles.cityText,
          selected && styles.optionTextSelected,
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

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Title */}
          <Text style={styles.title}>{t("locations.selectLocation")}</Text>

          <ScrollView>
            {SRI_LANKA_PROVINCES.map((p) => {
              const isProvinceSelected = province === p.id;

              return (
                <View key={p.id} style={styles.block}>
                  {/* Province */}
                  <Option
                    label={t(`provinces.${p.id}`) ?? p.name}
                    selected={isProvinceSelected}
                    level="province"
                    onPress={() => {
                      setProvince(p.id);
                      setDistrict(undefined);
                      setCity(undefined);
                    }}
                  />

                  {/* Districts */}
                  {isProvinceSelected &&
                    p.districts.map((d) => {
                      const isDistrictSelected = district === d.id;

                      return (
                        <View key={d.id} style={styles.subBlock}>
                          <Option
                            label={t(`districts.${d.id}`) ?? d.name}
                            selected={isDistrictSelected}
                            level="district"
                            onPress={() => {
                              setDistrict(d.id);
                              setCity(undefined);
                            }}
                          />

                          {/* Cities */}
                          {isDistrictSelected &&
                            d.cities.map((c) => (
                              <View key={c.id} style={styles.subSubBlock}>
                                <Option
                                  label={c.name} // cities not translated yet
                                  selected={city === c.id}
                                  level="city"
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
              <Text style={styles.cancel}>{t("common.cancel")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => onApply({ province, district, city })}
            >
              <Text style={styles.applyText}>{t("common.apply")}</Text>
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
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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

  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    marginBottom: 4,
  },
  optionText: {
    fontSize: 14,
    color: "#111827",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cancel: {
    fontSize: 14,
    color: "#6B7280",
  },
  applyButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  applyText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  /* base */
  optionBase: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 6,
  },

  /* province */
  provinceOption: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  provinceText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  /* district */
  districtOption: {
    backgroundColor: "#EFF6FF",
    borderLeftWidth: 4,
    borderLeftColor: "#2563EB",
  },
  districtText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E40AF",
  },

  /* city */
  cityOption: {
    backgroundColor: "#F9FAFB",
    borderLeftWidth: 2,
    borderLeftColor: "#9CA3AF",
  },
  cityText: {
    fontSize: 13,
    color: "#374151",
  },

  /* selected */
  optionSelected: {
    backgroundColor: "#DBEAFE",
  },
  optionTextSelected: {
    color: "#1D4ED8",
    fontWeight: "700",
  },
});
