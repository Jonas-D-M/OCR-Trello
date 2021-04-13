import { useNavigation } from "@react-navigation/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Text, SectionList, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CTA from "../../Components/CTA";
import { sections } from "../../Styles/components";
import { IBoard } from "../../Types/boards";
import AxiosInstance from "../../Utils/axios";
import endpoints from "../../Utils/endpoints";

interface ItemProps {
  object: IBoard;
}

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

  const getDATA = (boards: Array<IBoard>) => {
    const DATA = [
      {
        title: "Persoonlijke borden",
        data: [],
      },
    ];

    boards.forEach((board, index) => {
      if (board.organization) {
        let exists = DATA.find(
          (item) => item.title === board.organization?.displayName
        );
        if (!exists) {
          //@ts-ignore
          DATA.push({
            title: board.organization?.displayName,
            //@ts-ignore
            data: [board],
          });
        } else {
          const index = DATA.findIndex((obj) => {
            return obj.title === board.organization?.displayName;
          });
          //@ts-ignore
          DATA[index].data.push(board);
        }
      } else {
        // @ts-ignore
        DATA[0].data.push(board);
      }
    });
    return DATA;
  };

  useEffect(() => {
    const fetchBoards = async () => {
      const config = {
        params: {
          fields: "id,name,desc,pinned,url,prefs,starred,membership",
          organization: true,
        },
      };

      AxiosInstance.get<Array<IBoard>>(endpoints.boards, config)
        .then(({ data }) => {
          setData(getDATA(data));
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchBoards();
  }, []);

  return (
    <>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <Item object={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={sections.sectionHeader}>{title}</Text>
        )}
      />
      <CTA />
    </>
  );
};

export default Home;
