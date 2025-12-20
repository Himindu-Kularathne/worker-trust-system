import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import TrustScoreBadge from "@/src/components/workers/TrustScoreBadge";
import { Worker } from "@/src/types/worker";
import ReviewModal from "@/src/components/workers/WorkerReviewModal";
import { ThemeContext } from "@/src/context/AppThemeContext";

interface Props {
  worker: Worker;
}

const WorkerProfileHeaderSection: React.FC<Props> = ({ worker }) => {
  const [reviewOpen, setReviewOpen] = useState(false);

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error(
      "WorkerProfileHeaderSection must be used within AppThemeProvider"
    );
  }

  const { theme } = themeContext;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          borderWidth: theme.mode === "dark" ? 0 : 1,
        },
      ]}
    >
      {/* Name */}
      <Text style={[styles.name, { color: theme.textPrimary }]}>
        {worker.full_name}
      </Text>

      {/* Category + Trust */}
      <View style={styles.row}>
        <View
          style={[
            styles.categoryPill,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              { color: theme.textPrimary },
            ]}
          >
            {worker.category.toUpperCase()}
          </Text>
        </View>

        <TrustScoreBadge score={worker.trust_score} />
      </View>

      {/* Rating + Review button */}
      <View style={styles.ratingRow}>
        <Text style={[styles.star, { color: theme.primary }]}>★</Text>

        <Text style={[styles.ratingText, { color: theme.textPrimary }]}>
          {worker.rating}
        </Text>

        <Text
          style={[
            styles.reviewCount,
            { color: theme.textSecondary },
          ]}
        >
          ({worker.review_count} reviews)
        </Text>

        <Pressable
          style={[
            styles.reviewBtn,
            { backgroundColor: theme.primary },
          ]}
          onPress={() => setReviewOpen(true)}
        >
          <Text
            style={[
              styles.reviewBtnText,
              { color: theme.primaryText },
            ]}
          >
            Write review
          </Text>
        </Pressable>
      </View>

      {/* Review modal */}
      <ReviewModal
        visible={reviewOpen}
        onClose={() => setReviewOpen(false)}
        workerId={worker.id}
      />
    </View>
  );
};

export default WorkerProfileHeaderSection;

/* ------------ base styles (theme-independent) ------------ */

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 20,
    borderRadius: 18,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  star: {
    fontSize: 16,
    marginRight: 4,
  },

  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 6,
  },

  reviewCount: {
    fontSize: 13,
  },

  reviewBtn: {
    marginLeft: "auto",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  reviewBtnText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
