import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Login from "../Screens/Login";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

const LoginNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style={"light"} />
    </SafeAreaProvider>
  );
};

export default LoginNavigator;
