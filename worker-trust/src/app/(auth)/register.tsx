import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  TextInput,
  ScrollView,
  StyleSheet,
  Linking,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { supabase } from "@/src/lib/supabaseClient";
import { loadCategories } from "@/src/lib/categories";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@/src/hooks/useThemeHook";
import * as Location from "expo-location";
import { mapSriLankaLocation } from "../../utils/mapLocationToSriLanka";
import { setLoading } from "@/src/store/slices/workerSlice";
import { useAppDispatch } from "@/src/store/hooks";
import EvilIcons from "@expo/vector-icons/EvilIcons";

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

  /* ---------- LOCATION (FIXED) ---------- */

  const useCurrentLocation = async () => {
    dispatch(setLoading(true));

    try {
      const { status, canAskAgain } =
        await Location.getForegroundPermissionsAsync();

      if (status !== "granted") {
        if (canAskAgain) {
          const req = await Location.requestForegroundPermissionsAsync();

          if (req.status !== "granted") {
            Alert.alert(
              "Permission required",
              "Location permission is needed to continue"
            );
            return;
          }
        } else {
          Alert.alert(
            "Enable Location",
            "Location access was granted only once. Please allow location while using the app.",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Open Settings",
                onPress: () => Linking.openSettings(),
              },
            ]
          );
          return;
        }
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

      const mapped = mapSriLankaLocation(
        region ?? undefined,
        subregion ?? undefined,
        city ?? undefined
      );

      if (!mapped.province) {
        Alert.alert(
          "Location not recognized",
          "Please move closer to a town or city"
        );
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

  /* ---------- IMAGE ---------- */

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
      const cats = await loadCategories();
      setCategories(cats);
    })();
  }, []);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    category_id: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  /* ---------- IMAGE UPLOAD ---------- */

  const uploadImage = async () => {
    if (!image) return null;

    const fileExt = image.uri.split(".").pop() ?? "jpg";
    const fileName = `worker-${Date.now()}.${fileExt}`;

    const formData = new FormData();
    formData.append("file", {
      uri: image.uri,
      name: fileName,
      type: image.mimeType,
    } as any);

    const { error } = await supabase.storage
      .from("worker-images")
      .upload(fileName, formData, {
        contentType: image.mimeType,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("worker-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  /* ---------- SUBMIT ---------- */

  const submitRequest = async () => {
    if (!form.full_name || !form.phone || !form.category_id || !location) {
      Alert.alert("Missing fields", "Please fill all required fields");
      return;
    }

    dispatch(setLoading(true));

    try {
      const imageUrl = await uploadImage();

      const { data, error } = await supabase
        .from("worker_registration_requests")
        .insert([
          {
            full_name: form.full_name,
            phone: form.phone,
            email: form.email || null,
            category: form.category_id,
            image_url: imageUrl,
            province: location.province,
            district: location.district,
            city: location.city,
            latitude: location.latitude,
            longitude: location.longitude,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      Alert.alert(
        "Request Submitted",
        "An admin will review your registration shortly."
      );

      setForm({
        full_name: "",
        phone: "",
        email: "",
        category_id: "",
      });
      setLocation(null);
      setImage(null);
    } catch (err: any) {
      Alert.alert("Error", err.message ?? "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        Register as a worker
      </Text>

      <Input
        label="Full Name"
        value={form.full_name}
        onChangeText={(v) => handleChange("full_name", v)}
      />
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

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          Category
        </Text>
        <View
          style={[
            styles.pickerWrapper,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Picker
            selectedValue={form.category_id}
            onValueChange={(value) => setForm({ ...form, category_id: value })}
            style={{ color: theme.textPrimary }}
          >
            <Picker.Item label="Select Category" value="" />
            {categories.map((cat) => (
              <Picker.Item key={cat.id} label={cat.title} value={cat.id} />
            ))}
          </Picker>
        </View>
      </View>

      <Pressable
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={useCurrentLocation}
      >
        <Text style={styles.buttonText}>Use Current Location</Text>
      </Pressable>

      {location && (
        <>
          <Input label="Province" value={location.province} editable={false} />
          <Input label="District" value={location.district} editable={false} />
          <Input label="City" value={location.city} editable={false} />
        </>
      )}

      <Pressable
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={submitRequest}
      >
        <Text style={styles.buttonText}>Submit Registration</Text>
      </Pressable>
    </ScrollView>
  );
}

/* ---------- INPUT ---------- */

function Input({ label, editable = true, ...props }: any) {
  const { theme } = useTheme();
  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>
        {label}
      </Text>
      <TextInput
        {...props}
        editable={editable}
        style={[
          styles.input,
          {
            color: theme.textPrimary,
            backgroundColor: theme.surface,
            borderColor: theme.border,
          },
        ]}
      />
    </View>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: { padding: 24, flexGrow: 1 },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 16 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12 },
  button: {
    backgroundColor: "#0A84FF",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 16 },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
});
