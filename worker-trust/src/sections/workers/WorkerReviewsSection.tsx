import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { WorkerReview } from "@/src/types/worker";

interface Props {
  workerId: string;
  reviews: WorkerReview[];
}

const WorkerReviewsSection: React.FC<Props> = ({ reviews }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Reviews</Text>

      {reviews.length === 0 ? (
        <Text style={styles.emptyText}>No reviews yet.</Text>
      ) : (
        reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.reviewerName}>{"Anonymous"}</Text>

              <View style={styles.rating}>
                <Ionicons name="star" size={14} color="#FACC15" />
                <Text style={styles.ratingText}>
                  {review.rating.toFixed(1)}
                </Text>
              </View>
            </View>

            {/* Comment */}
            <Text style={styles.comment}>{review.review}</Text>

            {/* Date */}
            <Text style={styles.date}>
              {new Date(review.created_at).toLocaleDateString()}
            </Text>
          </View>
        ))
      )}
    </View>
  );
};

export default WorkerReviewsSection;

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
    color: "#6B7280",
    fontStyle: "italic",
  },
  reviewCard: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
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
    color: "#374151",
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "right",
  },
});
