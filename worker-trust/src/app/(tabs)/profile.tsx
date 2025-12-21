import React from "react";
import LoginView from "@/src/view/LoginView";
import { useAuth } from "@/src/hooks/UserContextHook";
import ProfileView from "@/src/view/ProfileView";

export default function ProfileScreen() {
  const { user } = useAuth();


  if (!user) return <LoginView />;

  return <ProfileView />;

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
