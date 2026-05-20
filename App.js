import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import Routes from "./src/routes";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ApiProvider from "./src/contexts/radios";
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ApiProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Routes />
          </SafeAreaView>
        </ApiProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
