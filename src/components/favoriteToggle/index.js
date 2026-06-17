import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FavoriteToggle({ isFavorite, onToggle, size = 48 }) {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={styles.button}
      activeOpacity={0.8}
    >
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={size}
        color={isFavorite ? "#fa2c2c" : "#dcdcdc"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
