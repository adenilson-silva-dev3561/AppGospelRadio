import React, { useState } from "react";

import { Feather } from "@expo/vector-icons";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function Radios({ data }) {
  const [heart, setHeart] = useState(true);

  function favoritar() {
    setHeart(!heart);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerNameRadio}>
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
  },
});
export default Radios;
