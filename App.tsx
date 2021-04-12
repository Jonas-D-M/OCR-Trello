import React, { useEffect, useState } from "react";
import {} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { enableScreens } from "react-native-screens";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "react-native-screens/native-stack";

import Login from "./Screens/Login";
import localStorage from "./Utils/localStorage";
import Home from "./Screens/Home";
import Board from "./Screens/Board";
import NewCards from "./Screens/NewCards";

enableScreens();
const Stack = createNativeStackNavigator();

function App() {
  const screenOptions: NativeStackNavigationOptions = { headerShown: false };

  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const isLoggedIn = async () => {
      const token = await localStorage.read("@Token");
      if (token) {
        setToken(token);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };
    isLoggedIn();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!loggedIn && (
          <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        )}
        {loggedIn && (
          <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Board" component={Board} />
            <Stack.Screen name="NewCards" component={NewCards} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <StatusBar style={"auto"} />
    </SafeAreaProvider>
  );
}

export default App;
