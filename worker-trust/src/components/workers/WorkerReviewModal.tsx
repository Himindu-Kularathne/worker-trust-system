import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { submitWorkerReviews } from "@/src/store/thunks/workersThunks";
import { clearReviewSuccess } from "@/src/store/slices/workerSlice";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";

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

  const submitReview = async () => {
    if (!rating || !email) return;

    await dispatch(
      submitWorkerReviews({ workerId, email, review, rating })
    );

    setEmail("");
    setReview("");
    setRating(null);
  };

  // Close modal after animation
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
    <>
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>Write a Review</Text>

            <TextInput
              placeholder="Your email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />

            <TextInput
              placeholder="Your review"
              value={review}
              onChangeText={setReview}
              multiline
              style={[styles.input, styles.textArea]}
            />

            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((num) => (
                <Pressable key={num} onPress={() => setRating(num)}>
                  <Text
                    style={[
                      styles.star,
                      rating && num <= rating && styles.starActive,
                    ]}
                  >
                    ★
                  </Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.actions}>
              <Pressable onPress={onClose}>
                <Text style={styles.cancel}>Cancel</Text>
              </Pressable>

              <Pressable
                style={styles.submitBtn}
                onPress={submitReview}
                disabled={loading}
              >
                <Text style={styles.submitText}>
                  {loading ? "Submitting..." : "Submit"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

    </>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  /* ---------- Overlay & Sheet ---------- */
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },

  /* ---------- Header ---------- */
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
    textAlign: "center",
  },

  /* ---------- Inputs ---------- */
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#F9FAFB",
    marginBottom: 12,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  /* ---------- Rating ---------- */
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },

  star: {
    fontSize: 32,
    color: "#D1D5DB",
    marginHorizontal: 4,
  },

  starActive: {
    color: "#FBBF24", // warm gold
  },

  /* ---------- Actions ---------- */
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },

  cancel: {
    fontSize: 15,
    color: "#6B7280",
    paddingVertical: 10,
    paddingHorizontal: 6,
  },

  submitBtn: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
    shadowColor: "#2563EB",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  submitText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  /* ---------- Success Overlay ---------- */
  successOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  successText: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
});

