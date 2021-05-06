import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { View, Text, RefreshControl } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import NotificationItem from "../../Components/NotificationItem";
import Separator from "../../Components/Separator";
import { INotification } from "../../Types/notifications";
import trello from "../../Utils/trello";

const NotificationOverview: FunctionComponent = ({ route }: any) => {
  // @ts-ignore
  const { user } = useSelector((state) => state);
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState(
    route.params as Array<INotification>
  );

  const fetchNotifications = useCallback(async () => {
    setRefreshing(true);
    const not = (await trello.notifications(
      user.user.id
    )) as Array<INotification>;
    if (not) {
      setNotifications(not);
    }
    setRefreshing(false);
  }, [refreshing]);

  // TODO: fix weird bug that won't allow flatlist to refresh --> probably because flatlist needs to be flex: 1

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NotificationItem
          avatar={item.memberCreator ? item.memberCreator.avatarUrl : undefined}
          fullName={
            item.memberCreator ? item.memberCreator.fullName : undefined
          }
          type={item.type}
          boardName={item.data.board.name}
          cardName={item.data.card.name}
          listName={item.data.list ? item.data.list.name : undefined}
          comment={item.data.text ? item.data.text : undefined}
        />
      )}
      ItemSeparatorComponent={Separator}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchNotifications}
        />
      }
      style={{ flex: 1 }}
      // contentContainerStyle={{ flex: 1 }}
    />
  );
};

export default NotificationOverview;
