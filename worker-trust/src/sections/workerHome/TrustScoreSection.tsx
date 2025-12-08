import React from "react";
import { View, StyleSheet } from "react-native";
import TrustScoreCard, {
  TrustScoreCardProps,
} from "@/src/components/workerHome/TrustScoreCard";

const TrustScoreSection: React.FC<TrustScoreCardProps> = (props) => {
  return (
    <View style={styles.wrapper}>
      <TrustScoreCard {...props} />
    </View>
  );
};

export default TrustScoreSection;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
});
