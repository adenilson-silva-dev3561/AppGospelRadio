import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/header";
import { LinearGradient } from "expo-linear-gradient";
import GoBack from "../../components/goBack";
import { Feather } from "@expo/vector-icons";

function Search() {
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default Search;
