import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/hooks/useThemeHook";

export type TrustScoreCardProps = {
  score: number;
  total: number;
  reviews: number;
};

const TrustScoreCard: React.FC<TrustScoreCardProps> = ({
  score,
  total,
  reviews,
}) => {
  const { theme } = useTheme();

  // Normalize to 5-star system
  const rating = Math.round((score / total) * 5);

  // Dynamic border color based on trust score
  const borderColor =
    score >= total * 0.75
      ? theme.success
      : score >= total * 0.4
      ? theme.warning
      : theme.danger;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.background }
      ]}
    >
      {/* Left: Score */}
      <View style={styles.left}>
        <View
          style={[
            styles.circle,
            {
              borderColor,
              backgroundColor: theme.card,
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              { color: theme.textPrimary }
            ]}
          >
            TrustScore
          </Text>

          <Text
            style={[
              styles.value,
              { color: theme.textPrimary }
            ]}
          >
            {score}
            <Text style={styles.total}>/{total}</Text>
          </Text>
        </View>

        {/* Stars */}
        <View style={styles.starsRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons
              key={i}
              name={i < rating ? "star" : "star-outline"}
              size={16}
              color={theme.star}
              style={{ marginRight: 3 }}
            />
          ))}
        </View>
      </View>

      {/* Right: Meta */}
      <View style={styles.right}>
        <Text
          style={[
            styles.title,
            { color: theme.textPrimary }
          ]}
        >
          Trust Score
        </Text>

        <Text
          style={[
            styles.reviews,
            { color: theme.textSecondary }
          ]}
        >
          {reviews} reviews
        </Text>
      </View>
    </View>
  );
};

export default TrustScoreCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 5,
  },

  left: {
    alignItems: "center",
  },

  circle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
  },

  value: {
    fontSize: 30,
    fontWeight: "800",
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
    paddingLeft: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },

  reviews: {
    fontSize: 14,
    fontWeight: "500",
  },
});
