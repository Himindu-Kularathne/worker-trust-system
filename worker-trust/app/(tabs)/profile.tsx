import React, { use, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { getUserData } from "@/src/lib/supabase_func";

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getUserData("test-user-001"); // Replace with actual UID
        setUser(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>{user.full_name}</Text>
      <Text>Email:{user.email}</Text>
      <Text>Phone:{user.phone}</Text>
      <Text>Role:{user.role}</Text>
      <Text>Language Preference:{user.user_settings.language_pref}</Text>
    </View>
  );
}
