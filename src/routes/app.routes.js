import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import home from "../page/home";

import { Feather } from "@expo/vector-icons";
import profile from "../page/profile";
import Favorites from "../page/favorites";
import Search from "../page/search";
import Profile from "../page/profile";

const Tab = createBottomTabNavigator();
function AppRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        component={home}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Buscar"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppRoutes;
