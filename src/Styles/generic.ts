import { StyleSheet } from "react-native";
import { theme } from "./colors";

export const container = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  login: {
    backgroundColor: theme["blue-200"],
    justifyContent: "space-around",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
});
