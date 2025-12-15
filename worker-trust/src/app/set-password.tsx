import { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import * as Linking from "expo-linking";
import { supabase } from "../lib/supabaseClient";

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(false);

  const handleUrl = async (url: string | null) => {
    if (!url) return;

    //  Ignore Expo dev client bootstrap link
    if (url.includes("expo-development-client")) {
      console.log("Ignoring Expo dev client URL");
      return;
    }

    console.log("Deep link URL:", url);

    const parsed = Linking.parse(url);
    let params = parsed.queryParams ?? {};

    if (url.includes("#")) {
      const hash = url.split("#")[1];
      const hashParams = Object.fromEntries(hash.split("&").map((p) => p.split("=")));
      params = { ...params, ...hashParams };
    }

    console.log("Final params:", params);

    // const { queryParams } = Linking.parse(url);
    console.log("Params:", params?.access_token);
    if (params?.access_token) {
      // later add && queryParams?.refresh_token
      console.log("Tokens received, skipping session validation (DEV)");
      // await supabase.auth.setSession({
      //   access_token: String(queryParams.access_token),
      //   refresh_token: String(queryParams.refresh_token),
      // });

      // 👇 TEMP: bypass Supabase validation
      setReady(true);
    }
  };

  // Cold start
  useEffect(() => {
    Linking.getInitialURL().then(handleUrl);
  }, []);

  // App already open / background
  useEffect(() => {
    const sub = Linking.addEventListener("url", ({ url }) => {
      handleUrl(url);
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
