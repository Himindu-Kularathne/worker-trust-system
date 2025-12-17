import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import SettingsCard from "@/src/components/settings/SettingsCard";
import SettingsValueRow from "@/src/components/settings/SettingsValueRow";
import SettingsToggleRow from "@/src/components/settings/SettingsToggleRow";

import { useLanguage, Lang } from "@/src/context/languageContext";
import { useTheme } from "@/src/hooks/useThemeHook";

const LANGUAGE_LABELS: Record<Lang, string> = {
  en: "English",
  si: "සිංහල",
  ta: "தமிழ்",
};

const PreferencesSection: React.FC = () => {
  const [notificationsOn, setNotificationsOn] = useState(false);
  const { lang, setLang } = useLanguage();
  const { theme , setThemePreference} = useTheme();

  const handleLanguageChange = () => {
    Alert.alert("Select Language", "", [
      { text: "English", onPress: () => setLang("en") },
      { text: "සිංහල", onPress: () => setLang("si") },
      { text: "தமிழ்", onPress: () => setLang("ta") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
        Preferences
      </Text>

      <SettingsCard>
        <SettingsValueRow
          icon="language-outline"
          label="Language"
          value={LANGUAGE_LABELS[lang]}
          onPress={handleLanguageChange}
        />

        <SettingsValueRow
          icon="sunny-outline"
          label="Theme Mode"
          value={theme.mode === "dark" ? "Dark" : "Light"}
          onPress={() => {
            Alert.alert("Theme Mode", "", [
              { text: "Light", onPress: () => setThemePreference("light") },
              { text: "Dark", onPress: () => setThemePreference("dark") }, 
              { text: "System", onPress: () => setThemePreference("system") },
              { text: "Cancel", style: "cancel" },
            ]);
          }}
        />

        <SettingsToggleRow
          icon="notifications-outline"
          label="Notification Settings"
          value={notificationsOn}
          onChange={setNotificationsOn}
        />
      </SettingsCard>
    </View>
  );
};

export default PreferencesSection;

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
});
