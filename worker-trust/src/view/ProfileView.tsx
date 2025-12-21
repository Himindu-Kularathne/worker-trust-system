import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { View, Text } from "@/components/Themed";
import { useAuth } from "@/src/hooks/UserContextHook";
import { useTheme } from "@/src/hooks/useThemeHook";
import { getWorkerProfile } from "@/src/lib/worker";

import TrustScoreCard from "@/src/components/workerHome/TrustScoreCard";
import InfoCard from "@/src/components/workerProfile/InfoCard";
import AvailabilityToggleRow from "@/src/components/workerProfile/AvailabilityToggleRow";
import ProfileHeader from "@/src/components/workerProfile/profileHeader";
import InfoRow from "../components/workerProfile/InfoRow";
import LogoutButton from "../components/settings/LogoutButton";

export default function ProfileView() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const [reviewCount, setReviewCount] = useState<number>(0);

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  // useEffect(() => {
  //   if (!user) return;

  //   let cancelled = false;

  //   async function loadProfile() {
  //     try {
  //       setLoading(true);
  //       const response = await getWorkerProfile(user.id);
  //       if (cancelled) return;
  //       setReviewCount(response?.review_count ?? 0);
  //     } catch (error) {
  //       console.error("Error loading worker profile:", error);
  //     } finally {
  //       if (!cancelled) setLoading(false);
  //     }
  //   }

  //   loadProfile();

  //   return () => {
  //     cancelled = true;
  //   };
  // }, [user?.id]);

  if (!user) return null;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.welcome, { color: theme.textPrimary }]}>
            Welcome, {user.full_name}
          </Text>

          <ProfileHeader
            name={user.full_name}
            role={user.category}
            statusLabel=""
            avatarUrl={user.image_url ?? ""}
          />

          <TrustScoreCard
            score={user.trust_score}
            total={5}
            reviews={reviewCount}
          />

          <InfoCard title="Info">
            <InfoRow icon="call-outline" text={user.phone} />
            <InfoRow icon="mail-outline" text={user.email} />
            <InfoRow
              icon="location-outline"
              text={`${user.city}, ${user.district}, ${user.province}`}
            />
          </InfoCard>

          <AvailabilityToggleRow
            label="Availability"
            value={false}
            onChange={() => {}}
          />

          <LogoutButton onPress={handleLogout} />

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 16,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },

  welcome: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  scrollContent: {
    paddingBottom: 24,
  },
});
