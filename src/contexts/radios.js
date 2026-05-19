import React, { createContext, useState } from "react";
import { api } from "../services/api";
import Player from "../page/playerScreen";
import { useAudioPlayer } from "expo-audio";

export const ContextApi = createContext({});

function ApiProvider({ children }) {
  const [radios, setRadios] = useState([{}]);
  const [playing, setPlaying] = useState(false);
  const [currentRadio, setCurrentRadio] = useState(null);

  const player = useAudioPlayer();

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

      // mesma radio clicada

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

      player.pause();

      // troca stream
      player.replace({
        uri: url,
      });

      // toca nova
      player.play();

      setCurrentRadio(radio);
      setPlaying(true);
    } catch (err) {
      alert("Erro ao reproduzir audio");
    }
  }

  return (
    <ContextApi.Provider
      value={{
        radios,
        radiosApi,

        playRadio,

        playing,
        setPlaying,

        currentRadio,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
}

export default ApiProvider;
