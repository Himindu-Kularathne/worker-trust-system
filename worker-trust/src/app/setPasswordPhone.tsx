import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { supabase } from "../lib/supabaseClient";
import { router } from "expo-router";

export default function SetPassword() {
  const [password, setPassword] = useState("");

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
      return;
    }

    Alert.alert("Password set successfully 🎉");
    router.replace("/(tabs)");
  };

  return (
    <View style={{ padding: 20 }}>
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
        }}
      />

      <Button title="Save password" onPress={onSetPassword} />
    </View>
  );
}
