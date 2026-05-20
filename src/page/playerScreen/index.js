import React, { useContext, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ContextApi } from "../../contexts/radios";

function Radios({ data }) {
  const [heart, setHeart] = useState(false);

  console.log(data);
  const navigation = useNavigation();

  function favoritar() {
    setHeart(!heart);
  }

  function screenPlayer() {
    navigation.navigate("Player", {
      radio: data,
      autoPlay: true,
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerNameRadio}
        onPress={screenPlayer}
      >
        <View style={styles.areaLogo}>
          <Image
            style={styles.logoRadio}
            source={
              data.favicon
                ? { uri: data.favicon }
                : require("../../../assets/iconRadio.png")
            }
          />
        </View>

        <Text>{data.name}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={favoritar}>
        <Feather name="heart" size={30} color={heart ? "red" : "#dcdcdc"} />
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
  },
});

export default Radios;
