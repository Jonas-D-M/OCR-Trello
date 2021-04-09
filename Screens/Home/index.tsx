import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { container } from "../../Styles/generic";
import AxiosInstance from "../../Utils/axios";
import endpoints from "../../Utils/endpoints";
import localStorage from "../../Utils/localStorage";

const Home = () => {
  useEffect(() => {
    const testFetch = async () => {
      const config = {
        params: {
          fields: "name,url",
        },
      };
      console.log("doing request");

      AxiosInstance.get(endpoints.boards, config)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    testFetch();
  }, []);

  return (
    <View style={container.main}>
      <Text>This is... HOME</Text>
      <Button
        title={"Clear storage"}
        onPress={async () => {
          await localStorage.deleteItem("@Token");
        }}
      />
    </View>
  );
};

export default Home;
