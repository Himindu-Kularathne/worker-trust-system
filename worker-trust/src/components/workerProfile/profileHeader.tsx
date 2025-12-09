// src/components/profile/ProfileHeader.tsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type ProfileHeaderProps = {
  name: string;
  role: string;
  statusLabel: string;
  avatarUrl: string;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  role,
  statusLabel,
  avatarUrl,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <TouchableOpacity style={styles.editAvatarButton}>
          <Ionicons name="create-outline" size={16} color="#111827" />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{name}</Text>

      <View style={styles.verifiedRow}>
        <Ionicons name="checkmark-circle" size={16} color="#2563EB" />
        <Text style={styles.verifiedText}> Verified Worker</Text>
      </View>

      <Text style={styles.role}>{role}</Text>

      <View style={styles.statusPill}>
        <Text style={styles.statusText}>{statusLabel}</Text>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#E5F0FF",
    borderRadius: 24,
    paddingBottom: 20,
  },
  avatarWrapper: {
    marginTop: 8,
    marginBottom: 8,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  verifiedText: {
    fontSize: 13,
    color: "#2563EB",
    fontWeight: "600",
  },
  role: {
    fontSize: 15,
    color: "#4B5563",
    marginTop: 2,
  },
  statusPill: {
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#22C55E",
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});
