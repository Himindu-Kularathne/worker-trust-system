import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type WorkerHeaderProps = {
  name: string;
  role: string;
  avatarUrl: string;
};

const WorkerHeader: React.FC<WorkerHeaderProps> = ({
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
            <Ionicons name="construct-outline" size={14} color="#666" />
            <Text style={styles.role}> {role}</Text>
          </View>
        </View>
      </View>

      <View style={styles.badge}>
        <Ionicons name="shield-checkmark" size={16} color="#fff" />
        <Text style={styles.badgeText}>Verified Worker</Text>
      </View>
    </View>
  );
};

export default WorkerHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 12,
  },
  welcome: {
    fontSize: 14,
    color: "#6B7280",
  },
  name: {
    fontSize: 18,
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
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 4,
  },
});
