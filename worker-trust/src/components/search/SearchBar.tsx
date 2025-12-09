import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={18} color="#9CA3AF" />
      <TextInput
        placeholder="Search by name, category, or service..."
        placeholderTextColor="#9CA3AF"
        style={styles.input}
      />
      <TouchableOpacity style={styles.voiceButton}>
        <Ionicons name="mic-outline" size={18} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 13,
    color: "#111827",
  },
  voiceButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },
});
