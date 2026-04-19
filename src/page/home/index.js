import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Header from "../../components/header";
import { Feather } from "@expo/vector-icons";
import Radios from "../../components/radios";

function Home() {
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
    <View style={styles.container}>
      <Header />
      <View style={styles.containerDestaque}>
        <Text style={{ fontSize: 18, fontWeight: "bold", top: 16 }}>
          Ouvindo agora:
        </Text>
        <View style={styles.continerTocandoAgora}>
          <View style={styles.areaIcon}>
            <Feather name="radio" size={80} color={"#fff"} />
          </View>
          <View style={styles.areaInfoMusica}>
            <View style={styles.containerTitleRadio}>
              <Text style={styles.nameRadio}>Gospel FM ao vivo</Text>
            </View>
            <View style={styles.containerNameMusicTocando}>
              <Text style={styles.nameMusic}>
                <Text style={{ fontWeight: "bold" }}>Tocando agora:</Text>{" "}
                Felipe Rodrigues - Tudo é Perda{" "}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* todas as radios */}
      <View style={styles.containerRadios}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
          Todas as rádios:
        </Text>

        <FlatList
          data={radiosMock}
          showsVerticalScrollIndicator={false}
          key={({ item }) => item.id}
          renderItem={({ item }) => <Radios data={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  containerDestaque: {
    width: "95%",
  },
  continerTocandoAgora: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    marginTop: 30,
    borderRadius: 8,
    backgroundColor: "#DFF5EC",
    elevation: 4,
  },

  areaIcon: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
    elevation: 4,
    backgroundColor: "#8de2bf",
  },

  containerTitleRadio: {},
  areaInfoMusica: {
    width: "70%",
    padding: 4,
    borderBottomColor: "#8de2bf",
  },

  containerNameMusicTocando: {
    borderTopWidth: 1,
    borderTopColor: "#89dab8",
    marginTop: 12,
    paddingTop: 4,
  },
  nameRadio: {
    fontSize: 20,
    fontWeight: "800",
    color: "#285240",
  },
  nameMusic: {
    fontSize: 12,
  },

  containerRadios: {
    width: "95%",
    flex: 1,
    marginTop: 8,
    borderRadius: 4,
  },
});

export default Home;
