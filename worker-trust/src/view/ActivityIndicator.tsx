import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import LoadingAnimation from "@/src/components/LoadingAnnimation";

const LoadingView = () => {
  return (
    <SafeAreaView style={styles.center}>
      <LoadingAnimation />
      <Text>Loading worker details...</Text>
    </SafeAreaView>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
