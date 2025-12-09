import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { signUpWorker, signUpCustomer } from "../../lib/supabase/auth";

export default function SignupScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"worker" | "customer" | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSignup() {
    if (!role) {
      setErrorMessage("Please select a role");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    console.log("Signing up with:", email, role);
    const signupFn = role === "worker" ? signUpWorker : signUpCustomer;
    const { data, error } = await signupFn(email, password);

    if (error) {
      setErrorMessage(error.message);
    } else {
      navigation.replace("Home"); // Navigate to Home on successful signup
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Text style={styles.label}>Select Role</Text>

      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleBtn, role === "worker" ? styles.active : null]}
          onPress={() => setRole("worker")}
        >
          <Text style={styles.roleText}>Worker</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleBtn, role === "customer" ? styles.active : null]}
          onPress={() => setRole("customer")}
        >
          <Text style={styles.roleText}>Customer</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleSignup} disabled={loading}>
        <Text style={styles.btnText}>{loading ? "Signing up..." : "Create Account"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <Text style={styles.switchText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#444",
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  roleBtn: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  active: {
    backgroundColor: "#6366F1",
  },
  roleText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  btn: {
    backgroundColor: "#6366F1",
    padding: 14,
    borderRadius: 8,
    marginVertical: 12,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  switchText: {
    textAlign: "center",
    marginTop: 12,
    color: "#555",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
