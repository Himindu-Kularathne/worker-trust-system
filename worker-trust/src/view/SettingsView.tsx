import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PreferencesSection from "@/src/sections/settings/PreferencesSection";
import AccountSection from "@/src/sections/settings/AccountSection";
import HelpSupportSection from "@/src/sections/settings/HelpSupport";
import LogoutSection from "@/src/sections/settings/LogoutSection";

const AVATAR_URI = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg";

const WorkerSettingsView: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <PreferencesSection />
        <AccountSection />
        <HelpSupportSection />
        <LogoutSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkerSettingsView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 16,
  },
});
