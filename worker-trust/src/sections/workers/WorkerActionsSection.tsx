import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Worker } from "@/src/types/worker";

interface Props {
  worker: Worker;
}

const WorkerActionsSection: React.FC<Props> = ({ worker }) => {
  const handleCall = async () => {
    if (!worker.phone) {
      Alert.alert("Unavailable", "Phone number not available");
      return;
    }

    const phoneUrl = `tel:${worker.phone}`;
    const supported = await Linking.canOpenURL(phoneUrl);

    if (supported) {
      Linking.openURL(phoneUrl);
    } else {
      Alert.alert("Error", "Calling is not supported on this device");
    }
  };

  const handleEmail = async () => {
    if (!worker.email) {
      Alert.alert("Unavailable", "Email not available");
      return;
    }

    const mailUrl = `mailto:${worker.email}?subject=Requesting Service&body=Hello ${worker.full_name},`;

    const supported = await Linking.canOpenURL(mailUrl);

    if (supported) {
      Linking.openURL(mailUrl);
    } else {
      Alert.alert("Error", "Email is not supported on this device");
    }
  };

  return (
    <View style={styles.container}>
      {/* Call Button */}
      <TouchableOpacity style={styles.primaryButton} onPress={handleCall}>
        <Ionicons name="call-outline" size={18} color="#FFF" />
        <Text style={styles.primaryText}>Call Worker</Text>
      </TouchableOpacity>

      {/* Email / Request Button */}
      <TouchableOpacity style={styles.secondaryButton} onPress={handleEmail}>
        <Ionicons name="mail-outline" size={18} color="#2563EB" />
        <Text style={styles.secondaryText}>Email / Request Service</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkerActionsSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  primaryButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  primaryText: {
    marginLeft: 8,
    color: "#FFF",
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    gap: 8,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    color: "#2563EB",
    fontWeight: "600",
  },
});
