//@ts-nocheck
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import uuid from "uuid";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Clipboard from "expo-clipboard";

import Environment from "./config/environment";
import firebase from "./Utils/firebase";
import trello from "./Utils/trello";
import { WebView } from "react-native-webview";

function App() {
  useEffect(() => {
    // Permissions.askAsync(Permissions.CAMERA);
    // Permissions.askAsync(Permissions.CAMERA_ROLL);
    return () => {};
  }, []);

  const [state, setState] = useState({
    image: null,
    uploading: false,
    googleResponse: null,
  });

  const submitToGoogle = async () => {
    try {
      setState({ ...state, uploading: true });
      let { image } = state;
      let body = JSON.stringify({
        requests: [
          {
            features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
            image: {
              source: {
                imageUri: image,
              },
            },
          },
        ],
      });
      let response = await fetch(
        "https://eu-vision.googleapis.com/v1/images:annotate?key=" +
          Environment["GOOGLE_CLOUD_VISION_API_KEY"],
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: body,
        }
      );
      let responseJson = await response.json();
      console.log(responseJson);
      setState({ ...state, googleResponse: responseJson, uploading: false });
    } catch (error) {
      console.log(error);
    }
  };
  const _handleImagePicked = async (pickerResult) => {
    try {
      setState({ ...state, uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        setState({ ...state, image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      setState({ ...state, uploading: false });
    }
  };
  const _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
    });

    _handleImagePicked(pickerResult);
  };
  const _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
    });

    _handleImagePicked(pickerResult);
  };
  const _copyToClipboard = () => {
    Clipboard.setString(`${state.googleResponse}`);
    alert("Copied image URL to clipboard");
  };
  const _share = () => {
    Share.share({
      message: state.image,
      title: "Check out this photo",
      url: state.image,
    });
  };
  const _maybeRenderImage = () => {
    let { image } = state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}
      >
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: "hidden",
          }}
        >
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>

        <Text
          onLongPress={_share()}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
        >
          {image}
        </Text>
      </View>
    );
  };
  const _maybeRenderUploadingOverlay = () => {
    if (state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };
  const uploadImageAsync = async () => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref().child(uuid.v4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {state.image ? null : (
        <Text
          style={{
            fontSize: 20,
            marginBottom: 20,
            textAlign: "center",
            marginHorizontal: 15,
          }}
        >
          Example: Upload ImagePicker result
        </Text>
      )}

      <Button onPress={_pickImage} title="Pick an image from camera roll" />

      <Button
        title="test auth"
        onPress={async () => {
          const data = await trello.auth();
        }}
      />

      <Button onPress={_takePhoto} title="Take a photo" />

      <Button onPress={() => submitToGoogle()} title="Analyze!" />

      {_maybeRenderImage()}
      {_maybeRenderUploadingOverlay()}

      {state.googleResponse && (
        <Text
          style={{ backgroundColor: "orange" }}
          onPress={_copyToClipboard()}
          onLongPress={_share()}
        >
          {JSON.stringify(state.googleResponse.responses)}
        </Text>
      )}

      <StatusBar barStyle="default" />
    </View>
  );
}

export default App;
