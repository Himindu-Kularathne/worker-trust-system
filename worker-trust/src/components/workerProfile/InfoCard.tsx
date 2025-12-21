import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/hooks/useThemeHook";

export type InfoCardProps = {
  title: string;
  showEdit?: boolean;
  children: React.ReactNode;
};

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  showEdit,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.surface },
      ]}
    >
      <View style={styles.headerRow}>
        <Text
          style={[
            styles.title,
            { color: theme.textPrimary },
          ]}
        >
          {title}
        </Text>

        {showEdit && (
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons
              name="create-outline"
              size={18}
              color={theme.iconSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.body}>{children}</View>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
  },

  body: {
    gap: 6,
  },
});
