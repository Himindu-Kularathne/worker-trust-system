import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type ReminderItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  text: string;
};

const ReminderItem: React.FC<ReminderItemProps> = ({
  icon,
  iconColor,
  text,
}) => {
  return (
    <View style={styles.row}>
      <View
        style={[
          styles.iconWrapper,
          { backgroundColor: `${iconColor}22` }, // light tint
        ]}
      >
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default ReminderItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    color: "#4B5563",
    flexShrink: 1,
  },
});
