import React, { createContext, useEffect, useState } from "react";
import { useAudioPlayer, setAudioModeAsync } from "expo-audio";
import { api } from "../services/api";
import Player from "../page/playerScreen";
import { useAudioPlayer } from "expo-audio";

export const ContextApi = createContext({});

function ApiProvider({ children }) {
<<<<<<< HEAD
  const [radios, setRadios] = useState([]);
=======
  const [radios, setRadios] = useState([{}]);
>>>>>>> 13d4af0d05cfb7aca584ed80c5b0b78ca7619d72
  const [playing, setPlaying] = useState(false);
  const [currentRadio, setCurrentRadio] = useState(null);

  const player = useAudioPlayer();

<<<<<<< HEAD
  useEffect(() => {
    async function setupAudio() {
      await setAudioModeAsync({
        shouldPlayInBackground: true,
      });
    }

    setupAudio();
  }, []);

=======
>>>>>>> 13d4af0d05cfb7aca584ed80c5b0b78ca7619d72
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

<<<<<<< HEAD
      // mesma rádio
=======
      // mesma radio clicada

>>>>>>> 13d4af0d05cfb7aca584ed80c5b0b78ca7619d72
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

<<<<<<< HEAD
      // pausa rádio anterior
=======
>>>>>>> 13d4af0d05cfb7aca584ed80c5b0b78ca7619d72
      player.pause();

      // troca stream
      player.replace({
        uri: url,
      });

<<<<<<< HEAD
=======
      // toca nova
>>>>>>> 13d4af0d05cfb7aca584ed80c5b0b78ca7619d72
      player.play();

      setCurrentRadio(radio);
      setPlaying(true);
    } catch (err) {
<<<<<<< HEAD
      console.log(err);
      alert("Erro ao reproduzir áudio");
    }
  }
  //
=======
      alert("Erro ao reproduzir audio");
    }
  }

>>>>>>> 13d4af0d05cfb7aca584ed80c5b0b78ca7619d72
  return (
    <ContextApi.Provider
      value={{
        radios,
        radiosApi,

<<<<<<< HEAD
=======
        playRadio,

>>>>>>> 13d4af0d05cfb7aca584ed80c5b0b78ca7619d72
        playing,
        setPlaying,

        currentRadio,
<<<<<<< HEAD

        playRadio,
=======
>>>>>>> 13d4af0d05cfb7aca584ed80c5b0b78ca7619d72
      }}
    >
      {children}
    </ContextApi.Provider>
  );
}

export default ApiProvider;
