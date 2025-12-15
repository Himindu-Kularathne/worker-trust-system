// app/set-password.tsx
import { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import * as Linking from "expo-linking";
import { supabase } from "../lib/supabaseClient";

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const url = await Linking.getInitialURL();
      if (!url) return;

      const { queryParams } = Linking.parse(url);

      if (queryParams?.access_token && queryParams?.refresh_token) {
        await supabase.auth.setSession({
          access_token: String(queryParams.access_token),
          refresh_token: String(queryParams.refresh_token),
        });
        setReady(true);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const sub = Linking.addEventListener("url", ({ url }) => {
      const { queryParams } = Linking.parse(url);

      if (queryParams?.access_token && queryParams?.refresh_token) {
        supabase.auth.setSession({
          access_token: String(queryParams.access_token),
          refresh_token: String(queryParams.refresh_token),
        });
      }
    });

    return () => sub.remove();
  }, []);

  const onSetPassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Password set successfully 🎉");
    }
  };

  if (!ready) {
    return <Text>Preparing account...</Text>;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Set your password</Text>
      <TextInput
        secureTextEntry
        placeholder="New password"
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Save password" onPress={onSetPassword} />
    </View>
  );
}
