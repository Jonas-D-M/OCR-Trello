import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Board from "../Screens/Board";
import Home from "../Screens/Home";
import NewCards from "../Screens/NewCards";
import Header from "../Components/Header";
import { useSelector } from "react-redux";
import Loading from "../Screens/Loading";
import NotificationOverview from "../Screens/NotificationOverview";

const Stack = createStackNavigator();

const ApplicationNavigator = () => {
  //@ts-ignore
  const { ui } = useSelector((state) => state);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!ui.loading ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                header: ({ scene, navigation }: any) => {
                  const { options } = scene.descriptor;
                  return (
                    <Header
                      navigation={navigation}
                      options={options}
                      backButton={false}
                    />
                  );
                },
                title: "Borden",
              }}
            />
            <Stack.Screen
              name="Board"
              component={Board}
              options={{
                header: ({ scene, navigation }: any) => {
                  const { options } = scene.descriptor;
                  return (
                    <Header
                      navigation={navigation}
                      options={options}
                      backButton={true}
                    />
                  );
                },
              }}
            />
            <Stack.Screen
              name="NewCards"
              component={NewCards}
              options={{
                header: ({ scene, navigation }: any) => {
                  const { options } = scene.descriptor;
                  return (
                    <Header
                      navigation={navigation}
                      options={options}
                      backButton={true}
                    />
                  );
                },
                title: "Kaarten toevoegen",
              }}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationOverview}
              options={{
                header: ({ scene, navigation }: any) => {
                  const { options } = scene.descriptor;
                  return (
                    <Header
                      navigation={navigation}
                      options={options}
                      backButton={true}
                    />
                  );
                },
                title: "Meldingen",
              }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Loading" component={Loading} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <StatusBar style={"light"} backgroundColor={"#2A6AA6"} />
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;
