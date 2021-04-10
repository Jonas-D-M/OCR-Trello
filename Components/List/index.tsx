import React, { FunctionComponent } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { list } from "../../Styles/components";
import { IList } from "../../Types/lists";

interface ListProps {
  object: IList;
}

const List: FunctionComponent<ListProps> = ({ object }) => {
  return (
    <ScrollView style={list.container}>
      <Text>{object.name}</Text>
    </ScrollView>
  );
};

export default List;
