import React, { useState } from "react";
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

enableScreens();
const Stack = createNativeStackNavigator();

function App() {
  const screenOptions: NativeStackNavigationOptions = { headerShown: false };
  const isLoggedIn = () => {
    if (localStorage.read("@Token")) {
      return true;
    } else {
      return false;
    }
  };

  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          {!loggedIn && <Stack.Screen name="Login" component={Login} />}
          {loggedIn && <Stack.Screen name="Home" component={Home} />}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style={"auto"} />
    </SafeAreaProvider>
  );
}

export default App;
