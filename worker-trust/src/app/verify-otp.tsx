import { View, TextInput, Button, Alert } from "react-native";
import { supabase } from "@/src/lib/supabaseClient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function VerifyOtp() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState("");

  const verify = async () => {
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: "sms",
    });

    if (error) {
      Alert.alert(error.message);
      return;
    }

    // Session is NOW created
    const { data } = await supabase.auth.getUser();

    if (!data.user?.user_metadata?.password_set) {
      router.replace("/set-password");
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Enter OTP" value={otp} onChangeText={setOtp} keyboardType="number-pad" />
      <Button title="Verify" onPress={verify} />
    </View>
  );
}
