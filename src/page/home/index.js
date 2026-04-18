import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Header from "../../components/header";
import { Feather } from "@expo/vector-icons";
import Radios from "../../components/radios";

function Home() {
  const radiosMock = [
    {
      id: "1",
      name: "Gospel FM",
      category: "Destaque",
      currentSong: "Aline Barros - Ressuscita-me",
      isFavorite: true,
      isLive: true,
      image: "radio",
      listeners: 1200,
    },
    {
      id: "2",
      name: "Adoração Web Rádio",
      category: "Favoritos",
      currentSong: "Fernandinho - Uma Nova História",
      isFavorite: true,
      isLive: true,
      image: "radio",
      listeners: 980,
    },
    {
      id: "3",
      name: "Louvor Eterno",
      category: "Todas",
      currentSong: "Bruna Karla - Advogado Fiel",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 760,
    },
    {
      id: "4",
      name: "Vida FM",
      category: "Todas",
      currentSong: "Damares - Sabor de Mel",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 640,
    },
    {
      id: "5",
      name: "Paz no Vale",
      category: "Todas",
      currentSong: "Anderson Freire - Raridade",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 530,
    },
    {
      id: "6",
      name: "Som da Fé",
      category: "Todas",
      currentSong: "Gabriela Rocha - Lugar Secreto",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 870,
    },
    {
      id: "7",
      name: "Cristo Vive FM",
      category: "Todas",
      currentSong: "Preto no Branco - Ninguém Explica Deus",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 450,
    },
    {
      id: "8",
      name: "Novo Louvor FM",
      category: "Todas",
      currentSong: "Eyshila - Fiel a Mim",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 690,
    },
    {
      id: "9",
      name: "Rádio Aleluia Gospel",
      category: "Todas",
      currentSong: "Thalles Roberto - Deus da Minha Vida",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 810,
    },
    {
      id: "10",
      name: "Fonte de Vida FM",
      category: "Todas",
      currentSong: "Cassiane - Com Muito Louvor",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 720,
    },
    {
      id: "11",
      name: "Rádio Avivamento",
      category: "Todas",
      currentSong: "Marcos Freire - Eu Me Rendo",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 610,
    },
    {
      id: "12",
      name: "Céu Aberto FM",
      category: "Todas",
      currentSong: "Soraya Moraes - Quão Grande És Tu",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 560,
    },
    {
      id: "13",
      name: "Rádio Manancial",
      category: "Todas",
      currentSong: "Toque no Altar - Deus de Promessas",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 670,
    },
    {
      id: "14",
      name: "Essência Gospel",
      category: "Todas",
      currentSong: "Nívea Soares - Reina Sobre Mim",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 590,
    },
    {
      id: "15",
      name: "Rádio Esperança Viva",
      category: "Todas",
      currentSong: "Alda Célia - Jardim Secreto",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 430,
    },
    {
      id: "16",
      name: "Rádio Reino FM",
      category: "Todas",
      currentSong: "Kleber Lucas - Deus Cuida de Mim",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 780,
    },
    {
      id: "17",
      name: "Glória Web Rádio",
      category: "Todas",
      currentSong: "Leandro Borges - Deus e Eu",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 520,
    },
    {
      id: "18",
      name: "Rádio Harpa Cristã",
      category: "Todas",
      currentSong: "Harpa Cristã - Chuvas de Graça",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 390,
    },
    {
      id: "19",
      name: "Unção FM",
      category: "Todas",
      currentSong: "Samuel Messias - Todavia Me Alegrarei",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 850,
    },
    {
      id: "20",
      name: "Rádio Rocha Eterna",
      category: "Todas",
      currentSong: "Isadora Pompeo - Hey, Pai",
      isFavorite: false,
      isLive: true,
      image: "radio",
      listeners: 740,
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
