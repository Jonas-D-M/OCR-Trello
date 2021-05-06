import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Text, Pressable, Platform, StyleSheet } from "react-native";
import { theme } from "../../Styles/colors";
import { button } from "../../Styles/components";

const Ucfirst = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

interface ButtonProps {
  onPress(): void;
  title: string;
  style?: any | any[];
  type?: "default" | "light";
}

const Button: FunctionComponent<ButtonProps> = ({
  onPress,
  title,
  style,
  type = "default",
}) => {
  const [platform] = useState(Platform.OS);

  if (platform === "android") {
    return (
      <Pressable
        onPress={onPress}
        android_ripple={{
          color: type === "default" ? "white" : theme["blue-200"],
        }}
        style={StyleSheet.flatten([
          type === "default" ? button.default : button.light,
          style,
        ])}
      >
        <Text
          style={type === "default" ? button.titleDefault : button.titleLight}
        >
          {title.toUpperCase()}
        </Text>
      </Pressable>
    );
  } else {
    return (
      <Pressable
        onPress={onPress}
        style={StyleSheet.flatten([
          type === "default" ? button.default : button.light,
          style,
        ])}
      >
        <Text
          style={type === "default" ? button.titleDefault : button.titleLight}
        >
          {Ucfirst(title)}
        </Text>
      </Pressable>
    );
  }
};

export default Button;
