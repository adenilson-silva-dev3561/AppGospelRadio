import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import GoBack from "../../components/goBack";
import { useContext, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { ContextApi } from "../../contexts/radios";

function Player({ route }) {
  const { radio, autoPlay } = route.params;

  const { playRadio, playing, currentRadio } = useContext(ContextApi);

  const animation = useRef(null);

  const isCurrentRadio = currentRadio?.stationuuid === radio.stationuuid;

  // autoplay ao abrir tela
  useEffect(() => {
    if (autoPlay) {
      playRadio(radio);
    }
  }, []);

  // controlar animação
  useEffect(() => {
    if (isCurrentRadio && playing) {
      animation.current?.play();
    } else {
      animation.current?.pause();
    }
  }, [playing, currentRadio]);

  function handlePlayPause() {
    playRadio(radio);
  }

  return (
    <LinearGradient
      colors={["#0F9D7A", "#02241c", "#000000"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <StatusBar backgroundColor={"#0F9D7A"} barStyle={"dark-content"} />

      <GoBack />

      <View style={styles.areaPlayer}>
        <LinearGradient
          colors={["#154136", "#154136", "#0a221c"]}
          start={{ x: 0.6, y: 0 }}
          end={{ x: 0.6, y: 1 }}
          style={styles.areaLogo}
        >
          <LottieView
            source={require("../../../assets/Live.json")}
            style={styles.lottie}
            ref={animation}
            autoPlay
            loop
          />

          <Text style={styles.radioName}>{radio.name}</Text>

          <View style={styles.aoVivo}>
            <Feather name="radio" size={20} color={"#ff0000"} />

            <Text style={styles.textAoVivo}>AO VIVO</Text>
          </View>
        </LinearGradient>

        <Text style={styles.textTransmitindo}>Transmitindo agora</Text>

        <View style={styles.reaButtons}>
          <TouchableOpacity>
            <Feather name="heart" size={40} color={"#fa2c2c"} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonPlay} onPress={handlePlayPause}>
            <Feather
              name={isCurrentRadio && playing ? "pause" : "play"}
              size={40}
              color={"#fff"}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Feather name="share-2" size={40} color={"#fff"} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Feather name="volume-2" size={40} color={"#fff"} />
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
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
  },

  areaLogo: {
    width: 250,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 10,
  },

  aoVivo: {
    width: "50%",
    height: 20,
    borderRadius: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    elevation: 10,
    backgroundColor: "#000",
  },

  textAoVivo: {
    color: "#fff",
    fontWeight: "300",
    marginLeft: 8,
  },

  radioName: {
    fontSize: 30,
    fontWeight: "normal",
    color: "#fff",
    textAlign: "center",
  },

  textTransmitindo: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "300",
    color: "#424141",
    marginTop: 20,
  },

  reaButtons: {
    width: 300,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },

  buttonPlay: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "rgba(30, 71, 51, 0.8)",
  },

  lottie: {
    width: 100,
    height: 100,
  },
});

export default Player;
