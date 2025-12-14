import React from "react";
import WorkerProfileView from "@/src/view/WorkerProfileView";
import { useAuth } from "@/src/hooks/UserContextHook";
import LoginView from "@/src/view/LoginView";

export default function ProfileScreen() {
  const { user } = useAuth();
  return user ? <WorkerProfileView /> : <LoginView />;
}
