import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type SettingsHeaderProps = {
  name: string;
  role: string;
  avatarUrl: string;
};

const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  name,
  role,
  avatarUrl,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <View>
          <Text style={styles.welcome}>Welcome back,</Text>
          <Text style={styles.name}>{name}!</Text>
          <View style={styles.roleRow}>
            <Ionicons name="construct-outline" size={14} color="#6B7280" />
            <Text style={styles.role}> {role}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 10,
  },
  welcome: {
    fontSize: 13,
    color: "#6B7280",
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  roleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  role: {
    fontSize: 13,
    color: "#6B7280",
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#E0ECFF",
  },
  editText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2563EB",
  },
});
