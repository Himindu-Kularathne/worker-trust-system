import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import LocationSelectorModal from "@/src/components/location/LocationSelectorModal";

interface Props {
  category: string;
  locationLabel?: string;
  onLocationChange?: (location: {
    province?: string;
    district?: string;
    city?: string;
  }) => void;
}

const WorkersHeaderSection: React.FC<Props> = ({
  category,
  locationLabel = "Select location",
  onLocationChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            {category.charAt(0).toUpperCase() + category.slice(1)}s
          </Text>
          <Text style={styles.subtitle}>
            Trusted workers available near you
          </Text>
        </View>

        {/* Location Button */}
        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="location-outline" size={16} color="#2563EB" />
          <Text style={styles.locationText}>{locationLabel}</Text>
        </TouchableOpacity>
      </View>

      {/* Location Modal */}
      <LocationSelectorModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onApply={(location) => {
          onLocationChange?.(location);
          setModalVisible(false);
        }}
      />
    </>
  );
};

export default WorkersHeaderSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "500",
    color: "#2563EB",
  },
});
