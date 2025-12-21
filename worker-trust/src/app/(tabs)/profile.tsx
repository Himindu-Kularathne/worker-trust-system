import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/src/hooks/UserContextHook";
import LoginView from "@/src/view/LoginView";
import { View, Text } from "@/components/Themed";
import { getWorkerProfile } from "@/src/lib/worker";
import { useTheme } from "@/src/hooks/useThemeHook";

import TrustScoreCard from "@/src/components/workerHome/TrustScoreCard";
import LogoutButton from "@/src/components/settings/LogoutButton";
import InfoCard from "@/src/components/workerProfile/InfoCard";
import WorkPhotosRow from "@/src/components/workerProfile/WorkPhotosRow";
import ProfileHeader from "@/src/components/workerProfile/profileHeader";
import AvailabilityToggleRow from "@/src/components/workerProfile/AvailabilityToggleRow";
import ProfileView from "@/src/view/ProfileView";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const [trustScore, setTrustScore] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        onPress: async () => await logout(),
      },
    ]);
  };

  useEffect(() => {
    if (!user) return;

    async function loadProfile() {
      try {
        const res = await getWorkerProfile(user.id);
        setTrustScore(res.trust_score);
        setReviewCount(res.review_count);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user?.id]);

  if (!user) return <LoginView />;

  return <ProfileView />;
}
