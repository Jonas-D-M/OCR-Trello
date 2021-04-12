import React, { FunctionComponent } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { newCard } from "../../Styles/components";

interface NewCardInputProps {
  background: string;
  title: string;
}

const NewCardInput: FunctionComponent<NewCardInputProps> = ({
  background,
  title,
}) => {
  return (
    <View style={[newCard.main, { backgroundColor: background }]}>
      <View style={newCard.card}>
        <Text style={newCard.title}>{title}</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder={"Omschrijving"}
        />
      </View>
    </View>
  );
};

export default NewCardInput;
