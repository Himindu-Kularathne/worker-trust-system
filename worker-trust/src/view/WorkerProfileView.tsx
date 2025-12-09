import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import ProfileHeaderSection from "@/sections/profile/ProfileHeaderSection";
import PersonalInfoSection from "@/sections/profile/PersonalInfoSection";
import ServiceDetailsSection from "@/sections/profile/ServiceDetailsSection";
import WorkPhotosSection from "@/sections/profile/WorkPhotosSection";
import VerificationStatusSection from "@/sections/profile/VerificationStatusSection";
import AvailabilitySection from "@/sections/profile/AvailabilitySection";
import ProfileActionsSection from "@/sections/profile/ProfileActionsSection";

const AVATAR_URI =
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg";

const WORK_PHOTOS = [
  "https://images.pexels.com/photos/989798/pexels-photo-989798.jpeg",
  "https://images.pexels.com/photos/1321712/pexels-photo-1321712.jpeg",
  "https://images.pexels.com/photos/1451474/pexels-photo-1451474.jpeg",
];

const WorkerProfileView: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeaderSection
          name="John Smith"
          role="Electrician"
          statusLabel="Available"
          avatarUrl={AVATAR_URI}
        />

        <PersonalInfoSection
          name="John Smith"
          phone="+1 (555) 123-4567"
          email="john.smith@email.com"
          languages="English, Spanish"
        />

        <ServiceDetailsSection
          titleRole="Electrician"
          bio="Experienced licensed electrician specializing in residential and commercial installations and repairs."
          experience="10 years"
          priceRange="$50 - $150 / hr"
          serviceAreas="Downtown, Suburbs, Northside"
        />

        <WorkPhotosSection photos={WORK_PHOTOS} />

        <VerificationStatusSection />

        <AvailabilitySection />

        <ProfileActionsSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkerProfileView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
  },
});
