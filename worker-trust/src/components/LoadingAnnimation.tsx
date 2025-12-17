import React, { useRef } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useAppSelector } from "@/src/store/hooks";

const LoadingOverlay: React.FC = () => {
  const { loading } = useAppSelector((state) => state.workers);
  const animationRef = useRef<LottieView>(null);

  if (!loading) return null;

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      statusBarTranslucent
      hardwareAccelerated
    >
      <View style={styles.overlay}>
        <LottieView
          ref={animationRef}
          source={require("@/assets/animations/loading.json")}
          autoPlay
          loop
          style={styles.lottie}
        />

        <Text style={styles.text}>Loading…</Text>
      </View>
    </Modal>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  lottie: {
    width: 300,
    height: 300,
  },

  text: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#FFFFFF",
    opacity: 0.9,
  },
});

