import React from "react";
import { StyleSheet, View, Text } from "react-native";
import GoBack from "../goBack";

function FavoriteHeader() {
  return (
    <View style={styles.container}>
      <GoBack />
      <Text style={styles.title}>Favoritos</Text>
      <Text style={styles.subtitle}>Suas rádios favoritas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
  },

  subtitle: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#a5a4a4",
    marginTop: 6,
  },
});

export default FavoriteHeader;
