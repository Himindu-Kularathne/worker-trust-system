import React, { useEffect } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/src/hooks/UserContextHook";
import LoginView from "@/src/view/LoginView";
import { View, Text } from "@/components/Themed";
import { getWorkerProfile } from "@/src/lib/worker";

import TrustScoreCard from "@/src/components/workerHome/TrustScoreCard";
import LogoutButton from "@/src/components/settings/LogoutButton";
import InfoCard from "@/src/components/workerProfile/InfoCard";
import WorkPhotosRow from "@/src/components/workerProfile/WorkPhotosRow";
import AvailabilityToggleRow from "@/src/components/workerProfile/AvailabilityToggleRow";
import ProfileHeader from "@/src/components/workerProfile/profileHeader";
import { useTheme } from "@/src/hooks/useThemeHook";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const [trustScore, setTrustScore] = React.useState<number>(0);
  const [reviewCount, setReviewCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);

  const handleLogout = async () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  useEffect(() => {
    if (!user) return;

    const workerId = user.id;

    async function loadProfile() {
      try {
        const response = await getWorkerProfile(workerId);
        setTrustScore(response.trust_score);
        setReviewCount(response.review_count);
      } catch (error) {
        console.error("Error loading worker profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  if (!user) {
    return <LoginView />;
  }

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.background },
        ]}
      >
        <Text style={{ color: theme.textSecondary }}>
          Loading profile...
        </Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView
      style={[
        styles.safe,
        { backgroundColor: theme.background },
      ]}
    >
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome */}
          <Text
            style={[
              styles.welcome,
              { color: theme.textPrimary },
            ]}
          >
            Welcome, {user.full_name}
          </Text>

          <ProfileHeader
            name={user.full_name}
            role={user.category}
            statusLabel=""
            avatarUrl={user.image_url ?? ""}
          />

          <WorkPhotosRow photos={[]} />

          <TrustScoreCard
            score={trustScore}
            total={5}
            reviews={reviewCount}
          />

          <InfoCard title="" children={undefined} />

          <AvailabilityToggleRow
            label=""
            value={false}
            onChange={() => {}}
          />

          <View style={{ height: 40 }} />
        </ScrollView>

        {/* Bottom pinned logout */}
        <LogoutButton onPress={handleLogout} />
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

  welcome: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  scrollContent: {
    paddingBottom: 24,
  },
});
