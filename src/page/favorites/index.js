import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FavoriteHeader from "../../components/favoriteHeader";
import FavoritesRadio from "../../components/favoritesRadio";
import { ContextApi } from "../../contexts/radios";

function Favorites() {
  const { favoriteRadios } = useContext(ContextApi);

  return (
    <>
      {favoriteRadios.length === 0 ? (
        <LinearGradient
          colors={["#0F9D7A", "#02241c", "#04120c"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.container}
        >
          <FavoriteHeader />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              style={{ width: 300, height: 300 }}
              source={require(".././../../assets/empty_favorites_radio.png")}
            />
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient
          colors={["#0F9D7A", "#02241c", "#04120c"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.container}
        >
          <FavoriteHeader />
          <View style={styles.containerFavorites}>
            <FlatList
              data={favoriteRadios}
              keyExtractor={(item) => item.stationuuid}
              renderItem={({ item }) => <FavoritesRadio data={item} />}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </LinearGradient>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },

  containerFavorites: {
    flex: 1,
  },
});
export default Favorites;
