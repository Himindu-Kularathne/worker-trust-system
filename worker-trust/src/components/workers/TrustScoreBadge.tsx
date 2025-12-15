import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  score: number;
}

const TrustScoreBadge: React.FC<Props> = ({ score }) => {
  const color = score >= 80 ? "#16A34A" : score >= 60 ? "#F59E0B" : "#DC2626";

  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.text}>{score}</Text>
    </View>
  );
};

export default TrustScoreBadge;

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
});
