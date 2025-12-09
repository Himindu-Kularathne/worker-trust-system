// src/views/WorkerSettingsView.tsx
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import SettingsHeaderSection from "@/sections/settings/SettingsHeaderSection";
import PreferencesSection from "@/sections/settings/PreferencesSection";
import AccountSection from "@/sections/settings/AccountSection";
import HelpSupportSection from "@/sections/settings/HelpSupportSection";
import LogoutSection from "@/sections/settings/LogoutSection";

const AVATAR_URI =
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg";

const WorkerSettingsView: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <SettingsHeaderSection
          name="John Smith"
          role="Electrician"
          avatarUrl={AVATAR_URI}
        />

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
