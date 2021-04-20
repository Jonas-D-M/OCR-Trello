import { useRoute } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Text } from "react-native";

import { header } from "../../Styles/components";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../Utils/colors";
import { theme } from "../../Styles/colors";
import trello from "../../Utils/trello";
import { useSelector } from "react-redux";

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
  const [hasNotifications, setHasNotifications] = useState(false);
  const [onHomePage, setOnHomePage] = useState(true);
  //@ts-ignore
  const { user } = useSelector((state) => state);

  const fetchNotifications = async () => {
    const not = await trello.notifications(user.user.id);
    if (not) {
    }
  };

  useEffect(() => {
    if (route.name === "Home") {
      setOnHomePage(true);
      fetchNotifications();
    } else {
      setOnHomePage(false);
    }
  }, [route.name]);

  const NotificationButton = () => {
    return (
      <TouchableOpacity
        style={[
          { ...header.actionContainer },
          hasNotifications
            ? header.youHaveNotifications
            : header.noNotifications,
        ]}
        onPress={() => navigation.navigate("Notifications")}
      >
        <Ionicons
          name="ios-notifications-outline"
          size={24}
          style={header.bell}
        />
      </TouchableOpacity>
    );
  };

  const BackButton = () => {
    return (
      <TouchableOpacity style={{ ...header.actionContainer }} onPress={goBack}>
        <Ionicons name="arrow-back" size={24} style={header.icon} />
      </TouchableOpacity>
    );
  };

  const Title = () => {
    return (
      <View style={header.titleContainer}>
        <Text style={header.title}>{options.title}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        ...header.container,
        backgroundColor:
          route.name === "Board"
            ? colors.darkenHex(options.color, -0.4)
            : theme["blue-100"],
        justifyContent: route.name !== "Home" ? "flex-start" : "space-between",
      }}
    >
      {backButton && <BackButton />}
      <Title />

      {onHomePage && <NotificationButton />}

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
