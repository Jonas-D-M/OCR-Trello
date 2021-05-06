import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Text, Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { addNewCard } from "../../Redux/Actions";
import { newCard } from "../../Styles/components";

interface NewCardInputProps {
  background?: string;
  title: string;
}

const NewCardInput: FunctionComponent<NewCardInputProps> = ({
  background,
  title,
}) => {
  const [focussed, setFocussed] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  return (
    <View style={[newCard.main, { backgroundColor: background }]}>
      <View style={newCard.card}>
        <Text style={newCard.title}>{title}</Text>
        <TextInput
          multiline={true}
          placeholder={"Omschrijving"}
          onEndEditing={Keyboard.dismiss}
          style={[newCard.input, focussed ? newCard.inputFocus : undefined]}
          onFocus={() => setFocussed(true)}
          onBlur={() => setFocussed(false)}
          value={value}
          onChangeText={(desc) => {
            setValue(desc);
            dispatch(addNewCard({ title, desc }));
          }}
        />
      </View>
    </View>
  );
};

export default NewCardInput;
