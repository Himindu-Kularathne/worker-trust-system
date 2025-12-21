import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/hooks/useThemeHook";

export type InfoRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  text?: string;
};

const InfoRow: React.FC<InfoRowProps> = ({ icon, text }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.row}>
      <Ionicons
        name={icon}
        size={16}
        color={theme.primary}
        style={styles.icon}
      />
      <Text
        style={[
          styles.text,
          { color: theme.textSecondary },
        ]}
        numberOfLines={2}
      >
        {text}
      </Text>
    </View>
  );
};

export default InfoRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  icon: {
    marginRight: 10,
  },

  text: {
    fontSize: 14,
    fontWeight: "500",
    flexShrink: 1,
  },
});
