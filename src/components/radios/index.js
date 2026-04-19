import React, { useState } from "react";

import { Feather } from "@expo/vector-icons";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

function Radios({ data }) {
  const [heart, setHeart] = useState(null);

  function favoritar() {
    setHeart(!heart);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerNameRadio}>
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
    elevation: 2,
    backgroundColor: "#ffffff",
    padding: 4,
    borderRadius: 10,
    marginTop: 8,
  },

  containerNameRadio: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
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
    objectFit: "contain",
    marginRight: 16,
  },
});
export default Radios;
