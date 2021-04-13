import { useNavigation } from "@react-navigation/core";
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
  const boardObject: IBoard = route.params.object;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
      color: boardObject.prefs.backgroundColor,
    });
  }, []);

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

  return (
    // <SafeAreaView style={styles.container}>
    <>
      {boardObject.prefs.backgroundImage ? (
        <ImageBackground
          source={{ uri: boardObject.prefs.backgroundImage }}
          style={{ width: "100%", height: "100%" }}
        >
          <FlatList
            contentContainerStyle={board.container}
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
    </>
    // </SafeAreaView>
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
