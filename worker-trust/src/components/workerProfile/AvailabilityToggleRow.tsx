import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useTheme } from "@/src/hooks/useThemeHook";

export type AvailabilityToggleRowProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

const AvailabilityToggleRow: React.FC<AvailabilityToggleRowProps> = ({
  label,
  value,
  onChange,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.surface },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: theme.textPrimary },
        ]}
      >
        {label}:{" "}
        <Text
          style={[
            styles.statusText,
            { color: value ? theme.success : theme.danger },
          ]}
        >
          {value ? "On" : "Off"}
        </Text>
      </Text>

      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{
          false: theme.border,
          true: theme.primary,
        }}
        thumbColor={theme.switchThumb}
        ios_backgroundColor={theme.border}
      />
    </View>
  );
};

export default AvailabilityToggleRow;

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
  },

  text: {
    fontSize: 14,
    fontWeight: "500",
  },

  statusText: {
    fontWeight: "700",
  },
});
