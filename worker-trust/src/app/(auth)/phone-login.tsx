import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { router, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/src/hooks/useThemeHook";

export default function PhoneLogin() {
  const { theme } = useTheme();
  const { approved } = useLocalSearchParams<{ approved?: string }>();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    console.log("Sending OTP to phone:", phone);
    if (!phone) {
      Alert.alert("Enter phone number");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      phone,
    });

    setLoading(false);

    if (error) {
      console.log("sendOtp response error:", error);
      Alert.alert("Failed to send OTP", error.message);
      return;
    }

    router.push({
      pathname: "/verify-otp",
      params: { phone },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {approved && (
        <View
          style={[
            styles.banner,
            {
              backgroundColor: theme.success + "22",
              borderColor: theme.success,
            },
          ]}
        >
          <Text style={[styles.bannerText, { color: theme.success }]}>
            ✅ Your account has been approved. Please log in.
          </Text>
        </View>
      )}

      <Text style={[styles.title, { color: theme.textPrimary }]}>Welcome back</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Enter your phone number to continue</Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
            color: theme.textPrimary,
          },
        ]}
        placeholder="+94 77XXXXXXX"
        placeholderTextColor={theme.muted}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: loading ? theme.muted : theme.primary,
          },
        ]}
        onPress={sendOtp}
        disabled={loading}
      >
        <Text style={[styles.buttonText, { color: theme.primaryText }]}>{loading ? "Sending..." : "Send OTP"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  banner: {
    backgroundColor: "#E8F5E9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  bannerText: {
    color: "#2E7D32",
    textAlign: "center",
    fontWeight: "500",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    color: "#666",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#0A84FF",
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
