import { useEffect, useState } from "react";
import { View, Text, Pressable, Alert, TextInput, ScrollView, StyleSheet } from "react-native";
import { getWorkerProfile } from "@/src/lib/worker";
import { supabase } from "@/src/lib/supabaseClient";
import { router } from "expo-router";

export default function Dashboard() {
  const [trustScore, setTrustScore] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number>(0);

  // Initial load
  useEffect(() => {
    loadData();
  }, []);

  const workerId = "test-user-001"; // Replace with actual worker ID
  async function loadData() {
    const data = await getWorkerProfile(workerId);
    setTrustScore(data.trust_score);
    setReviewCount(data.review_count);
  }

  // Real-time updates
  useEffect(() => {
    const channel = supabase
      .channel("worker-profile")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "worker_profiles",
          filter: `worker_id=eq.${workerId}`,
        },
        (payload) => {
          setTrustScore(payload.new.trust_score);
          setReviewCount(payload.new.review_count);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [workerId]);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    address: "",
    category: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const submitRequest = async () => {
    if (!form.full_name || !form.phone || !form.address || !form.category) {
      Alert.alert("Missing fields", "Please fill all required fields");
      return;
    }

    try {
      const { error } = await supabase.from("worker_registration_requests").insert([
        {
          full_name: form.full_name,
          phone: form.phone,
          email: form.email || null,
          address: form.address,
          category: form.category,
        },
      ]);

      if (error) {
        console.error(error);
        Alert.alert("Submission failed", error.message);
        return;
      }
      Alert.alert("Request Submitted", "An admin will review your registration shortly.");

      setForm({
        full_name: "",
        phone: "",
        email: "",
        address: "",
        category: "",
      });
    } catch (err: any) {
      Alert.alert("Error", err.message ?? "Something went wrong");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>Trust Score: {trustScore ?? "--"} / 100</Text>

      <Text style={{ fontSize: 18, marginTop: 8 }}>Reviews: {reviewCount}</Text>
      <Text>Want to work with us?</Text>

      <Pressable onPress={() => router.push("/")}>
        <Text>Register as Worker</Text>
      </Pressable>

      <Text style={styles.title}>Worker Registration</Text>

      <Input label="Full Name" value={form.full_name} onChangeText={(v) => handleChange("full_name", v)} />
      <Input
        label="Phone Number"
        value={form.phone}
        keyboardType="phone-pad"
        onChangeText={(v) => handleChange("phone", v)}
      />
      <Input
        label="Email (Optional)"
        value={form.email}
        keyboardType="email-address"
        onChangeText={(v) => handleChange("email", v)}
      />
      <Input label="Address" value={form.address} onChangeText={(v) => handleChange("address", v)} />
      <Input
        label="Category (e.g. Plumber, Electrician)"
        value={form.category}
        onChangeText={(v) => handleChange("category", v)}
      />

      <Pressable style={styles.button} onPress={submitRequest}>
        <Text style={styles.buttonText}>Submit Registration</Text>
      </Pressable>
    </ScrollView>
  );
}

function Input({
  label,
  ...props
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  keyboardType?: any;
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#0A84FF",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
