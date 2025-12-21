import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/hooks/useThemeHook";

export type ProfileHeaderProps = {
  name: string;
  role: string;
  statusLabel: string;
  avatarUrl?: string;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  role,
  statusLabel,
  avatarUrl,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <Image
          source={
            avatarUrl
              ? { uri: avatarUrl }
              : require("@/assets/images/profile-avatar.avif")
          }
          style={[
            styles.avatar,
            { borderColor: theme.border },
          ]}
        />

        <TouchableOpacity
          style={[
            styles.editAvatarButton,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
          activeOpacity={0.85}
        >
          <Ionicons
            name="create-outline"
            size={16}
            color={theme.textPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Name */}
      <Text style={[styles.name, { color: theme.textPrimary }]}>
        {name}
      </Text>

      {/* Verified */}
      <View style={styles.verifiedRow}>
        <Ionicons
          name="checkmark-circle"
          size={16}
          color={theme.primary}
        />
        <Text
          style={[
            styles.verifiedText,
            { color: theme.primary },
          ]}
        >
          Verified Worker
        </Text>
      </View>

      {/* Role */}
      <Text
        style={[
          styles.role,
          { color: theme.textSecondary },
        ]}
      >
        {role}
      </Text>

      {/* Status */}
      {!!statusLabel && (
        <View
          style={[
            styles.statusPill,
            { backgroundColor: theme.success },
          ]}
        >
          <Text style={styles.statusText}>
            {statusLabel}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 24,
    marginBottom: 12,
  },

  avatarWrapper: {
    marginBottom: 10,
  },

  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 2,
  },

  editAvatarButton: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    elevation: 3,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
  },

  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  verifiedText: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 4,
  },

  role: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: "500",
  },

  statusPill: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
  },

  statusText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});
