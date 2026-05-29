import React, { createContext, useEffect, useState } from "react";
import { useAudioPlayer, setAudioModeAsync } from "expo-audio";
import { api } from "../services/api";

export const ContextApi = createContext([]);

function ApiProvider({ children }) {
  const [radios, setRadios] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [currentRadio, setCurrentRadio] = useState(null);
  const [input, setInput] = useState("");

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
        input,
        setInput,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
}

export default ApiProvider;
