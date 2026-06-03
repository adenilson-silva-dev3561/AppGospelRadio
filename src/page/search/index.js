import React, { useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GoBack from "../../components/goBack";
import { Feather } from "@expo/vector-icons";
import Radios from "../../components/radios";
import { ContextApi } from "../../contexts/radios";
import { useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

function Search() {
  const { radios, input, setInput } = useContext(ContextApi);
  const [radioSearch, setRadioSearch] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setInput("");
      setRadioSearch([]);
    }, []),
  );

  const regex = /^[A-Za-z0-9!@#$%^&*()_\-+={}[\]:;"'<>,.?/\\| ]+$/;

  function removerAcentos(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  async function handleSearch(valor) {
    if (!regex.test(valor) && valor !== "") {
      return;
    }

    setInput(valor);

    const radiosFiltrados = radios.filter((radio) => {
      return removerAcentos(radio.name)
        .toLowerCase()
        .includes(removerAcentos(valor).toLowerCase().trim());
    });

    setRadioSearch(radiosFiltrados);
  }

  return (
    <LinearGradient
      colors={["#072a20", "#083226"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <GoBack />

      <View style={styles.areaInputWrap}>
        <View style={styles.searchBox}>
          <Feather name="search" size={20} color="#b8d9c9" />
          <TextInput
            value={input}
            onChangeText={handleSearch}
            style={styles.input}
            placeholder="Buscar por uma rádio..."
            placeholderTextColor={"#b8d9c9"}
          />
          {input.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setInput("");
                setRadioSearch([]);
              }}
            >
              <Feather name="x" size={20} color="#b8d9c9" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.containerRadios}>
        <FlatList
          data={input ? radioSearch : radios}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.stationuuid}
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
    flexDirection: "column",
    alignItems: "center",
  },
  areaInputWrap: {
    width: "95%",
    alignItems: "center",
    marginTop: 80,
  },
  searchBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 12,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 16,
    outlineStyle: "none",
    color: "#eafff3",
  },

  containerRadios: {
    width: "95%",
    flex: 1,
    marginTop: 20,
    borderRadius: 8,
  },
  listContent: {
    paddingBottom: 120,
  },
});

export default Search;
