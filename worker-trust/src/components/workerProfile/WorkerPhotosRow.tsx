// src/components/profile/WorkPhotosRow.tsx
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type WorkPhotosRowProps = {
  photos: string[];
};

const WorkPhotosRow: React.FC<WorkPhotosRowProps> = ({ photos }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {photos.map((uri, idx) => (
        <Image key={idx} source={{ uri }} style={styles.photo} />
      ))}

      <TouchableOpacity style={styles.addCard}>
        <Ionicons name="add-outline" size={22} color="#4B5563" />
        <Text style={styles.addText}>Add Photo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default WorkPhotosRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 8,
  },
  addCard: {
    width: 80,
    height: 80,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    marginTop: 4,
    fontSize: 11,
    color: "#4B5563",
  },
});
