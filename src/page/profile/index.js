import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

function Profile() {
  return (
    <LinearGradient
      colors={["#0F9D7A", "#02241c", "#000000"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View style={styles.areaInfo}>
        <TouchableOpacity style={styles.areaAvatar} activeOpacity={0.8}>
          <Image
            style={styles.avatar}
            source={require("../../../assets/avatar.png")}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, color: "#fff" }}>
          Adenilso Rosa Da Silva
        </Text>
        <Text style={{ fontSize: 20, color: "#fff", fontStyle: "italic" }}>
          adenilsontosa@gmail.com
        </Text>

        <TouchableOpacity style={styles.buttonLogOut}>
          <Text style={{ color: "#fff" }}>Sair</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  areaInfo: {
    width: "80%",
    padding: 4,
    alignItems: "center",
    marginTop: "40%",
  },
  areaAvatar: {
    width: 170,
    height: 170,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    backgroundColor: "#ebe6e6",
  },

  avatar: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },

  buttonLogOut: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#99f1af",
    backgroundColor: "transparent",
  },
});
export default Profile;
