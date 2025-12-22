import { View, TextInput, Button, Alert } from "react-native";
import { supabase } from "@/src/lib/supabaseClient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function VerifyOtp() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    if (!phone) {
      Alert.alert("Phone number missing");
      return;
    }

    const cleanOtp = otp.replace(/\D/g, "");

    if (cleanOtp.length !== 6) {
      Alert.alert("Enter the 6-digit OTP");
      return;
    }

    if (!otp || otp.trim().length !== 6) {
      Alert.alert("Enter the 6-digit OTP");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: cleanOtp,
      type: "sms",
    });

    setLoading(false);

    if (error) {
      Alert.alert(error.message);
      return;
    }

    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      Alert.alert("Session not ready. Please try again.");
      return;
    }

    router.replace("/set-password");
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Enter OTP" value={otp} onChangeText={setOtp} keyboardType="number-pad" />
      <Button title="Verify" onPress={verify} />
    </View>
  );
}
