import React, { useEffect, useState } from "react";
import {} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { enableScreens } from "react-native-screens";

import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

import Login from "./Screens/Login";
import localStorage from "./Utils/localStorage";
import Home from "./Screens/Home";
import Board from "./Screens/Board";
import NewCards from "./Screens/NewCards";
import { theme } from "./Styles/colors";
import Header from "./Components/Header";

enableScreens();
const Stack = createStackNavigator();

function App() {
  const renderCustomHeader = {
    header: ({ scene, navigation }: any) => {
      const { options } = scene.descriptor;
      return <Header navigation={navigation} options={options} />;
    },
  };

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
  }, [token]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!loggedIn && (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        )}
        {loggedIn && (
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ ...renderCustomHeader, title: "Borden" }}
            />
            <Stack.Screen
              name="Board"
              component={Board}
              options={{ ...renderCustomHeader }}
            />
            <Stack.Screen
              name="NewCards"
              component={NewCards}
              options={{ ...renderCustomHeader, title: "Kaarten toevoegen" }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <StatusBar style={"light"} backgroundColor={"#2A6AA6"} />
    </SafeAreaProvider>
  );
}

export default App;
