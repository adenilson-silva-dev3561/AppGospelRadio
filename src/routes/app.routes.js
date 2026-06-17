import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import home from "../page/home";

import { Feather } from "@expo/vector-icons";
import Favorites from "../page/favorites";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Player from "../page/playerScreen";
import PlayerContent from "../components/PlayerContent";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 0,
          elevation: 6,
        },
        tabBarActiveTintColor: "#e7f7ef",
        tabBarInactiveTintColor: "#b8d9c9",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "700" },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={home}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <Feather
              name="home"
              size={size}
              color={focused ? "#e7f7ef" : "#b8d9c9"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={Favorites}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <Feather
              name="heart"
              size={size}
              color={focused ? "#fa2c2c" : "#b8d9c9"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Player"
        component={Player}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlayerContent"
        component={PlayerContent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppRoutes;
