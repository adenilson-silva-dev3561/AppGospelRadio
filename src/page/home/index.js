import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, StatusBar } from "react-native";
import Header from "../../components/header";
import { Feather } from "@expo/vector-icons";
import Radios from "../../components/radios";
import { ContextApi } from "../../contexts/radios";

function Home() {
  const { radios, radiosApi } = useContext(ContextApi);

  useEffect(() => {
    radiosApi();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#0F9D7A"} barStyle={"dark-content"} />
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
          data={radios}
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
