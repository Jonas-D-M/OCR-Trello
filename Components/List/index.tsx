import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { list } from "../../Styles/components";
import { IList } from "../../Types/lists";
import AxiosInstance from "../../Utils/axios";
import Card from "../Card";

interface ListProps {
  object: IList;
}

const List: FunctionComponent<ListProps> = ({ object }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      AxiosInstance.get(`/lists/${object.id}/cards`, { params: {} })
        .then(({ data }) => {
          setCards(data);
        })
        .catch((e) => {
          console.error(e);
        });
    };
    getCards();
  }, []);

  return (
    <ScrollView style={list.container}>
      <Text style={list.title}>{object.name}</Text>
      {cards.map((card, index) => (
        <Card key={index} object={card} />
      ))}
    </ScrollView>
  );
};

export default List;
