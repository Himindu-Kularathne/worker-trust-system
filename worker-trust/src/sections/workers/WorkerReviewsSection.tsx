import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { WorkerReview } from "@/src/types/worker";
import { ThemeContext } from "@/src/context/AppThemeContext";

interface Props {
  workerId: string;
  reviews: WorkerReview[];
}

const WorkerReviewsSection: React.FC<Props> = ({ reviews }) => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error(
      "WorkerReviewsSection must be used within AppThemeProvider"
    );
  }

  const { theme } = themeContext;

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
        Reviews
      </Text>

      {reviews.length === 0 ? (
        <Text
          style={[
            styles.emptyText,
            { color: theme.textSecondary },
          ]}
        >
          No reviews yet.
        </Text>
      ) : (
        reviews.map((review) => (
          <View
            key={review.id}
            style={[
              styles.reviewCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                borderWidth: theme.mode === "dark" ? 0 : 1,
              },
            ]}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text
                style={[
                  styles.reviewerName,
                  { color: theme.textPrimary },
                ]}
              >
                Anonymous
              </Text>

              <View style={styles.rating}>
                <Ionicons
                  name="star"
                  size={14}
                  color={theme.primary}
                />
                <Text
                  style={[
                    styles.ratingText,
                    { color: theme.textPrimary },
                  ]}
                >
                  {review.rating.toFixed(1)}
                </Text>
              </View>
            </View>

            {/* Comment */}
            <Text
              style={[
                styles.comment,
                { color: theme.textSecondary },
              ]}
            >
              {review.review}
            </Text>

            {/* Date */}
            <Text
              style={[
                styles.date,
                { color: theme.muted },
              ]}
            >
              {new Date(review.created_at).toLocaleDateString()}
            </Text>
          </View>
        ))
      )}
    </View>
  );
};

export default WorkerReviewsSection;

/* ------------ base styles (theme-independent) ------------ */

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  emptyText: {
    fontStyle: "italic",
  },

  reviewCard: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  reviewerName: {
    fontWeight: "600",
    fontSize: 14,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  ratingText: {
    fontSize: 13,
    fontWeight: "600",
  },

  comment: {
    marginBottom: 6,
  },

  date: {
    fontSize: 12,
    textAlign: "right",
  },
});
