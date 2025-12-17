import React, { useEffect } from "react";
import { useAuth } from "@/src/hooks/UserContextHook";
import LoginView from "@/src/view/LoginView";
import { View, Text } from "@/components/Themed";
import { getWorkerProfile } from "@/src/lib/worker";
import { StyleSheet } from "react-native";
import TrustScoreCard from "@/src/components/workerHome/TrustScoreCard";

export default function ProfileScreen() {
  const { user } = useAuth();
  const [trustScore, setTrustScore] = React.useState<number>(0);
  const [reviewCount, setReviewCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);

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
