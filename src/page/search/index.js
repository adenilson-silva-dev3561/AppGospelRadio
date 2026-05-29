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
import { ContextApi } from "../../contexts/radios";
import { useContext, useState } from "react";

function Search() {
  const { radios } = useContext(ContextApi);
  const [radioSearch, setRadioSearch] = useState([]);
  const [input, setInput] = useState("");

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
      colors={["#0F9D7A", "#02241c", "#000000"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <GoBack />

      <View style={styles.areaInput}>
        <TextInput
          value={input}
          onChangeText={handleSearch}
          style={styles.input}
          placeholder="Bucar por uma radio..."
          placeholderTextColor={"#969393"}
        />
      </View>
      <View style={styles.containerRadios}>
        <FlatList
          data={input ? radioSearch : radios}
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
    outlineStyle: "none",
  },

  containerRadios: {
    width: "95%",
    flex: 1,
    marginTop: 20,
    borderRadius: 4,
  },
});

export default Search;
