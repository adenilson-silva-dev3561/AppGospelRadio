import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/header";
import { Feather } from "@expo/vector-icons";
import Radios from "../../components/radios";
import { ContextApi } from "../../contexts/radios";
import { Keyboard } from "react-native";
import PlayerContent from "../../components/PlayerContent";

function Home() {
  const {
    radios,
    radiosApi,
    currentRadio,
    input,
    setInput,
    playRadio,
    playing,
    loading,
  } = useContext(ContextApi);
  const [radioSearch, setRadioSearch] = useState([]);

  useEffect(() => {
    radiosApi();
  }, []);

  useEffect(() => {
    if (!input) {
      setRadioSearch([]);
      return;
    }

    const filtered = radios.filter((radio) =>
      removerAcentos(radio.name || "")
        .toLowerCase()
        .includes(removerAcentos(input).toLowerCase().trim()),
    );

    setRadioSearch(filtered);
  }, [input, radios]);

  function removerAcentos(text) {
    return text.normalize("NFD").replace(/([\u0300-\u036f])/g, "");
  }

  function handleSearch(valor) {
    setInput(valor);
  }

  const radiosToShow = useMemo(() => {
    return input ? radioSearch : radios;
  }, [input, radioSearch, radios]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#072a20", "#083226"]}
          style={styles.container}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <StatusBar backgroundColor={"#072a20"} barStyle={"light-content"} />

          <Header />

          <View style={styles.searchArea}>
            <View style={styles.searchBox}>
              <Feather name="search" size={20} color="#b8d9c9" />
              <TextInput
                value={input}
                onChangeText={handleSearch}
                placeholder="Buscar rádio..."
                placeholderTextColor="#b8d9c9"
                style={styles.input}
              />
              {input.length > 0 && (
                <TouchableOpacity onPress={() => setInput("")}>
                  <Feather name="x" size={20} color="#b8d9c9" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {currentRadio ? (
            <View style={styles.containerDestaque}>
              <Text style={styles.sectionTitle}>Ouvindo agora</Text>

              <View style={styles.continerTocandoAgora}>
                <View style={styles.areaIcon}>
                  <Feather name="radio" size={36} color="#fff" />
                </View>

                <View style={styles.areaInfoMusica}>
                  <Text
                    style={styles.nameRadio}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {currentRadio?.name || "Nenhuma rádio tocando"}
                  </Text>
                  <Text style={styles.nameMusic}>
                    Rádio gospel online ao vivo
                  </Text>
                  <View style={styles.liveRow}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>AO VIVO</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => currentRadio && playRadio(currentRadio)}
                >
                  <Feather
                    name={playing ? "pause" : "play"}
                    size={22}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View></View>
          )}

          <View style={styles.containerRadios}>
            <View style={styles.headerRow}>
              <Text style={styles.sectionTitle}>Explorar rádios</Text>
              <Feather name="chevron-down" size={24} color="#b8d9c9" />
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size={30} color="#b8d9c9" />
                <Text style={styles.loadingText}>Carregando rádios...</Text>
              </View>
            ) : (
              <FlatList
                data={radiosToShow}
                keyExtractor={(item) => item.stationuuid}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => <Radios data={item} />}
              />
            )}
          </View>
        </LinearGradient>
        <View
          style={{
            flex: 1,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <PlayerContent radio={currentRadio} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },

  searchArea: {
    width: "95%",
    marginBottom: 10,
  },

  searchBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  input: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    fontSize: 16,
    color: "#e7f7ef",
  },

  containerDestaque: {
    width: "95%",
    marginBottom: 16,
  },

  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  continerTocandoAgora: {
    minHeight: 100,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 18,
    backgroundColor: "rgba(35, 78, 62, 0.94)",
    borderWidth: 1,
    borderColor: "rgba(49, 214, 136, 0.2)",
    elevation: 4,
  },

  areaIcon: {
    width: 74,
    height: 74,
    borderRadius: 18,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(49, 214, 136, 0.18)",
  },

  areaInfoMusica: {
    flex: 1,
  },

  nameRadio: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 6,
  },

  nameMusic: {
    fontSize: 12,
    color: "#d7e8db",
    marginBottom: 8,
  },

  liveRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#00cf4f",
    marginRight: 8,
  },

  liveText: {
    color: "#00cf4f",
    fontSize: 12,
    fontWeight: "700",
  },

  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },

  liveBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "rgba(49, 214, 136, 0.16)",
    color: "#b8d9c9",
    fontWeight: "700",
    borderRadius: 999,
    fontSize: 12,
    letterSpacing: 0.5,
  },

  containerRadios: {
    width: "95%",
    flex: 1,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#e7f7ef",
  },

  listContent: {
    paddingBottom: 140,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },

  loadingText: {
    color: "#b8d9c9",
    fontSize: 14,
    marginTop: 16,
    fontWeight: "500",
  },
});

export default Home;
