import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ParticipeScreen from "../screens/ParticipeScreen"
import HomeScreen from "../screens/Home";
import CategoriaScreen from "../screens/CategoriaScreen";
import CriarEventoScreen from "../screens/CreateEventScreen";

const Stack = createNativeStackNavigator();
export function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "ConVive (Campo Mourão)" }}
        />
        <Stack.Screen
          name="Categoria"
          component={CategoriaScreen}
          //options={({ route }) => ({title: route.params.categoria.name.toUpperCase()})}
          options={{ title: "ConVive (Campo Mourão)" }}
        />
        <Stack.Screen
          name="Participe"
          component={ParticipeScreen}
        />
        <Stack.Screen
          name="Criar"
          component={CriarEventoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}