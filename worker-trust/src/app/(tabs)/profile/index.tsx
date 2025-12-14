import React from "react";
import { useAuth } from "@/src/hooks/UserContextHook";
import LoginView from "@/src/view/LoginView";
import { View, Text } from "@/components/Themed";

export default function ProfileScreen() {
  const { user } = useAuth();
  return user ? (
    <View>
      <Text>Welcome, {user.name}</Text>
    </View>
  ) : (
    <LoginView />
  );
}
