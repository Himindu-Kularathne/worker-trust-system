import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { submitWorkerReviews } from "@/src/store/thunks/workersThunks";
import { clearReviewSuccess } from "@/src/store/slices/workerSlice";
import LottieView from "lottie-react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { ThemeContext } from "@/src/context/AppThemeContext";

interface Props {
  visible: boolean;
  onClose: () => void;
  workerId: string;
}

const ReviewModal: React.FC<Props> = ({ visible, onClose, workerId }) => {
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const { showSuccess, loading } = useAppSelector(
    (state) => state.workers
  );

  const animationRef = useRef<LottieView>(null);

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ReviewModal must be used within AppThemeProvider");
  }

  const { theme } = themeContext;

  const submitReview = async () => {
    if (!rating || !email) return;

    await dispatch(
      submitWorkerReviews({ workerId, email, review, rating })
    );

    setEmail("");
    setReview("");
    setRating(null);
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        dispatch(clearReviewSuccess());
        onClose();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View
          style={[
            styles.modal,
            { backgroundColor: theme.surface },
          ]}
        >
          <Text
            style={[
              styles.title,
              { color: theme.textPrimary },
            ]}
          >
            Write a Review
          </Text>

          <TextInput
            placeholder="Your email"
            placeholderTextColor={theme.muted}
            value={email}
            onChangeText={setEmail}
            style={[
              styles.input,
              {
                backgroundColor: theme.background,
                borderColor: theme.border,
                color: theme.textPrimary,
              },
            ]}
          />

          <TextInput
            placeholder="Your review"
            placeholderTextColor={theme.muted}
            value={review}
            onChangeText={setReview}
            multiline
            style={[
              styles.input,
              styles.textArea,
              {
                backgroundColor: theme.background,
                borderColor: theme.border,
                color: theme.textPrimary,
              },
            ]}
          />

          {/* Rating */}
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((num) => (
              <Pressable key={num} onPress={() => setRating(num)}>
                <Text
                  style={[
                    styles.star,
                    {
                      color:
                        rating && num <= rating
                          ? theme.primary
                          : theme.muted,
                    },
                  ]}
                >
                  ★
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable onPress={onClose}>
              <Text
                style={[
                  styles.cancel,
                  { color: theme.textSecondary },
                ]}
              >
                Cancel
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.submitBtn,
                { backgroundColor: theme.primary },
              ]}
              onPress={submitReview}
              disabled={loading}
            >
              <Text
                style={[
                  styles.submitText,
                  { color: theme.primaryText },
                ]}
              >
                {loading ? "Submitting..." : "Submit"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modal: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 12,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },

  star: {
    fontSize: 32,
    marginHorizontal: 4,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },

  cancel: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },

  submitBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },

  submitText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
