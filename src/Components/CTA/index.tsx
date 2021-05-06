import { useNavigation } from "@react-navigation/core";
import React, { FunctionComponent, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  dissableError,
  enableError,
  toggleError,
  toggleLoading,
} from "../../Redux/Actions";

import { cta } from "../../Styles/components";
import googleVision from "../../Utils/googleVision";
import trello from "../../Utils/trello";

const MenuItems: FunctionComponent = () => {
  return (
    <View style={cta.menuItemContainer}>
      <Text style={cta.menuItemText}>Kaart</Text>
      <View style={cta.small}>
        <Text>+</Text>
      </View>
    </View>
  );
};

const CTA = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // todo: actualy display usefull errors
  const takePicture = async () => {
    dispatch(toggleLoading());
    await googleVision
      .createCardsFromPicture()
      .then((titles) => {
        if (titles && titles.length > 0) {
          navigation.navigate("NewCards", { titles });
        }
      })
      .catch((error) => {
        if (error !== "Cancelled") {
          dispatch(enableError());
          setTimeout(() => {
            dispatch(dissableError());
          }, 5000);
        }
      })
      .finally(() => {
        dispatch(toggleLoading());
      });
  };

  return (
    <View style={cta.container}>
      {/* <MenuItems /> */}
      <TouchableOpacity style={cta.main} onPress={takePicture}>
        <Text style={cta.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CTA;
