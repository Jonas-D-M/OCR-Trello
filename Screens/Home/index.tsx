import React, { useEffect, useState } from "react";
import { View, Text, SectionList, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { sections } from "../../Styles/components";
import { IBoard } from "../../Types/boards";
import AxiosInstance from "../../Utils/axios";
import endpoints from "../../Utils/endpoints";

const Item = ({ name, background, backgroundImage }: any) => (
  <TouchableOpacity style={sections.itemContainer}>
    {!backgroundImage ? (
      <View style={[sections.itemSquare, { backgroundColor: background }]} />
    ) : (
      <Image
        style={sections.itemSquare}
        source={{ uri: backgroundImage[0].url }}
      />
    )}
    <Text style={sections.itemTitle}>{name}</Text>
  </TouchableOpacity>
);

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
            data: [
              {
                //@ts-ignore
                name: board.name,
                //@ts-ignore
                background: board.prefs.backgroundColor,
                //@ts-ignore
                backgroundImage: board.prefs.backgroundImageScaled,
              },
            ],
          });
        } else {
          const index = DATA.findIndex((obj) => {
            return obj.title === board.organization?.displayName;
          });
          //@ts-ignore
          DATA[index].data.push({
            //@ts-ignore
            name: board.name,
            //@ts-ignore
            background: board.prefs.backgroundColor,
            //@ts-ignore
            backgroundImage: board.prefs.backgroundImageScaled,
          });
        }
      } else {
        // @ts-ignore
        DATA[0].data.push({
          //@ts-ignore
          name: board.name,
          //@ts-ignore
          background: board.prefs.backgroundColor,
          //@ts-ignore
          backgroundImage: board.prefs.backgroundImageScaled,
        });
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
          console.log(getDATA(data));

          setData(getDATA(data));
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchBoards();
  }, []);

  return (
    <SafeAreaView style={sections.sectionListContainer}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            background={item.background}
            backgroundImage={item.backgroundImage}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={sections.sectionHeader}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
