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
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={cta.container}>
      {/* <MenuItems /> */}
      <TouchableOpacity
        style={cta.main}
        onPress={() => navigation.navigate("")}
      >
        <Text style={cta.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CTA;
