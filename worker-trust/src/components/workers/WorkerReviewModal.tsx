import { useAppDispatch } from "@/src/store/hooks";
import { submitWorkerReviews } from "@/src/store/thunks/workersThunks";
import React, { useState } from "react";
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

  const submitReview = async () => {
    if (!rating || !email) return;

    // TODO: send to backend / Supabase / Firebase
    // console.log({ workerId, email, description, rating });

    await dispatch(submitWorkerReviews({ workerId, email, review, rating }));

    onClose();
    setEmail("");
    setReview("");
    setRating(null);
  };

  return (
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

          {/* Rating */}
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

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable onPress={onClose}>
              <Text style={styles.cancel}>Cancel</Text>
            </Pressable>

            <Pressable style={styles.submitBtn} onPress={submitReview}>
              <Text style={styles.submitText}>Submit</Text>
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
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },

  textArea: {
    height: 90,
    textAlignVertical: "top",
  },

  starsRow: {
    flexDirection: "row",
    marginVertical: 12,
  },

  star: {
    fontSize: 28,
    color: "#D1D5DB",
    marginRight: 6,
  },

  starActive: {
    color: "#FACC15",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  cancel: {
    color: "#6B7280",
    fontSize: 14,
  },

  submitBtn: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },

  submitText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
