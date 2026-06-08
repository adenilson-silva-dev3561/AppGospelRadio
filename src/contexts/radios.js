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
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const player = useAudioPlayer();
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    async function loadFavoriteRadios() {
      try {
        const storedFavorites = await AsyncStorage.getItem("@favoritesRadios");
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          setFavoriteRadios(parsedFavorites);
        }
      } catch (err) {
        console.log("Erro ao carregar rádios favoritas", err);
      }
    }

    loadFavoriteRadios();
  }, []);

  useEffect(() => {
    async function saveFavoriteRadios() {
      try {
        await AsyncStorage.setItem(
          "@favoritesRadios",
          JSON.stringify(favoriteRadios),
        );
      } catch (err) {
        console.log("Erro ao salvar rádios favoritas", err);
      }
    }

    if (favoriteRadios.length > 0) {
      saveFavoriteRadios();
    }
  }, [favoriteRadios]);

  useEffect(() => {
    async function setupAudio() {
      try {
        await setAudioModeAsync({
          shouldPlayInBackground: true,
        });
      } catch (err) {
        console.log("Erro ao configurar áudio", err);
      }
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
    } else if (radio) {
      setFavoriteRadios([...favoriteRadios, radio]);
    }
  }

  async function radiosApi() {
    setLoading(true);
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
      const isCatholic = text.includes("catholic") || text.includes("catolica");
      return isBrazil && isGospelOrEvangelical && !isCatholic;
    }

    try {
      const response = await api.get(path, { params: query });
      setRadios(response.data.filter(isEvangelicalRadio));
      setLoading(false);
      return;
    } catch (err) {}

    try {
      const url = `${api.defaults.baseURL}${path}?${params}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`fetch status ${res.status}`);
      const data = await res.json();
      setRadios(data.filter(isEvangelicalRadio));
      setLoading(false);
    } catch (fetchErr) {
      setLoading(false);
    }
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

  // Volume control: try multiple APIs depending on player implementation
  async function setPlayerVolume(value) {
    const v = Math.max(0, Math.min(1, value));
    setVolume(v);

    try {
      if (!player) return;

      // common method names across different player implementations
      if (typeof player.setVolume === "function") {
        await player.setVolume(v);
        return;
      }

      if (typeof player.setVolumeAsync === "function") {
        await player.setVolumeAsync(v);
        return;
      }

      // expo-av style underlaying sound object
      if (player.sound && typeof player.sound.setVolumeAsync === "function") {
        await player.sound.setVolumeAsync(v);
        return;
      }

      if (player._sound && typeof player._sound.setVolumeAsync === "function") {
        await player._sound.setVolumeAsync(v);
        return;
      }

      console.log("setPlayerVolume: setVolume API not found on player");
    } catch (e) {
      console.log("Erro ao ajustar volume:", e);
    }
  }

  function increaseVolume(step = 0.1) {
    setPlayerVolume((volume || 0) + step);
  }

  function decreaseVolume(step = 0.1) {
    setPlayerVolume((volume || 0) - step);
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

        // volume controls
        volume,
        setPlayerVolume,
        increaseVolume,
        decreaseVolume,
        loading,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
}

export default ApiProvider;
