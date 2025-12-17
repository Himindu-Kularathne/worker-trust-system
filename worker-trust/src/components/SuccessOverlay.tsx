import React, { useEffect, useRef } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { clearReviewSuccess } from "@/src/store/slices/workerSlice";

const SuccessOverlay: React.FC = () => {
  const dispatch = useAppDispatch();
  const { showSuccess } = useAppSelector((state) => state.workers);
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        dispatch(clearReviewSuccess());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <Modal
      visible={showSuccess}
      transparent
      animationType="fade"
      statusBarTranslucent
      hardwareAccelerated
    >
      <View style={styles.overlay}>
        <LottieView
          ref={animationRef}
          source={require("@/assets/animations/success.json")}
          autoPlay
          loop={false}
          style={styles.lottie}
        />

        <Text style={styles.text}>Review Submitted!</Text>
      </View>
    </Modal>
  );
};

export default SuccessOverlay;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },

  lottie: {
    width: 240,
    height: 240,
  },

  text: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    textAlign: "center",
  },
});
