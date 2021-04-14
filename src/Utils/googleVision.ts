import { Share } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import uuid from "uuid";
import Clipboard from "expo-clipboard";

import firebase from "./firebase";
import Environment from "../config/environment";
import axios from "axios";

export default (function () {
  let googleResponse: string, image: string;

  const sendImageToGoogle = async (image: any) => {
    console.log("sending image to google");

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

    return await axios
      .post(
        "https://eu-vision.googleapis.com/v1/images:annotate?key=" +
          Environment["GOOGLE_CLOUD_VISION_API_KEY"],
        body,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(({ data }) => {
        return data;
      })
      .catch((e) => {
        console.error(e);
        return null;
      });
  };

  const uploadImageToFirebase = async (uri: string) => {
    console.log("uploading image to firebase");

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
    console.log("handling picked image");
    try {
      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageToFirebase(pickerResult.uri);
        const scannedFile = await sendImageToGoogle(uploadUrl);
        return scannedFile;
      }
    } catch (e) {
      alert("Upload failed, sorry :(");
    }
  };

  const pickImage = async () => {
    console.log("picking image");

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [9, 16],
    });
    handleImagePicked(pickerResult);
  };

  const scanImage = async () => {
    console.log("scanning image");
    // const tempUrl =
    //   "https://firebasestorage.googleapis.com/v0/b/sad-project-4f5e7.appspot.com/o/171527385_809662072983091_1500622622613311676_n.jpg?alt=media&token=2f51e2b2-8fb5-4755-b180-901729caaa6c";
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [9, 16],
    });
    return await handleImagePicked(pickerResult)
      .then((value) => value)
      .catch((e) => null);
    // return await sendImageToGoogle(tempUrl)
    //   .then((value) => {
    //     return value;
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //     return null;
    //   });
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

  const createCardsFromPicture = async () => {
    const data = await scanImage();
    const string = data.responses[0].textAnnotations[0].description;
    return string;
  };

  return {
    // askPermissions,
    pickImage,
    createCardsFromPicture,
  };
})();
