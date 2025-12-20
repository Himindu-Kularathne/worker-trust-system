import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SRI_LANKA_PROVINCES } from "@/src/constants/sriLankaLocations";
import { Worker } from "@/src/types/worker";
import { ThemeContext } from "@/src/context/AppThemeContext";

interface Props {
  worker: Worker;
}

const WorkerInfoSection: React.FC<Props> = ({ worker }) => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("WorkerInfoSection must be used within AppThemeProvider");
  }

  const { theme } = themeContext;

  const provinceName = SRI_LANKA_PROVINCES.find(
    (p) => p.id === worker.province
  )?.name;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          borderWidth: theme.mode === "dark" ? 0 : 1,
        },
      ]}
    >
      <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
        Details
      </Text>

      <InfoRow
        label="Location"
        value={`${worker.city}, ${provinceName}`}
        theme={theme}
      />
      <InfoRow
        label="Experience"
        value={`${worker.review_count} reviews`}
        theme={theme}
      />
      <InfoRow
        label="Category"
        value={worker.category}
        theme={theme}
      />
    </View>
  );
};

export default WorkerInfoSection;

/* ------------ helpers ------------ */

const InfoRow = ({
  label,
  value,
  theme,
}: {
  label: string;
  value: string;
  theme: any;
}) => (
  <View style={styles.row}>
    <Text style={[styles.label, { color: theme.textSecondary }]}>
      {label}
    </Text>
    <Text style={[styles.value, { color: theme.textPrimary }]}>
      {value}
    </Text>
  </View>
);

/* ------------ base styles (theme-independent) ------------ */

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
  },
});
