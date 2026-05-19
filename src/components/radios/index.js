import React, { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useAudioPlayer, setAudioModeAsync } from "expo-audio";

<<<<<<< HEAD
import { Feather } from "@expo/vector-icons";

import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { ContextApi } from "../../contexts/radios";

function Radios({ data }) {
  const [heart, setHeart] = useState(false);

  const navigation = useNavigation();

  const { playRadio } = useContext(ContextApi);

  function favoritar() {
    setHeart(!heart);
  }

  function screenPlayer() {
    playRadio(data);

    navigation.navigate("Player", {
      radio: data,
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerNameRadio}
        onPress={screenPlayer}
      >
        <View style={styles.areaLogo}>
          <Image
            style={styles.logoRadio}
            source={
              data.favicon
                ? { uri: data.favicon }
                : require("../../../assets/iconRadio.png")
            }
          />
        </View>

        <Text>{data.name}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={favoritar}>
        <Feather name="heart" size={30} color={heart ? "red" : "#dcdcdc"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    elevation: 2,
    backgroundColor: "#ffffff",
    padding: 4,
    borderRadius: 10,
    marginTop: 8,
  },

  containerNameRadio: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
  },

  areaLogo: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginRight: 16,
  },

  logoRadio: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default Radios;
=======
export const ContextApi = createContext({});

function ApiProvider({ children }) {
  const [radios, setRadios] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [currentRadio, setCurrentRadio] = useState(null);

  const player = useAudioPlayer();

  useEffect(() => {
    async function setupAudio() {
      await setAudioModeAsync({
        shouldPlayInBackground: true,
      });
    }

    setupAudio();
  }, []);

  async function radiosApi() {
    try {
      const response = await api.get("/stations/search", {
        params: {
          tag: "gospel",
          country: "Brazil",
          hidebroken: true,
          limit: 75,
        },
      });

      setRadios(response.data);
    } catch (err) {
      console.log("Erro ao buscar dados da api: ", err);
    }
  }

  async function playRadio(radio) {
    try {
      const url = radio.urlResolved || radio.url_resolved;

      // mesma rádio
      if (currentRadio?.stationuuid === radio.stationuuid) {
        if (playing) {
          player.pause();
          setPlaying(false);
        } else {
          player.play();
          setPlaying(true);
        }

        return;
      }

      // pausa rádio anterior
      player.pause();

      // troca stream
      player.replace({
        uri: url,
      });

      // toca nova rádio
      player.play();

      setCurrentRadio(radio);
      setPlaying(true);
    } catch (err) {
      console.log(err);
      alert("Erro ao reproduzir áudio");
    }
  }

  return (
    <ContextApi.Provider
      value={{
        radios,
        radiosApi,

        playing,
        setPlaying,

        currentRadio,

        playRadio,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
}

export default ApiProvider;
>>>>>>> 13d4af0d05cfb7aca584ed80c5b0b78ca7619d72
