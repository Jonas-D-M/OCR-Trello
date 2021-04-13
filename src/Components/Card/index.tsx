import React, { FunctionComponent } from "react";
import { View, Text } from "react-native";
import { card } from "../../Styles/components";
import { ICard } from "../../Types/cards";

interface CardProps {
  object: ICard;
}

const Card: FunctionComponent<CardProps> = ({ object }) => {
  return (
    <View style={card.container}>
      {object.labels.length > 0 && (
        <View style={card.labelContainer}>
          {object.labels.map((label, index) => (
            <View
              key={index}
              style={[card.tinyLabel, { backgroundColor: label.color }]}
            />
          ))}
        </View>
      )}
      <Text style={card.title}>{object.name}</Text>
    </View>
  );
};

export default Card;
