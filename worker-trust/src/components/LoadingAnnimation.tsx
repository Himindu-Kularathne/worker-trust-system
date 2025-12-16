import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const LoadingAnimation = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("@/src/assets/animations/loading.json")}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

export default LoadingAnimation;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: 120,
    height: 120,
  },
});
