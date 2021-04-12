import { useNavigation } from "@react-navigation/core";
import React, { FunctionComponent, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
} from "react-native";

import { cta } from "../../Styles/components";
import googleVision from "../../Utils/googleVision";

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

  const takePicture = async () => {
    // const string: string = await googleVision.createCardsFromPicture();
    // const tempString = string.split("* ").join("");
    // const titles = tempString.split(/\r?\n/).pop();
    // navigation.navigate("NewCards", { titles });
    navigation.navigate("NewCards");
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
