import { Dimensions, StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import { theme, neutral } from "./colors";

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

export const sections = StyleSheet.create({
  sectionListContainer: {
    flex: 1,
    backgroundColor: neutral[200],
  },

  itemContainer: {
    paddingHorizontal: 16,
    backgroundColor: neutral[200],
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },

  itemSquare: {
    marginRight: 16,
    height: 32,
    width: 32,
    borderRadius: 2,
    backgroundColor: "red",
  },

  itemTitle: {
    fontSize: 16,
  },

  sectionHeader: {
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: neutral[600],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: neutral[100],
  },
});
