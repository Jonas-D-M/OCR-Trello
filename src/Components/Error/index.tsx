import React, { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { dissableError, toggleError } from "../../Redux/Actions";
import { error } from "../../Styles/components";

const Error = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const { ui } = useSelector((state) => state);

  const discardError = () => {
    dispatch(dissableError());
  };

  return (
    <TouchableOpacity onPress={discardError} style={error.container}>
      <Text style={error.text}>Woops something went wrong 😕</Text>
    </TouchableOpacity>
  );
};

export default Error;
