import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import HeaderSection from "@/src/sections/workerHome/HeaderSection";
import TrustScoreSection from "@/src/sections/workerHome/TrustScoreSection";
import StatsSection from "@/src/sections/workerHome/StatsSection";
import QuickActionsSection from "@/src/sections/workerHome/QuickActionsSection";
import RemindersSection from "@/src/sections/workerHome/ReminderSection";

const AVATAR_URI =
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg";

const WorkerHomeView: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <HeaderSection
          name="John Smith"
          role="Electrician"
          avatarUrl={AVATAR_URI}
        />
        <TrustScoreSection score={4.8} total={5} reviews={45} />
        <StatsSection />
        <QuickActionsSection />
        <RemindersSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkerHomeView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
});
