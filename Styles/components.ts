import { Dimensions, StyleSheet } from "react-native";
import { theme } from "./colors";

export const button = StyleSheet.create({
  default: {
    backgroundColor: theme["blue-100"],
    color: "#FFF",
  },
});

export const imageStyle = StyleSheet.create({
  logo: {
    height: 100,
    width: Dimensions.get("screen").width - 32,
  },
});
