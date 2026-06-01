import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/header";
import { Feather } from "@expo/vector-icons";
import Radios from "../../components/radios";
import { ContextApi } from "../../contexts/radios";

function Home() {
  const { radios, radiosApi, currentRadio } = useContext(ContextApi);

  useEffect(() => {
    radiosApi();
  }, []);

  return (
    <LinearGradient
      colors={["#072a20", "#083226"]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <StatusBar backgroundColor={"#072a20"} barStyle={"light-content"} />

      <Header />

      <View style={styles.containerDestaque}>
        <Text style={{ fontSize: 18, fontWeight: "bold", top: 16, color: '#e7f7ef' }}>
          Ouvindo agora:
        </Text>

        <View style={styles.continerTocandoAgora}>
          <View style={styles.areaIcon}>
            <Feather name="radio" size={80} color={"#fff"} />
          </View>

          <View style={styles.areaInfoMusica}>
            <View style={styles.containerTitleRadio}>
              <Text style={styles.nameRadio}>
                {currentRadio?.name || "Nenhuma rádio tocando"}
              </Text>
            </View>

            <View style={styles.containerNameMusicTocando}>
              <Text style={styles.nameMusic}>Rádio gospel online ao vivo</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.containerRadios}>
        <Text style={styles.sectionTitle}>Todas as rádios</Text>

        <FlatList
          data={radios}
          keyExtractor={(item) => item.stationuuid}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <Radios data={item} />}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },

  containerDestaque: {
    width: "95%",
  },

  continerTocandoAgora: {
    height: 110,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginTop: 24,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.04)",
    elevation: 6,
  },

  areaIcon: {
    width: 84,
    height: 84,
    borderRadius: 12,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    backgroundColor: "#0f8f67",
  },

  areaInfoMusica: {
    width: "70%",
    padding: 4,
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
    color: "#fff",
  },

  nameMusic: {
    fontSize: 12,
  },

  containerRadios: {
    width: "95%",
    flex: 1,
    marginTop: 12,
    borderRadius: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#e7f7ef",
    marginBottom: 8,
  },

  listContent: {
    paddingBottom: 120,
  },
});

export default Home;
