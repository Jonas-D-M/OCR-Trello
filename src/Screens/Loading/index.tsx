import React from "react";
import { View, ActivityIndicator, Button } from "react-native";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../../Redux/Actions";
import { theme } from "../../Styles/colors";
import { loadingScreen } from "../../Styles/components";

const Loading = () => {
  const dispatch = useDispatch();
  return (
    <View style={loadingScreen.main}>
      <ActivityIndicator size="large" color={theme["blue-100"]} />
      <Button
        onPress={() => {
          dispatch(toggleLoading());
        }}
        title={"clear state"}
      />
    </View>
  );
};

export default Loading;
