import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground } from "react-native";

import List from "../../Components/List";
import { board } from "../../Styles/components";
import { IBoard } from "../../Types/boards";
import { IList } from "../../Types/lists";
import trello from "../../Utils/trello";

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
    const getLists = async () => {
      const lists = await trello.lists(boardObject.id);
      if (lists) {
        setLists(lists);
      }
    };
    if (boardObject) {
      getLists();
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

export default Board;
