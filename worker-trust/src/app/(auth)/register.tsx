import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Alert, TextInput, ScrollView, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getWorkerProfile } from "@/src/lib/worker";
import { supabase } from "@/src/lib/supabaseClient";
import { router, useLocalSearchParams } from "expo-router";
import { loadCategories } from "@/src/lib/categories";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@/src/hooks/useThemeHook";
import { extractAddressFromCoords } from "../reverseGeoHelper";
import * as Location from "expo-location";
import { mapSriLankaLocation } from "../../utils/mapLocationToSriLanka";
import { setLoading } from "@/src/store/slices/workerSlice";
import { useAppDispatch } from "@/src/store/hooks";

export const options = {
  title: "Register as Worker",
};

interface Category {
  id: string;
  title: string;
  icon: string;
}

export default function Dashboard() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<Category[]>([]);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    province: string;
    district: string;
    city: string;
  } | null>(null);
  const [image, setImage] = useState<{
    uri: string;
    mimeType: string;
  } | null>(null);

  const useCurrentLocation = async () => {
    dispatch(setLoading(true));

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required");
        return;
      }

      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const geo = await Location.reverseGeocodeAsync({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });

      if (!geo.length) {
        Alert.alert("Location error", "Unable to detect your location");
        return;
      }

      const { region, subregion, city } = geo[0];

      const mapped = mapSriLankaLocation(region ?? undefined, subregion ?? undefined, city ?? undefined);

      if (!mapped.province) {
        Alert.alert("Location not recognized", "Please move closer to a town or city");
        return;
      }

      setLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        province: mapped.province,
        district: mapped.district ?? "",
        city: mapped.city ?? "",
      });
    } catch (error) {
      console.error("Location error:", error);
      Alert.alert("Error", "Failed to get location");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const pickImage = async () => {
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

  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.lat && params.lng) {
      (async () => {
        const address = await extractAddressFromCoords(Number(params.lat), Number(params.lng));

        setLocation({
          latitude: Number(params.lat),
          longitude: Number(params.lng),
          ...address,
        });
      })();
    }
  }, [params.lat, params.lng]);

  const uploadImage = async () => {
    if (!image) return null;

    const fileExt = image.uri.split(".").pop() ?? "jpg";
    const fileName = `worker-${Date.now()}.${fileExt}`;
    const filePath = fileName;

    const formData = new FormData();

    formData.append("file", {
      uri: image.uri,
      name: fileName,
      type: image.mimeType,
    } as any);

    const { error } = await supabase.storage.from("worker-images").upload(filePath, formData, {
      contentType: image.mimeType,
    });

    if (error) throw error;

    const { data } = supabase.storage.from("worker-images").getPublicUrl(filePath);

    return data.publicUrl;
  };

  const submitRequest = async () => {
    if (!form.full_name || !form.phone || !form.address || !form.category_id || !location) {
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
            province: location?.province,
            district: location?.district,
            city: location?.city,
            latitude: location?.latitude,
            longitude: location?.longitude,
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
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.textPrimary }]}>Register as a worker</Text>
      <Text style={{ color: theme.textPrimary }}>Want to work with us?Fill the form below.</Text>
      <Text style={{ color: theme.textPrimary }}>
        You will receive a sms with the sign up link once your request has been approved.
      </Text>

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
        <Text style={[styles.label, { color: theme.textSecondary }]}>Category</Text>

        <View
          style={[
            styles.pickerWrapper,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <Picker
            style={{ color: theme.textPrimary }}
            selectedValue={form.category_id}
            onValueChange={(value) => setForm({ ...form, category_id: value })}
          >
            <Picker.Item color={theme.muted} label="Select Category" value="" />
            {categories.map((cat) => (
              <Picker.Item key={cat.id} label={cat.title} value={cat.id} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>Work Photo / ID Image</Text>

        <Pressable style={styles.imagePicker} onPress={pickImage}>
          <Text style={{ color: theme.primary }}>{image ? "Change Image" : "Pick an image"}</Text>
        </Pressable>

        {image && <Text style={styles.imagePreviewText}>Image selected ✓</Text>}
      </View>
      <Pressable style={styles.button} onPress={useCurrentLocation}>
        <Text style={styles.buttonText}>Use Current Location</Text>
      </Pressable>
      {location && (
        <>
          <Input label="Province" value={location.province} editable={false} />
          <Input label="District" value={location.district} editable={false} />
          <Input label="City" value={location.city} editable={false} />
        </>
      )}

      <Pressable style={styles.button} onPress={submitRequest}>
        <Text style={styles.buttonText}>Submit Registration</Text>
      </Pressable>
    </ScrollView>
  );
}

function Input({
  label,
  editable = true,
  ...props
}: {
  label: string;
  value: string;
  onChangeText?: (v: string) => void;
  keyboardType?: any;
  editable?: boolean;
}) {
  const { theme } = useTheme();
  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
      <TextInput
        {...props}
        editable={editable}
        selectTextOnFocus={editable}
        style={[
          styles.input,
          {
            color: theme.textPrimary,
            backgroundColor: editable ? theme.surface : theme.surface + "AA",
            borderColor: theme.border,
            opacity: editable ? 1 : 0.7,
          },
        ]}
        placeholderTextColor={theme.muted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
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
