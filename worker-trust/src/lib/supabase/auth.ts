import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import * as AuthSession from "expo-auth-session"; // remove all imports when necessary
import { router } from "expo-router";

export async function signUpWorker(email: string, password: string) {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role: "worker" },
    },
  });
}

export async function signUpCustomer(email: string, password: string) {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role: "customer" },
    },
  });
}

export async function login(email: string, password: string) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function logout() {
  return await supabase.auth.signOut();
}

export async function signInWithGoogle() {
  const redirectUrl = AuthSession.makeRedirectUri({
    scheme: "workertrust",
  });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
    },
  });

  return { data, error };
}

export function useAuthListener() {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        router.replace("/(tabs)");
      }
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
}
