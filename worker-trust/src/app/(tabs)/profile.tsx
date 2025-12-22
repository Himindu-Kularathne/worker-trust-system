import React from "react";
import LoginView from "@/src/view/LoginView";
import { useAuth } from "@/src/hooks/UserContextHook";
import ProfileView from "@/src/view/ProfileView";

export default function ProfileScreen() {
  const { user } = useAuth();

  if (!user) return <LoginView />;

  return <ProfileView />;
}
