import React from "react";
import { StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/native";

function FocusAwareStatusBar({
  backgroundColor,
  barStyle,
  translucent,
  hidden,
}) {
  const isFocused = useIsFocused();

  return isFocused ? (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={barStyle}
      translucent={translucent}
      hidden={hidden}
    />
  ) : null;
}

export default FocusAwareStatusBar;
