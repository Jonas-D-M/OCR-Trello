import { Ionicons } from "@expo/vector-icons";
import React, { FunctionComponent } from "react";
import { View, Text, Image } from "react-native";
import { notificationItem } from "../../Styles/components";

interface NotificationItemProps {
  type: string;
  boardName: string;
  cardName: string;
  comment?: string;
  listName?: string;
  avatar?: string;
  fullName?: string;
}

const NotificationItem: FunctionComponent<NotificationItemProps> = ({
  avatar,
  fullName,
  type,
  boardName,
  cardName,
  comment,
  listName,
}) => {
  const CardText = () => {
    switch (type) {
      case "addedToCard":
        return (
          <Text style={notificationItem.textContainer}>
            <Text style={notificationItem.highLight}>{fullName} </Text>
            heeft jou toegevoegd aan de kaart
            <Text style={notificationItem.highLight}> {cardName} </Text>
            op
            <Text style={notificationItem.highLight}> {boardName} </Text>
          </Text>
        );
      case "changeCard":
        return (
          <Text style={notificationItem.textContainer}>
            <Text style={notificationItem.highLight}>{fullName}</Text> heeft de
            kaart <Text style={notificationItem.highLight}>{cardName} </Text>
            verplaatst naar
            <Text style={notificationItem.highLight}> {listName} </Text>
            <Text style={notificationItem.highLight}>{boardName}</Text>
          </Text>
        );
      case "commentCard":
        return (
          <View>
            <Text style={notificationItem.textContainer}>
              <Text style={notificationItem.highLight}>{fullName}</Text> heeft
              een opmerking geplaatst op de kaart{" "}
              <Text style={notificationItem.highLight}> {cardName} </Text> op
              <Text style={notificationItem.highLight}> {boardName}</Text>
            </Text>
            <View style={notificationItem.commentContainer}>
              <Text style={notificationItem.comment}>{comment}</Text>
            </View>
          </View>
        );
      case "cardDueSoon":
        return (
          <View style={notificationItem.dueSoonContainer}>
            <Ionicons
              style={notificationItem.avatar}
              size={32}
              name="ios-time-outline"
            />
            <Text>
              {cardName} op {boardName} is vervallen
            </Text>
          </View>
        );
      default:
        return <></>;
    }
  };

  return (
    <View style={notificationItem.main}>
      {avatar && (
        <Image
          style={notificationItem.avatar}
          source={{ uri: `${avatar}/170.png` }}
        />
      )}
      <CardText />
    </View>
  );
};

export default NotificationItem;
