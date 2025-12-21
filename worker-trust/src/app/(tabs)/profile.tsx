import React, { useEffect } from "react";
import { useAuth } from "@/src/hooks/UserContextHook";
import LoginView from "@/src/view/LoginView";
import { View, Text } from "@/components/Themed";
import { Alert, ScrollView, StyleSheet } from "react-native";
import TrustScoreCard from "@/src/components/workerHome/TrustScoreCard";
import LogoutButton from "@/src/components/settings/LogoutButton";
import InfoCard from "@/src/components/workerProfile/InfoCard";
import WorkPhotosRow from "@/src/components/workerProfile/WorkPhotosRow";
import ProfileHeader from "@/src/components/workerProfile/profileHeader";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, logout, loading } = useAuth();
  console.log("ProfileScreen User:", user);
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

  // useEffect(() => {
  //   if (!user) return;
  //   const workerId = user.id;
  //   async function loadProfile() {
  //     // to prevent tsx screams.
  //     try {
  //       const response = await getWorkerProfile(workerId);
  //       setWorker(response);
  //       setTrustScore(response.trust_score);
  //       setReviewCount(response.review_count);
  //     } catch (error) {
  //       console.error("Error loading worker profile:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   loadProfile();
  // }, [user]);

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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Top content */}
          <Text style={styles.welcome}>Welcome, {user.full_name}</Text>

          <ProfileHeader name={user.full_name} role={user.category} statusLabel="" avatarUrl={user.image_url ?? ""} />

          <WorkPhotosRow photos={[]} />

          <TrustScoreCard score={user.trust_score} total={5} reviews={user.review_count} />

          <InfoCard title="Personal Info">
            <Text>Name: {user.full_name}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Phone: {user.phone}</Text>
            <Text>Category: {user.category}</Text>
            <Text>Province: {user.province}</Text>
            <Text>District: {user.district}</Text>
            <Text>City: {user.city} </Text>
          </InfoCard>
          <View style={{ height: 40 }} />
        </ScrollView>
        <LogoutButton onPress={handleLogout} />
      </View>
    </SafeAreaView>
  ) : (
    <LoginView />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 👈 take full screen height
    padding: 16,
  },
  topSection: {
    gap: 16, // 👈 spacing between welcome & TrustScoreCard
  },
  welcome: {
    fontSize: 18,
    fontWeight: "700",
  },
  scrollContent: {
    paddingBottom: 24,
  },
});
