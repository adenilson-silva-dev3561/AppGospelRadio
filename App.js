import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import Routes from "./src/routes";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar backgroundColor={"#0F9D7A"} barStyle={"dark-content"} />
          <Routes />
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
