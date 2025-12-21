import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import LottieView from "lottie-react-native";

import { useAuth } from "@/src/hooks/UserContextHook";
import { useTheme } from "@/src/hooks/useThemeHook";

const LoginView: React.FC = () => {
  const { login } = useAuth();
  const { theme } = useTheme();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await login(phone, password);
    setLoading(false);

    if (error) {
      Alert.alert("Login failed", error);
      return;
    }

    // ✅ After successful login
    router.replace("/(tabs)");
  };

  const disabled = !phone || !password || loading;

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      {/* -------- Decorative Lotties -------- */}
      <LottieView
        source={require("@/assets/animations/topLeft.json")}
        autoPlay
        loop
        style={[styles.lottie, styles.topLeft]}
      />

      <LottieView
        source={require("@/assets/animations/bottomRight.json")}
        autoPlay
        loop
        style={[styles.lottie, styles.bottomRight]}
      />

      {/* -------- Login Card -------- */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            borderWidth: theme.mode === "dark" ? 0 : 1,
          },
        ]}
      >
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Welcome Back
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: theme.textSecondary },
          ]}
        >
          Sign in to continue
        </Text>

        {/* Phone */}
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          Phone number
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              color: theme.textPrimary,
            },
          ]}
          placeholder="+94746789000"
          placeholderTextColor={theme.muted}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        {/* Password */}
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          Password
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              color: theme.textPrimary,
            },
          ]}
          placeholder="Enter your password"
          placeholderTextColor={theme.muted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Login button */}
        <TouchableOpacity
          style={[
            styles.loginButton,
            {
              backgroundColor: disabled
                ? theme.muted
                : theme.primary,
            },
          ]}
          onPress={handleLogin}
          disabled={disabled}
        >
          <Text
            style={[
              styles.loginButtonText,
              { color: theme.primaryText },
            ]}
          >
            {loading ? "Signing in..." : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Register navigation */}
        <View style={styles.registerContainer}>
          <Text
            style={[
              styles.registerText,
              { color: theme.textSecondary },
            ]}
          >
            No account?
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/register")}
          >
            <Text
              style={[
                styles.registerLink,
                { color: theme.primary },
              ]}
            >
              {" "}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginView;

/* ------------ styles ------------ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  /* Lottie positioning */
  lottie: {
    position: "absolute",
    width: 300,
    height: 300,
    opacity: 0.9,
  },

  topLeft: {
    top: 20,
    left: -20,
  },

  bottomRight: {
    bottom: -30,
    right: -20,
  },

  card: {
    borderRadius: 16,
    padding: 24,
    zIndex: 2,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
  },

  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    fontSize: 15,
  },

  loginButton: {
    height: 46,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  loginButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },

  registerText: {
    fontSize: 14,
  },

  registerLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});
