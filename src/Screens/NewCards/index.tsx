import { Picker } from "@react-native-picker/picker";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NewCardInput from "../../Components/NewCardInput";
import { carousel, picker } from "../../Styles/components";
import { container } from "../../Styles/generic";
import { useNavigation } from "@react-navigation/core";
import Pagination from "../../Components/Pagination";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { theme } from "../../Styles/colors";
import { useSelector } from "react-redux";
import AxiosInstance from "../../Utils/axios";
import { IList } from "../../Types/lists";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Header: FunctionComponent = () => {
  const [selectedValue, setSelectedValue] = useState({ board: "", list: "" });
  const [enabled, setEnabled] = useState(false);
  const [possibleBoards, setPossibleBoards] = useState([
    {
      label: "Kies bord",
      value: "",
    },
  ]);

  const [possibleLists, setPossibleLists] = useState([
    { label: "Kies lijst", value: "" },
  ]);
  const [disabledStyle, setDisabledStyle] = useState<any>(picker.itemDisabled);

  // @ts-ignore
  const { boards } = useSelector((state) => state.boards);

  useEffect(() => {
    if (possibleBoards.length === 1) {
      boards.forEach((item: any) => {
        const newItem = { label: item.name, value: item.id };
        setPossibleBoards((pb) => [...pb, newItem]);
      });
    }
  }, [boards]);

  useEffect(() => {
    const fetchPossibleLists = async () => {
      AxiosInstance.get<Array<IList>>(`/boards/${selectedValue.board}/lists`, {
        params: {},
      })
        .then(({ data }) => {
          data.forEach((list) => {
            const newItem = { label: list.name, value: list.id };
            setPossibleLists((pl) => [...pl, newItem]);
          });
        })
        .catch((e) => {
          console.error(e);
        });
    };
    if (selectedValue.board) {
      setPossibleLists([{ label: "Kies lijst", value: "" }]);
      fetchPossibleLists();
      setEnabled(true);
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
          {possibleBoards.map((board, index) => (
            <Picker.Item key={index} label={board.label} value={board.value} />
          ))}
        </Picker>
        <View style={picker.divider} />
      </View>

      <View style={picker.container}>
        <Text style={picker.title}>Lijst</Text>
        <Picker
          mode="dialog"
          prompt="Kies lijst"
          style={picker.picker}
          enabled={enabled}
          selectedValue={selectedValue.list}
          onValueChange={(value) => {
            setSelectedValue({ ...selectedValue, list: value.toString() });
          }}
        >
          {possibleLists.map((list, index) => (
            <Picker.Item key={index} label={list.label} value={list.value} />
          ))}
        </Picker>
        <View style={picker.divider} />
      </View>
    </View>
  );
};

const NewCards = ({ route }: any) => {
  const params = route.params;

  const [index, setIndex] = useState(0);
  const [endReached, setEndReached] = useState(false);
  const indexRef = useRef(index);
  indexRef.current = index;

  const titles = [
    "ask for feedback",
    "test app",
    "Add cards",
    "show to martijn",
  ];

  useEffect(() => {
    if (index + 1 === titles.length) {
      setEndReached(true);
    } else {
      setEndReached(false);
    }
  }, [index]);

  const renderItem = useCallback(function renderItem({ item }) {
    return <NewCardInput background={theme["blue-100"]} title={item} />;
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((s) => String(s), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };

  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);
    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;
    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  return (
    // <SafeAreaView style={container.main}>
    <ScrollView contentContainerStyle={container.main}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
        <Header />
        <FlatList
          data={titles}
          renderItem={renderItem}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={onScroll}
          {...flatListOptimizationProps}
          contentContainerStyle={carousel.container}
        />
      </KeyboardAvoidingView>
      <Pagination length={titles.length} activePage={index} />
      {endReached && <Button title={"kaarten toevoegen"} onPress={() => {}} />}
    </ScrollView>
    // </SafeAreaView>
  );
};

export default NewCards;
