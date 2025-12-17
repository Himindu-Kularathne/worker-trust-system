import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const LoadingAnimation = () => {
  const annimation = require("../../assets/animations/loading.json");

  if (!annimation) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LottieView source={annimation} autoPlay loop style={styles.animation} />
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
