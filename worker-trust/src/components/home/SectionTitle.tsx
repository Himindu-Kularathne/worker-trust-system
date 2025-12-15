import React from "react";
import { Text, StyleSheet } from "react-native";

interface Props {
  title: string;
}

const SectionTitle: React.FC<Props> = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

export default SectionTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
});
