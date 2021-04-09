import { Share } from "react-native";
import * as Permissions from "expo-permissions";
import { ImagePicker } from "expo";
import uuid from "uuid";
import Clipboard from "expo-clipboard";

import firebase from "../Utils/firebase";
import Environment from "../config/environment";

export default (function () {
  let googleResponse: string, image: string;

  const sendImageToGoogle = async (image: any) => {
    try {
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

      const response = await fetch(
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
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImageToFirebase = async (uri: string) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob: any = await new Promise((resolve, reject) => {
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

  const handleImagePicked = async (pickerResult: any) => {
    try {
      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageToFirebase(pickerResult.uri);
        return uploadUrl;
      }
    } catch (e) {
      alert("Upload failed, sorry :(");
    }
  };

  const pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
    });
    handleImagePicked(pickerResult);
  };

  const takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
    });
    handleImagePicked(pickerResult);
  };

  const copyToClipBoard = () => {
    if (googleResponse) {
      Clipboard.setString(googleResponse);
      alert("Copied image URL to clipboard");
    } else {
      alert("First upload an image");
    }
  };
  const share = () => {
    if (image) {
      Share.share({
        message: image,
        title: "My notes",
        url: image,
      });
    } else {
      alert("No image to share");
    }
  };

  const askPermissions = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  return {
    sendImageToGoogle,
    askPermissions,
    pickImage,
    takePhoto,
    copyToClipBoard,
    share,
  };
})();
