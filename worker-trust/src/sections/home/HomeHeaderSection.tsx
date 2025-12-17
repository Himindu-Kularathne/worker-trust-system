import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "@/src/hooks/UserContextHook";
import { t } from "@/src/i18n/t";

const HomeHeaderSection: React.FC = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        {t("home.greeting", { name: user?.full_name || t("user") })}
      </Text>
      <Text style={styles.subtitle}>{t("home.subHeading")}</Text>
    </View>
  );
};

export default HomeHeaderSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B7280",
  },
});
