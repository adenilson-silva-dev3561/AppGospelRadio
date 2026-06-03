import React, { useContext, useEffect, useRef } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

import GoBack from "../../components/goBack";
import FavoriteToggle from "../../components/favoriteToggle";
import { ContextApi } from "../../contexts/radios";

function Player({ route }) {
  const { currentRadio, playing, playRadio, toggleFavorite, favoriteRadios } =
    useContext(ContextApi);

  const routeRadio = route.params?.radio;
  const radio = routeRadio || currentRadio;
  const animation = useRef(null);

  const isFavorite = radio
    ? favoriteRadios.some((item) => item.changeuuid === radio.changeuuid)
    : false;

  useEffect(() => {
    if (playing) {
      animation.current?.play();
    } else {
      animation.current?.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (!route.params?.autoPlay || !routeRadio) {
      return;
    }

    const isSameStation = currentRadio?.stationuuid === routeRadio.stationuuid;

    if (!isSameStation || !playing) {
      playRadio(routeRadio);
    }
  }, [route.params?.autoPlay, routeRadio, currentRadio?.stationuuid, playing]);

  function handlePlayPause() {
    if (!radio) return;

    playRadio(radio);
  }

  async function handleShare() {
    try {
      const url = radio.urlResolved || radio.url_resolved || "";

      await Share.share({
        message: `${radio.name}${url ? "\n" + url : ""}`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (!radio) {
    return (
      <View style={styles.empty}>
        <Text style={{ color: "#fff" }}>Nenhuma rádio selecionada</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#0F9D7A", "#02241c", "#04120c"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <StatusBar backgroundColor="#0F9D7A" barStyle="light-content" />

      <GoBack />

      <View style={styles.areaPlayer}>
        <LinearGradient
          colors={["#163d2f", "#0b2b20"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.areaLogo}
        >
          <LottieView
            ref={animation}
            source={require("../../../assets/Live.json")}
            autoPlay
            loop
            style={styles.logoAnim}
          />

          <Text style={styles.radioTitle}>{radio.name}</Text>

          <View style={styles.aoVivo}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>AO VIVO</Text>
          </View>
        </LinearGradient>

        <Text style={styles.textTransmitindo}>Transmitindo agora</Text>

        <View style={styles.reaButtons}>
          <FavoriteToggle
            size={44}
            isFavorite={isFavorite}
            onToggle={() => toggleFavorite(radio.changeuuid)}
          />

          <TouchableOpacity style={styles.buttonPlay} onPress={handlePlayPause}>
            <Feather name={playing ? "pause" : "play"} size={40} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
            <Feather name="share-2" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

export default Player;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  areaPlayer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  areaLogo: {
    width: 320,
    borderRadius: 20,
    alignItems: "center",
    padding: 20,
  },

  logoAnim: {
    width: 170,
    height: 170,
  },

  radioTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },

  aoVivo: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fa2c2c",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginRight: 8,
  },

  liveText: {
    color: "#fff",
  },

  textTransmitindo: {
    color: "#c9e9d8",
    marginTop: 20,
  },

  reaButtons: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "space-between",
    width: 280,
  },

  buttonPlay: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: "#1f5f42",
    alignItems: "center",
    justifyContent: "center",
  },

  iconButton: {
    width: 56,
    height: 56,
    borderRadius: 56,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
  },
});
