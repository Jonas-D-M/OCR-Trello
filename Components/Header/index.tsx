import { StatusBar } from "expo-status-bar";
import React, { FunctionComponent, useState } from "react";
import { View, Text } from "react-native";
import { header } from "../../Styles/components";
import colors from "../../Utils/colors";

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
  const [backBtn, setBackBtn] = useState(backButton);
  const [nav, setNav] = useState(navigation);

  return (
    <View
      style={{
        ...header.container,
        // backgroundColor: colors.darkenHex("#0079BF", -0.4),
      }}
    >
      <View
        style={{
          ...header.actionContainer,
        }}
      >
        <Text>HALLO</Text>
      </View>
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
