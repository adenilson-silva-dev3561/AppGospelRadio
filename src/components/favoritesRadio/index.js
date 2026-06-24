import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ContextApi } from "../../contexts/radios";
import FavoriteToggle from "../favoriteToggle";

function FavoritesRadio({ data }) {
  const { toggleFavorite, favoriteRadios, playRadio, currentRadio, playing } =
    useContext(ContextApi);
  const navigation = useNavigation();

  const isFavorite = favoriteRadios.some(
    (favorite) => favorite.changeuuid === data.changeuuid,
  );

  function openPlayer() {
    if (currentRadio?.stationuuid === data.stationuuid && playing) {
      navigation.navigate("Inicio");
      return;
    }

    playRadio(data);
    navigation.navigate("Inicio");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerNameRadio} onPress={openPlayer}>
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

        <View style={styles.infoArea}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {data.name}
          </Text>
          <Text style={styles.meta}>{data.country || "Brasil"}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.areaFavoritar}>
        <FavoriteToggle
          isFavorite={isFavorite}
          onToggle={() => toggleFavorite(data.changeuuid)}
          size={28}
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
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 12,
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  containerNameRadio: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
  },

  areaLogo: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginRight: 12,
  },

  areaFavoritar: {
    marginRight: 6,
  },

  logoRadio: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },

  lottie: {
    width: 48,
    height: 48,
  },

  infoArea: {
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },

  meta: {
    fontSize: 12,
    color: "#cfcfcf",
  },
});

export default FavoritesRadio;
