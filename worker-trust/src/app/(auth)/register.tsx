import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Alert, TextInput, ScrollView, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getWorkerProfile } from "@/src/lib/worker";
import { supabase } from "@/src/lib/supabaseClient";
import { router } from "expo-router";
import { loadCategories, loadSubcategories } from "@/src/lib/categories";
import * as ImagePicker from "expo-image-picker";

export const options = {
  title: "Register as Worker",
};

interface Category {
  id: string;
  title: string;
  icon: string;
}

export default function Dashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [image, setImage] = useState<{
    uri: string;
    mimeType: string;
  } | null>(null);

  const pickImage = async () => {
    const [image, setImage] = useState<{
      uri: string;
      mimeType: string;
    } | null>(null);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow gallery access");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage({
        uri: result.assets[0].uri,
        mimeType: result.assets[0].mimeType || "image/jpeg",
      });
    }
  };

  useEffect(() => {
    (async () => {
      const categories = await loadCategories();
      console.log("Loaded categories:", categories);
      setCategories(categories);
    })();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    (async () => {
      const subs = await loadSubcategories(selectedCategory);
      setSubcategories(subs);
    })();
  }, [selectedCategory]);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    address: "",
    // category: "",
    category_id: "",
    // subcategory_id: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const uploadImage = async () => {
    if (!image) return null;

    const fileExt = image.uri.split(".").pop();
    const fileName = `worker-${Date.now()}.${fileExt}`;

    const response = await fetch(image.uri);
    const blob = await response.blob();

    const { error } = await supabase.storage.from("worker-images").upload(fileName, blob, {
      contentType: image.mimeType,
    });

    if (error) throw error;

    const { data } = supabase.storage.from("worker-images").getPublicUrl(fileName);

    return data.publicUrl;
  };

  const submitRequest = async () => {
    if (!form.full_name || !form.phone || !form.address || !form.category_id) {
      Alert.alert("Missing fields", "Please fill all required fields");
      return;
    }

    try {
      const imageUrl = await uploadImage();
      const { data, error } = await supabase
        .from("worker_registration_requests")
        .insert([
          {
            full_name: form.full_name,
            phone: form.phone,
            email: form.email || null,
            address: form.address,
            category: form.category_id,
            image_url: imageUrl || null,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error(error);
        Alert.alert("Submission failed", error.message);
        return;
      }

      await fetch("https://xuqsbheuxtthgyosmxrh.supabase.co/functions/v1/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          full_name: data.full_name,
          phone: data.phone,
          email: data.email,
          address: data.address,
          category: data.category,
        }),
      });

      Alert.alert("Request Submitted", "An admin will review your registration shortly.");

      setForm({
        full_name: "",
        phone: "",
        email: "",
        address: "",
        category_id: "",
      });
    } catch (err: any) {
      Alert.alert("Error", err.message ?? "Something went wrong");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register as a worker</Text>
      <Text>Want to work with us?Fill the form below.</Text>
      <Text>You will receive a sms with the sign up link once your request has been approved.</Text>

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
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category</Text>

        <View style={styles.pickerWrapper}>
          <Picker selectedValue={form.category_id} onValueChange={(value) => setForm({ ...form, category_id: value })}>
            <Picker.Item label="Select Category" value="" />
            {categories.map((cat) => (
              <Picker.Item key={cat.id} label={cat.title} value={cat.id} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Work Photo / ID Image</Text>

        <Pressable style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Text style={{ color: "#0A84FF" }}>Change Image</Text>
          ) : (
            <Text style={{ color: "#666" }}>Pick an image</Text>
          )}
        </Pressable>

        {image && <Text style={styles.imagePreviewText}>Image selected ✓</Text>}
      </View>

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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  imagePreviewText: {
    marginTop: 6,
    fontSize: 12,
    color: "#22C55E",
  },
});
