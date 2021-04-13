import { useRoute } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Text } from "react-native";

import { header } from "../../Styles/components";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../Utils/colors";
import { theme } from "../../Styles/colors";

interface HeaderProps {
  navigation: any;
  options: any;
  backButton?: boolean;
}

const Header: FunctionComponent<HeaderProps> = ({
  navigation,
  options,
  backButton = true,
}) => {
  const route = useRoute();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        ...header.container,
        backgroundColor:
          route.name === "Board"
            ? colors.darkenHex(options.color, -0.4)
            : theme["blue-100"],
      }}
    >
      {backButton && (
        <TouchableOpacity
          style={{ ...header.actionContainer }}
          onPress={goBack}
        >
          <Ionicons name="arrow-back" size={28} style={header.icon} />
        </TouchableOpacity>
      )}
      <View style={header.titleContainer}>
        <Text style={header.title}>{options.title}</Text>
      </View>
      <StatusBar
        style={"light"}
        backgroundColor={
          route.name === "Board"
            ? colors.darkenHex(options.color, -0.5)
            : theme["blue-100"]
        }
      />
    </View>
  );
};

export default Header;
