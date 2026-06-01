import React, { createContext, useEffect, useState } from "react";
import { useAudioPlayer, setAudioModeAsync } from "expo-audio";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ContextApi = createContext([]);

function ApiProvider({ children }) {
  const [radios, setRadios] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [currentRadio, setCurrentRadio] = useState(null);
  const [favoriteRadios, setFavoriteRadios] = useState([]);
  const [input, setInput] = useState("");

  const player = useAudioPlayer();

  console.log(favoriteRadios);
  useEffect(() => {
    try {
      async function loadFavoriteRadios() {
        const storedFavorites = await AsyncStorage.getItem("@favoritesRadios");
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          setFavoriteRadios(parsedFavorites);
        }
      }
      loadFavoriteRadios();
    } catch (err) {
      console.log("Erro ao carregar rádios favoritas", err);
    }
  }, []);

  useEffect(() => {
    try {
      async function saveFavoriteRadios() {
        await AsyncStorage.setItem(
          "@favoritesRadios",
          JSON.stringify(favoriteRadios),
        );
      }

      saveFavoriteRadios();
    } catch (err) {
      console.log("Erro ao salvar rádios favoritas", err);
    }
  }, [favoriteRadios]);

  useEffect(() => {
    async function setupAudio() {
      await setAudioModeAsync({
        shouldPlayInBackground: true,
      });
    }

    setupAudio();
  }, []);

  function toggleFavorite(radioId) {
    const radio = radios.find((radio) => radio.changeuuid === radioId);

    const isAlreadyFavorite = favoriteRadios.some(
      (favorite) => favorite.changeuuid === radioId,
    );

    if (isAlreadyFavorite) {
      setFavoriteRadios(
        favoriteRadios.filter((favorite) => favorite.changeuuid !== radioId),
      );
    } else {
      setFavoriteRadios([...favoriteRadios, radio]);
    }
  }

  async function radiosApi() {
    const path = "/json/stations/search";
    const query = {
      tag: "gospel",
      country: "Brazil",
      hidebroken: true,
      limit: 500,
    };

    const params = new URLSearchParams(query).toString();

    function isEvangelicalRadio(radio) {
      const text = `${String(radio.name || "").toLowerCase()} ${String(radio.tags || "").toLowerCase()}`;
      const isBrazil = String(radio.country || "").toLowerCase() === "brazil";
      const isGospelOrEvangelical =
        text.includes("gospel") ||
        text.includes("evangelic") ||
        text.includes("evangélica");
      const isCatholic = text.includes("catholic") || text.includes("catolic");
      return isBrazil && isGospelOrEvangelical && !isCatholic;
    }

    try {
      const response = await api.get(path, { params: query });
      setRadios(response.data.filter(isEvangelicalRadio));
      return;
    } catch (err) {}

    try {
      const url = `${api.defaults.baseURL}${path}?${params}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`fetch status ${res.status}`);
      const data = await res.json();
      setRadios(data.filter(isEvangelicalRadio));
    } catch (fetchErr) {}
  }

  async function playRadio(radio) {
    try {
      const url = radio.urlResolved || radio.url_resolved;

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
      player.replace({
        uri: url,
      });

      player.play();

      setCurrentRadio(radio);
      setPlaying(true);
    } catch (err) {
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

        toggleFavorite,
        favoriteRadios,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
}

export default ApiProvider;
