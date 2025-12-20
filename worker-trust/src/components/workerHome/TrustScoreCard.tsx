import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type TrustScoreCardProps = {
  score: number;
  total: number;
  reviews: number;
};

const TrustScoreCard: React.FC<TrustScoreCardProps> = ({ score, total, reviews }) => {
  const rating = Math.round((score / total) * 5);
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={styles.circle}>
          <Text style={styles.label}>TrustScore</Text>
          <Text style={styles.value}>
            {score}
            <Text style={styles.total}>/{total}</Text>
          </Text>
        </View>
        <View style={styles.starsRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons
              key={i}
              name={i < rating ? "star" : "star-outline"}
              size={16}
              color="#FFD166"
              style={{ marginRight: 2 }}
            />
          ))}
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.title}>TrustScore</Text>
        <Text style={styles.reviews}>{reviews} Reviews</Text>
      </View>
    </View>
  );
};

export default TrustScoreCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#4F8DFD",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  left: {
    alignItems: "center",
  },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 8,
    borderColor: "#22C55E",
    backgroundColor: "#5D9BFF",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    color: "#E5E7EB",
    marginBottom: 2,
  },
  value: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  total: {
    fontSize: 16,
    fontWeight: "500",
  },
  starsRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  right: {
    alignItems: "flex-start",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#E5E7EB",
    marginBottom: 4,
  },
  reviews: {
    fontSize: 14,
    color: "#E5E7EB",
  },
});
