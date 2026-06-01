import React, { useContext, useEffect, useRef } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
    ? favoriteRadios.some(
        (favorite) => favorite.changeuuid === radio.changeuuid,
      )
    : false;

  useEffect(() => {
    if (playing) {
      animation.current?.play();
    } else {
      animation.current?.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (routeRadio?.stationuuid && route.params?.autoPlay) {
      if (currentRadio?.stationuuid !== routeRadio.stationuuid) {
        playRadio(routeRadio);
      }
    }
  }, [routeRadio?.stationuuid, currentRadio?.stationuuid]);

  function handlePlayPause() {
    const radioToToggle = currentRadio || routeRadio;

    if (!radioToToggle) return;

    playRadio(radioToToggle);
  }

  if (!radio) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: '#fff' }}>Nenhuma rádio selecionada</Text>
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
            resizeMode="cover"
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
            isFavorite={isFavorite}
            onToggle={() => toggleFavorite(radio.changeuuid)}
            size={44}
          />

          <TouchableOpacity style={styles.buttonPlay} onPress={handlePlayPause}>
            <Feather name={playing ? "pause" : "play"} size={40} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Feather name="share-2" size={26} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Feather name="volume-2" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  areaPlayer: {
    height: "72%",
    padding: 18,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  areaLogo: {
    width: 320,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 20,
    elevation: 10,
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  logoAnim: {
    width: 170,
    height: 170,
    marginBottom: 12,
  },

  radioTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    marginTop: 6,
  },

  aoVivo: {
    height: 26,
    borderRadius: 18,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: "rgba(250,44,44,0.95)",
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
    fontWeight: "600",
    fontSize: 12,
  },

  textTransmitindo: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "300",
    color: "#c9e9d8",
    marginTop: 18,
  },

  reaButtons: {
    width: 320,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },

  buttonPlay: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: "#1f5f42",
    elevation: 6,
  },

  iconButton: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
});

export default Player;
