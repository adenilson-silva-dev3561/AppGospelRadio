import React, { useContext, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ContextApi } from "../../contexts/radios";
import FavoriteToggle from "../favoriteToggle";

function Radios({ data }) {
  const {
    playRadio,
    setInput,
    toggleFavorite,
    favoriteRadios,
    heart,
    setHeart,
  } = useContext(ContextApi);
  const navigation = useNavigation();

  const isFavorite = favoriteRadios.some(
    (favorite) => favorite.changeuuid === data.changeuuid,
  );

  async function screenPlayer() {
    await playRadio(data);
    navigation.navigate("Player", {
      radio: data,
      autoPlay: true,
    });

    setInput("");
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
            resizeMode="cover"
          />
        </View>

        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {data.name}
        </Text>
      </TouchableOpacity>

      <View style={styles.areaFavoritar}>
        <FavoriteToggle
          isFavorite={isFavorite}
          onToggle={() => toggleFavorite(data.changeuuid)}
          size={36}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    elevation: 0,
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  containerNameRadio: {
    flex: 1,
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
  areaFavoritar: {
    marginLeft: 8,
  },
  logoRadio: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    flexShrink: 1,
  },
});

export default Radios;
