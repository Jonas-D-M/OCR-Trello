import React from "react";
import {} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import Login from "./Screens/Login";

enableScreens();
const Stack = createNativeStackNavigator();

function App() {
  return (
    // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    //   {state.data && (
    //     <Modal transparent={true} visible={showModal}>
    //       <WebView
    //         ref={webviewRef}
    //         style={{ width: windowWidth, height: windowHeight }}
    //         originWhitelist={["*"]}
    //         javaScriptEnabled={true}
    //         domStorageEnabled={true}
    //         source={{
    //           html: state.data,
    //           baseUrl: "https://trello.com",
    //         }}
    //         onNavigationStateChange={(navEvent) => {
    //           console.log("navevent", navEvent.url);
    //           setCurrentUrl(navEvent.url);
    //           if (navEvent.url.search("boards") > -1) {
    //             setShowModal(false);
    //           }
    //         }}
    //         onMessage={(event) => {
    //           if (event.nativeEvent.data) {
    //             setToken(event.nativeEvent.data);
    //             setShowModal(false);
    //           }
    //         }}
    //       />
    //     </Modal>
    //   )}

    //   {state.image ? null : (
    //     <Text
    //       style={{
    //         fontSize: 20,
    //         marginBottom: 20,
    //         textAlign: "center",
    //         marginHorizontal: 15,
    //       }}
    //     >
    //       Example: Upload ImagePicker result
    //     </Text>
    //   )}

    //   {/* <Button onPress={_pickImage} title="Pick an image from camera roll" /> */}

    //   <Button
    //     title="test auth"
    //     onPress={async () => {
    //       const data = await trello.auth();
    //       if (data) {
    //         setShowModal(true);
    //       }
    //       setState({ ...state, data });
    //     }}
    //   />

    //   {/* <Button onPress={_takePhoto} title="Take a photo" />

    //   <Button onPress={() => submitToGoogle()} title="Analyze!" /> */}

    //   {_maybeRenderImage()}
    //   {_maybeRenderUploadingOverlay()}

    //   {state.googleResponse && (
    //     <Text
    //       style={{ backgroundColor: "orange" }}
    //       onPress={_copyToClipboard()}
    //       onLongPress={_share()}
    //     >
    //       {JSON.stringify(state.googleResponse.responses)}
    //     </Text>
    //   )}

    //   <StatusBar barStyle="default" />
    // </View>
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style={"light"} />
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
