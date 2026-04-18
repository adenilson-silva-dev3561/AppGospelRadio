import { View, Text, StyleSheet } from "react-native";

function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Rádio Gospel</Text>
        <Text style={styles.subTitle}>
          Ouça rádios e louvores gospel de onde estiver.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0F9D7A",
  },
  containerTitle: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#fff",
  },
});
export default Header;
