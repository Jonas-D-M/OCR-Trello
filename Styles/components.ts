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

export const board = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
});

export const list = StyleSheet.create({
  container: {
    backgroundColor: neutral[300],
    borderRadius: 3,
    marginHorizontal: 8,
    minWidth: 176,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontWeight: "700",
    color: "black",
    marginLeft: 8,
    marginBottom: 16,
    fontSize: 14,
  },
});

export const card = StyleSheet.create({
  container: {
    borderRadius: 3,
    backgroundColor: "white",
    marginHorizontal: 4,
    marginVertical: 2,
    maxWidth: 176,
    paddingVertical: 8,
  },
  title: {
    fontSize: 14,
    marginLeft: 4,
    marginRight: 4,
    fontWeight: "200",
  },
  labelContainer: {
    marginHorizontal: 4,
    flexDirection: "row",
    marginBottom: 8,
  },
  tinyLabel: {
    width: 24,
    height: 12,
    borderRadius: 3,
    marginRight: 4,
  },
});
