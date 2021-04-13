import React, { FunctionComponent } from "react";
import { View, Text } from "react-native";
import { dot } from "../../Styles/components";

interface DotProps {
  active?: boolean;
}

const Dot: FunctionComponent<DotProps> = ({ active }) => {
  return <View style={[dot.dot, active ? dot.active : {}]} />;
};

export default Dot;
