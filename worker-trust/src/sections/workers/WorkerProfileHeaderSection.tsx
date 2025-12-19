import React, { useContext, useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import TrustScoreBadge from "@/src/components/workers/TrustScoreBadge";
import { Worker } from "@/src/types/worker";
import ReviewModal from "@/src/components/workers/WorkerReviewModal";
import { ThemeContext } from "@react-navigation/native";

interface Props {
  worker: Worker;
}

const WorkerProfileHeaderSection: React.FC<Props> = ({ worker }) => {
  const [reviewOpen, setReviewOpen] = useState(false);

  const theme = useContext(ThemeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{worker.full_name}</Text>

      <View style={styles.row}>
        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>
            {worker.category.toUpperCase()}
          </Text>
        </View>

        <TrustScoreBadge score={worker.trust_score} />
      </View>

      <View style={styles.ratingRow}>
        <Text style={styles.star}>★</Text>
        <Text style={styles.ratingText}>{worker.rating}</Text>
        <Text style={styles.reviewCount}>
          ({worker.review_count} reviews)
        </Text>

        <Pressable
          style={styles.reviewBtn}
          onPress={() => setReviewOpen(true)}
        >
          <Text style={styles.reviewBtnText}>Write review</Text>
        </Pressable>
      </View>

      <ReviewModal
        visible={reviewOpen}
        onClose={() => setReviewOpen(false)}
        workerId={worker.id}
      />
    </View>
  );
};

export default WorkerProfileHeaderSection;

const createStyles = (theme: any) =>
  StyleSheet.create({
    card: {
      margin: 16,
      padding: 20,
      backgroundColor: theme.colors.card,
      borderRadius: 18,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 6,
    },

    name: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.colors.textPrimary,
      marginBottom: 10,
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },

    categoryPill: {
      backgroundColor: theme.colors.primarySoft,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 999,
    },

    categoryText: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.colors.primary,
      letterSpacing: 0.5,
    },

    ratingRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 6,
    },

    star: {
      color: theme.colors.warning,
      fontSize: 16,
      marginRight: 4,
    },

    ratingText: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.textPrimary,
      marginRight: 6,
    },

    reviewCount: {
      fontSize: 13,
      color: theme.colors.textSecondary,
    },

    reviewBtn: {
      marginLeft: "auto",
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: theme.colors.primary,
      borderRadius: 999,
    },

    reviewBtnText: {
      color: theme.colors.onPrimary,
      fontSize: 12,
      fontWeight: "600",
    },
  });
