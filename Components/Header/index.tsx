import { useRoute } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Text } from "react-native";

import { header } from "../../Styles/components";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

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
  //TODO: set title with redux

  const route = useRoute();

  useEffect(() => {
    console.log(options);
    console.log("navigation: ", navigation);
  }, [navigation]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        ...header.container,
        // backgroundColor: colors.darkenHex("#0079BF", -0.4),
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
      {/* <StatusBar
        style={"light"}
        backgroundColor={colors.darkenHex("#0079BF", -0.5)}
      /> */}
    </View>
  );
};

export default Header;
