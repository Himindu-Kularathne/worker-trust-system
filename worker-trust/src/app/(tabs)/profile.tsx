import React, { useEffect } from "react";
import { useAuth } from "@/src/hooks/UserContextHook";
import LoginView from "@/src/view/LoginView";
import { View, Text } from "@/components/Themed";
import { getWorkerProfile } from "@/src/lib/worker";
import { Alert, StyleSheet } from "react-native";
import TrustScoreCard from "@/src/components/workerHome/TrustScoreCard";
import LogoutButton from "@/src/components/settings/LogoutButton";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [trustScore, setTrustScore] = React.useState<number>(0);
  const [reviewCount, setReviewCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);

  const handleLogout = async () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
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
      // to prevent tsx screams.
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
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }
  return user ? (
    <View>
      <Text>Welcome, {user.name}</Text>
      <TrustScoreCard score={trustScore} total={5} reviews={reviewCount} />
      <LogoutButton onPress={handleLogout} />
    </View>
  ) : (
    <LoginView />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  welcome: {
    fontSize: 18,
    fontWeight: "700",
  },
});
