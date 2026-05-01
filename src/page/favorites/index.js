import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FavoriteHeader from "../../components/favoriteHeader";
import FavoritesRadio from "../../components/favoritesRadio";

function Favorites() {
  const radiosMock = [
    {
      id: "1",
      name: "FM Gospel",
      category: "Destaque",
      currentSong: "Aline Barros - Ressuscita-me",
      isFavorite: true,
      isLive: true,
      image: "https://img.radios.com.br/radio/xl/radio232112_1699554587.jpg",
      listeners: 1200,
    },
    {
      id: "2",
      name: "Adoração Web Rádio",
      category: "Favoritos",
      currentSong: "Fernandinho - Uma Nova História",
      isFavorite: true,
      isLive: true,
      image: "https://img.radios.com.br/radio/lg/radio216908_1759493228.png",
      listeners: 980,
    },
  ];
  return (
    <LinearGradient
      colors={["#0F9D7A", "#02241c", "#000000"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
      style={styles.container}
    >
      <FavoriteHeader />
      <View style={styles.containerFavorites}>
        <FlatList
          data={radiosMock}
          key={(item) => item.data}
          renderItem={({ item }) => <FavoritesRadio data={item} />}
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
