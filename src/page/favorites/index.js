import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FavoriteHeader from "../../components/favoriteHeader";
import FavoritesRadio from "../../components/favoritesRadio";
import { ContextApi } from "../../contexts/radios";

function Favorites() {
  const { favoriteRadios } = useContext(ContextApi);

  return (
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
