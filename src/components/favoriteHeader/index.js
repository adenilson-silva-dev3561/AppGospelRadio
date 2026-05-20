import React from "react";
import { StyleSheet, View, Text } from "react-native";
import GoBack from "../goBack";

function FavoriteHeader() {
  return (
    <View style={styles.conteiner}>
      <GoBack />
      <Text style={{ fontSize: 30, fontWeight: "900", color: "#fff" }}>
        Favoritos
      </Text>
      <Text style={{ fontSize: 20, fontStyle: "italic", color: "#a5a4a4" }}>
        Suas rádios favoritas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    with: "100%",
    height: 50,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
});

export default FavoriteHeader;
