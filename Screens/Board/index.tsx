import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import List from "../../Components/List";
import { board, list } from "../../Styles/components";
import { IBoard } from "../../Types/boards";
import { IList } from "../../Types/lists";
import AxiosInstance from "../../Utils/axios";

const Board = ({ route }: any) => {
  const boardObject: IBoard = route.params;
  const [lists, setLists] = useState<Array<IList>>([]);

  useEffect(() => {
    const getListsOnBoard = async () => {
      AxiosInstance.get<Array<IList>>(`/boards/${boardObject.id}/lists`, {
        params: {},
      })
        .then(({ data }) => {
          setLists(data);
        })
        .catch((e) => {
          console.error(e);
        });
    };
    if (boardObject) {
      getListsOnBoard();
    }
  }, [boardObject]);

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {boardObject.prefs.backgroundImage ? (
        <ImageBackground
          source={{ uri: boardObject.prefs.backgroundImage }}
          style={{ width: "100%", height: "100%" }}
        >
          <FlatList
            style={board.container}
            data={lists}
            renderItem={({ item }) => <List object={item} />}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </ImageBackground>
      ) : (
        <FlatList
          contentContainerStyle={[
            board.container,
            { backgroundColor: boardObject.prefs.backgroundColor },
          ]}
          data={lists}
          renderItem={({ item }) => <List object={item} />}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Board;
