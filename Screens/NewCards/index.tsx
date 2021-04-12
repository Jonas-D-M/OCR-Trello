import { Picker } from "@react-native-picker/picker";
import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NewCardInput from "../../Components/NewCardInput";
import { picker } from "../../Styles/components";
import { container } from "../../Styles/generic";

const Header: FunctionComponent = () => {
  const [selectedValue, setSelectedValue] = useState({ board: "", list: "" });
  const [boardSelected, setBoardSelected] = useState(false);
  const [disabledStyle, setDisabledStyle] = useState<any>(picker.itemDisabled);

  useEffect(() => {
    if (selectedValue.board) {
      setBoardSelected(true);
      setDisabledStyle({});
    }
  }, [selectedValue]);

  return (
    <View style={picker.header}>
      <View style={picker.container}>
        <Text style={picker.title}>Bord</Text>
        <Picker
          mode="dialog"
          prompt="Kies bord"
          style={picker.picker}
          selectedValue={selectedValue.board}
          onValueChange={(value) => {
            setSelectedValue({ ...selectedValue, board: value.toString() });
          }}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <View style={picker.divider} />
      </View>

      <View style={picker.container}>
        <Text style={picker.title}>Lijst</Text>
        <Picker
          mode="dialog"
          prompt="Kies lijst"
          style={picker.picker}
          enabled={boardSelected}
          selectedValue={selectedValue.list}
          onValueChange={(value) => {
            setSelectedValue({ ...selectedValue, list: value.toString() });
          }}
          itemStyle={disabledStyle}
        >
          <Picker.Item label="Kies lijst" value="java" />
        </Picker>
        <View style={picker.divider} />
      </View>
    </View>
  );
};

const NewCards = ({ route }: any) => {
  const titles = route.params;
  return (
    <SafeAreaView style={container.main}>
      <Header />
      <NewCardInput background={"blue"} title={"testcard"} />
    </SafeAreaView>
  );
};

export default NewCards;
