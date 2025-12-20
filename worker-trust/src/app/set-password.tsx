import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { supabase } from "../lib/supabaseClient";
import { router } from "expo-router";

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;

      if (!data.session) {
        router.replace("/login");
      } else {
        setReady(true);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/login");
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const onSetPassword = async () => {
    if (password.length < 8) {
      Alert.alert("Password must be at least 8 characters");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
      data: { password_set: true },
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert("Password set successfully 🎉", "", [
        {
          text: "Continue",
          onPress: () => router.replace("/"),
        },
      ]);
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
