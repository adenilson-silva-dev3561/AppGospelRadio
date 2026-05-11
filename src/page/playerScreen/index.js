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
import { useEffect, useState } from "react";
import { useAudioPlayer } from "expo-audio";

function Player({ route }) {
  const { radio, autoPlay } = route.params;

  const [isPlaying, setIsPlaying] = useState(false);

  const streamUrl = radio.url_resolved || radio.url;

  const player = useAudioPlayer({
    uri: streamUrl,
  });

  useEffect(() => {
    if (autoPlay && streamUrl) {
      player.play();
      setIsPlaying(true);
    }
  }, []);

  function handlePlayPause() {
    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
      return;
    } else {
      player.play();
      setIsPlaying(true);
    }
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
        {/* aqui pode ser um header comnome da emissora */}

        <LinearGradient
          colors={["#154136", "#154136", "#0a221c"]}
          start={{ x: 0.6, y: 0 }}
          end={{ x: 0.6, y: 1 }}
          style={styles.areaLogo}
        >
          <Feather name="radio" size={100} color={"#fff"} />
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff" }}>
            {radio.name?.substring(0, 8)}
          </Text>

          <Text style={{ fontSize: 18, fontWeight: "100", color: "#fff" }}>
            O Som da Vida.
          </Text>

          <View style={styles.aoVivo}>
            <Feather name="radio" size={20} color={"#ff0000"} />
            <Text style={{ color: "#fff", fontWeight: "300", marginLeft: 8 }}>
              AO VIVO
            </Text>
          </View>
        </LinearGradient>

        <Text style={styles.titleMusic}>Felipe Rodrigues - Tudo é Perda.</Text>
        <Text style={styles.textTransmitindo}>Transmitindo agora</Text>

        <View style={styles.reaButtons}>
          <TouchableOpacity>
            <Feather name="heart" size={40} color={"#fa2c2c"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPlay} onPress={handlePlayPause}>
            <Feather
              name={isPlaying ? "play" : "pause"}
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
    borderRadius: 20,
    elevation: 10,
  },

  aoVivo: {
    width: "50%",
    height: 20,
    borderRadius: 20,
    marginTop: 20,
    flexDirection: "row",
    paddingLeft: 8,
    elevation: 10,
    backgroundColor: "#000",
  },

  titleMusic: {
    fontSize: 20,
    color: "#fff",
    marginTop: 30,
    marginBottom: 10,
  },
  textTransmitindo: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "300",
    color: "#424141",
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
});

export default Player;
