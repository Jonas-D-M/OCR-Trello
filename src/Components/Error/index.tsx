import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { toggleError } from "../../Redux/Actions";
import { error } from "../../Styles/components";

const Error = () => {
  const dispatch = useDispatch();
  const discardError = () => {
    console.log("discard error");
    dispatch(toggleError());
  };
  return (
    <TouchableOpacity onPress={discardError} style={error.container}>
      <Text style={error.text}>Woops something went wrong 😕</Text>
    </TouchableOpacity>
  );
};

export default Error;
