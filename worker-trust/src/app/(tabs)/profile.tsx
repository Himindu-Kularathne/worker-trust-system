import React, { use, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { getUserData } from "@/src/lib/supabase_func";
import { supabase } from "@/src/lib/supabaseClient";

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      try {
        const { data: authData } = await supabase.auth.getUser();
        const userId = authData?.user?.id;
        if (!userId) throw new Error("No logged-in user.");
        const data = await getUserData(userId); // Fetch user data
        setUser(data);
      } catch (err) {
        console.log("Error:", err);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  console.log("User Data:", user);
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>{user.full_name}</Text>
      <Text>Email:{user.email}</Text>
      <Text>Phone:{user.phone}</Text>
      <Text>Role:{user.role}</Text>
      <Text>Language Preference:{user.language_pref ?? "N/A"}</Text>
    </View>
  );
}
