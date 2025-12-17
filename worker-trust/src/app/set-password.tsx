import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { supabase } from "../lib/supabaseClient";
import { router } from "expo-router";

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(false);

  // ✅ Just check session
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event);

      if (session) {
        setReady(true);
      } else {
        Alert.alert("Session expired", "Please log in again.");
        router.replace("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const onSetPassword = async () => {
    console.log("Setting password:", password);
    if (password.length < 8) {
      Alert.alert("Password must be at least 8 characters");
      return;
    }
    console.log("Updating password in Supabase...");
    const { error } = await supabase.auth.updateUser({
      password,
      data: { password_set: true },
    });
    console.log("Password update result:", { error });
    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert("Password set successfully 🎉");
      router.replace("/login");
    }
  };

  if (!ready) {
    return <Text>Preparing account...</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Set your password</Text>

      <TextInput
        secureTextEntry
        placeholder="New password"
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          backgroundColor: "#fff",
        }}
      />

      <Button title="Save password" onPress={onSetPassword} />
    </View>
  );
}
