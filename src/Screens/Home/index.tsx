import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Text, SectionList, Image, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import CTA from "../../Components/CTA";
import Environment from "../../config/environment";
import { addBoards, logOut } from "../../Redux/Actions";
import { sections } from "../../Styles/components";
import { IBoard } from "../../Types/boards";
import trello from "../../Utils/trello";

interface ItemProps {
  object: IBoard;
}

interface BoardsWithStarProps {
  boards: Array<IBoard>;
}

const BoardsWithStar: FunctionComponent<BoardsWithStarProps> = ({ boards }) => {
  useEffect(() => {
    console.log(boards.length);
  }, [boards]);
  return (
    // <View>
    //   <Text style={sections.sectionHeader}>Borden met ster</Text>
    //   {boards.map((board) => (
    //     <TouchableOpacity>

    //     </TouchableOpacity>
    //   ))}
    // </View>
    <></>
  );
};

const Item: FunctionComponent<ItemProps> = ({ object }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Board", {
      title: object.name,
      object,
      color: object.prefs.backgroundColor,
    });
  };

  return (
    <TouchableOpacity style={sections.itemContainer} onPress={handlePress}>
      {!object.prefs.backgroundImage ? (
        <View
          style={[
            sections.itemSquare,
            { backgroundColor: object.prefs.backgroundColor },
          ]}
        />
      ) : (
        <Image
          style={sections.itemSquare}
          source={{ uri: object.prefs.backgroundImageScaled[0].url }}
        />
      )}
      <Text style={sections.itemTitle}>{object.name}</Text>
    </TouchableOpacity>
  );
};

const Home = () => {
  const [data, setData] = useState<any>();
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  //@ts-ignore
  const { user } = useSelector((state) => state);

  const fetchboards = async () => {
    setRefreshing(true);
    const boards = await trello.boards();
    if (boards) {
      dispatch(addBoards(boards));
      setData(trello.groupBoards(boards));
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchboards();
  }, []);

  return (
    <>
      <SectionList
        // ListHeaderComponent={<BoardsWithStar boards={data[1].data} />}
        sections={data}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <Item object={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={sections.sectionHeader}>{title}</Text>
        )}
        refreshing={refreshing}
        onRefresh={fetchboards}
      />
      <CTA />
      <Button
        title="logout"
        onPress={() => {
          dispatch(logOut());
        }}
      />
    </>
  );
};

export default Home;
