import React, { useState } from "react";

import { Feather } from "@expo/vector-icons";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

function FavoritesRadio({ data }) {
  const [heart, setHeart] = useState(null);

  const navigation = useNavigation();
  function favoritar() {
    setHeart(!heart);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerNameRadio}
        onPress={() => navigation.navigate("Player")}
      >
        <View style={styles.areaLogo}>
          <Image style={styles.logoRadio} source={{ uri: data.image }} />
        </View>
        <Text>{data.name}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={favoritar}>
        <Feather
          name="heart"
          size={30}
          color={heart === true ? "red" : "#dcdcdc"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent",
    padding: 4,
    borderWidth: 1,
    borderColor: "#747171",
    marginTop: 8,
    borderRadius: 10,
  },

  containerNameRadio: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
  },

  areaLogo: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginRight: 16,
  },

  logoRadio: {
    width: 50,
    height: 50,
    borderRadius: 100,
    objectMode: "contain",
    marginRight: 16,
  },
});
export default FavoritesRadio;
