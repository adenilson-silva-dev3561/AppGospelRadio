import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Header from "../../components/header";
import { LinearGradient } from "expo-linear-gradient";
import GoBack from "../../components/goBack";
import { Feather } from "@expo/vector-icons";
import Radios from "../../components/radios";

function Search() {
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
    {
      id: "3",
      name: "Louvor Eterno",
      category: "Todas",
      currentSong: "Bruna Karla - Advogado Fiel",
      isFavorite: false,
      isLive: true,
      image:
        "https://play-lh.googleusercontent.com/bK2593h-cQJyNZ1mInGuFjsp6Uw5UrQ1Jl24zTdYcMThC2QbFEg-6TtnB1TQHnurlVQ",
      listeners: 760,
    },
    {
      id: "4",
      name: "Vida FM",
      category: "Todas",
      currentSong: "Damares - Sabor de Mel",
      isFavorite: false,
      isLive: true,
      image:
        "https://oregional.com.br/media/noticias/3df56f8c0d1e0a4e9810ab4466dcda8f.jpg",
      listeners: 640,
    },
    {
      id: "5",
      name: "Paz no Vale",
      category: "Todas",
      currentSong: "Anderson Freire - Raridade",
      isFavorite: false,
      isLive: true,
      image:
        "https://www.paznovalefm.com.br/wp-content/uploads/sites/3/2022/04/logotipo.png",
      listeners: 530,
    },
    {
      id: "6",
      name: "Som da Fé",
      category: "Todas",
      currentSong: "Gabriela Rocha - Lugar Secreto",
      isFavorite: false,
      isLive: true,
      image: "https://img.radios.com.br/radio/xl/radio183888_1624104929.png",
      listeners: 870,
    },
  ];

  return (
    <LinearGradient
      colors={["#0F9D7A", "#02241c", "#000000"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <GoBack />

      <View style={styles.areaInput}>
        <TextInput
          style={styles.input}
          placeholder="Bucar por uma radio..."
          placeholderTextColor={"#969393"}
        />
        <TouchableOpacity>
          <Feather name="search" size={30} color={"#969393"} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerRadios}>
        <FlatList
          data={radiosMock}
          showsVerticalScrollIndicator={false}
          key={({ item }) => item.id}
          renderItem={({ item }) => <Radios data={item} />}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  areaInput: {
    width: "60%",
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderBottomColor: "#dcdcdc",
    borderBottomWidth: 1,
  },
  input: {
    width: "80%",
    fontSize: 18,
    marginRight: 8,
  },

  containerRadios: {
    width: "95%",
    flex: 1,
    marginTop: 20,
    borderRadius: 4,
  },
});

export default Search;
