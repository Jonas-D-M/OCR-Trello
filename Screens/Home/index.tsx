import React, { useEffect, useState } from "react";
import { View, Text, Button, SectionList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { container } from "../../Styles/generic";
import { IBoard } from "../../Types/boards";
import AxiosInstance from "../../Utils/axios";
import endpoints from "../../Utils/endpoints";
import localStorage from "../../Utils/localStorage";

const Item = ({ title }: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
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
        if (DATA.some((e) => e.title !== board.organization?.displayName)) {
          //@ts-ignore
          DATA.push({ title: board.organization?.displayName, data: board });
        } else {
          // als de org bestaat
          const index = DATA.findIndex((obj) => {
            return obj.title === board.organization?.displayName;
          });
          //@ts-ignore
          DATA[index].data.push(board);
        }
      } else {
        // als er geen org is
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
    // <View style={container.main}>
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Item title={item.organization.displayName} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
    //   <Text>This is... HOME</Text>
    //   <Button
    //     title={"get token"}
    //     onPress={async () => {
    //       console.log(await localStorage.read("@Token"));
    //     }}
    //   />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});

export default Home;
