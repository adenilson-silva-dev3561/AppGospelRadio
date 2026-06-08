import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Share } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

import FavoriteToggle from "../favoriteToggle";
import { ContextApi } from "../../contexts/radios";

function PlayerContent({ radio, route }) {
  const [maximized, setMaximized] = useState(true);

  const { currentRadio, playing, playRadio, toggleFavorite, favoriteRadios } =
    useContext(ContextApi);

  const animation = useRef(null);
  const routeRadio = route?.params?.radio;
  const autoPlay = route?.params?.autoPlay;
  const radioToShow = routeRadio || radio || currentRadio;

  const isFavorite = radioToShow
    ? favoriteRadios.some((item) => item.changeuuid === radioToShow.changeuuid)
    : false;

  const isPlaying =
    radioToShow?.stationuuid === currentRadio?.stationuuid && playing;

  useEffect(() => {
    if (isPlaying) {
      animation.current?.play();
    } else {
      animation.current?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!routeRadio || !autoPlay) {
      return;
    }

    const isSameStation = currentRadio?.stationuuid === routeRadio.stationuuid;

    if (!isSameStation || !playing) {
      playRadio(routeRadio);
    }
  }, [routeRadio, autoPlay, currentRadio?.stationuuid, playing]);

  function handlePlayPause() {
    if (!radioToShow) return;
    playRadio(radioToShow);
  }

  async function handleShare() {
    if (!radioToShow) return;

    try {
      const url = radioToShow.urlResolved || radioToShow.url_resolved || "";
      await Share.share({
        message: `${radioToShow.name}${url ? "\n" + url : ""}`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleToggleFavorite() {
    if (!radioToShow) return;
    toggleFavorite(radioToShow.changeuuid);
  }

  if (!radioToShow) {
    return <View style={styles.empty}></View>;
  }

  return (
    <>
      {maximized ? (
        <LinearGradient
          colors={["rgba(39, 38, 38, 0.5)", "rgba(0,0,0,0.9)"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.areaPlayerMinimizado}
        >
          <TouchableOpacity
            style={[styles.IconMinPlayer]}
            onPress={() => setMaximized(!maximized)}
          >
            <Feather name="chevron-up" size={24} color="#000000" />
          </TouchableOpacity>

          <LottieView
            ref={animation}
            source={require("../../../assets/Equalize.json")}
            autoPlay
            loop
            style={[styles.logoAnim, { width: 70, marginLeft: 2 }]}
          />

          <Text
            style={[styles.radioTitle, { width: "55%", textAlign: "center" }]}
            numberOfLines={1}
          >
            {radioToShow.name}
          </Text>

          <TouchableOpacity
            style={[styles.buttonPlay, { width: 50, height: 50 }]}
            onPress={handlePlayPause}
          >
            <Feather
              name={isPlaying ? "pause" : "play"}
              size={25}
              color="#fff"
            />
          </TouchableOpacity>
        </LinearGradient>
      ) : (
        <LinearGradient
          colors={["rgba(250, 250, 250, 0.2)", "rgba(0,0,0,0.9)"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.areaPlayerMaximizado}
        >
          <TouchableOpacity
            style={[styles.IconMinPlayer]}
            onPress={() => setMaximized(!maximized)}
          >
            <Feather name="chevron-down" size={24} color="#000000" />
          </TouchableOpacity>

          <View style={styles.areaLogo}>
            <LottieView
              ref={animation}
              source={require("../../../assets/Live.json")}
              autoPlay
              loop
              style={[styles.logoAnim, { width: 200, height: 200 }]}
            />

            <Text style={styles.radioTitle}>{radioToShow.name}</Text>

            <View style={styles.aoVivo}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>AO VIVO</Text>
            </View>
          </View>

          <Text style={styles.textTransmitindo}>Transmitindo agora</Text>

          <View style={styles.reaButtons}>
            <FavoriteToggle
              size={44}
              isFavorite={isFavorite}
              onToggle={handleToggleFavorite}
            />

            <TouchableOpacity
              style={styles.buttonPlay}
              onPress={handlePlayPause}
            >
              <Feather
                name={isPlaying ? "pause" : "play"}
                size={40}
                color="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
              <Feather name="share-2" size={26} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  areaPlayerMaximizado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f5f42",
    padding: 10,
  },

  areaPlayerMinimizado: {
    width: "100%",
    height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  areaLogo: {
    width: 320,
    borderRadius: 20,
    alignItems: "center",
    padding: 20,
  },

  logoAnim: {
    width: 40,
    height: 40,
  },

  radioTitle: {
    width: "100%",
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

  AreaRadioTocando: {
    width: "100%",
    height: 80,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "stretch",
    padding: 20,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  IconMaxPlayer: {
    width: 35,
    height: 25,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -25,
    backgroundColor: "#ffffff",
  },
  IconMinPlayer: {
    width: 35,
    height: 25,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -25,
    backgroundColor: "#ffffff",
  },
  infoRadioTocando: {
    width: "100%",
    top: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  expandedContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "red",
    alignItems: "center",
  },

  expandedContent: {
    marginTop: 24,
    width: "20%",
    backgroundColor: "red",
    alignItems: "center",
  },

  radioSubtitle: {
    color: "#c9e9d8",
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },

  aoVivoRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fa2c2c",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  reaButtonsExpanded: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 36,
  },

  buttonPlayExpanded: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "#1f5f42",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PlayerContent;
