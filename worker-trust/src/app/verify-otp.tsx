import { View, TextInput, Button, Alert } from "react-native";
import { supabase } from "@/src/lib/supabaseClient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function VerifyOtp() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    if (!phone) {
      Alert.alert("Phone number missing");
      return;
    }
    console.log("OTP entered:", otp);
    const cleanOtp = otp.replace(/\D/g, "");

    if (cleanOtp.length !== 6) {
      Alert.alert("Enter the 6-digit OTP");
      return;
    }
    console.log("Clean OTP:", cleanOtp);
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

    if (error) {
      console.log("OTP verification error:", error);
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
