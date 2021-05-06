import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { list } from "../../Styles/components";
import { IList } from "../../Types/lists";
import AxiosInstance from "../../Utils/axios";
import trello from "../../Utils/trello";
import Card from "../Card";

interface ListProps {
  object: IList;
}

const List: FunctionComponent<ListProps> = ({ object }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      const cards = await trello.cards(object.id);
      if (cards) {
        setCards(cards);
      }
    };
    getCards();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={list.contentContainer}
      style={list.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={list.title}>{object.name}</Text>
      {cards.map((card, index) => (
        <Card key={index} object={card} />
      ))}
    </ScrollView>
  );
};

export default List;
