import React, { useRef, useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { Feather } from "@expo/vector-icons";

export default function FavoriteToggle({ isFavorite, onToggle, size = 48 }) {
  const animationRef = useRef(null);
  const [playingAnim, setPlayingAnim] = useState(false);

  useEffect(() => {
    setPlayingAnim(false);
  }, [isFavorite]);

  function handlePress() {
    setPlayingAnim(true);
    if (typeof onToggle === "function") onToggle();
    animationRef.current?.play();
    setTimeout(() => setPlayingAnim(false), 900);
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.button}
      activeOpacity={0.8}
    >
      {!playingAnim && (
        <Feather
          name="heart"
          size={size}
          color={isFavorite ? "#fa2c2c" : "#dcdcdc"}
        />
      )}

      {playingAnim && (
        <LottieView
          ref={animationRef}
          source={{
            uri: "https://assets4.lottiefiles.com/packages/lf20_touohxv0.json",
          }}
          style={{ width: size, height: size }}
          autoPlay={false}
          loop={false}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
