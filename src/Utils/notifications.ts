import { Constants, Notifications } from "expo";
import { Platform } from "react-native";
import * as Permissions from "expo-permissions";
import ILocalNotification from "../Types/localNotification";

export default (function () {
  const registerAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
    return token;
  };
  const scheduleLocalNotification = async (
    due: string,
    dueReminder: number,
    name: string,
    cardId: string
  ) => {
    const dateObj = new Date(due);
    console.log(`Creating notification for: ${dateObj}`);
    const localNot: ILocalNotification = {
      title: name,
      body: `⏰ ${name} moet binnekort klaar zijn!`,
    };
    const schedOptions = {
      time: dateObj.setMinutes(dateObj.getMinutes() - dueReminder),
    };
    return await Notifications.scheduleLocalNotificationAsync(
      localNot,
      schedOptions
    )
      .then((id: number) => {
        return { id, cardId, name };
      })
      .catch(() => {
        return { id: "failed", cardId, name };
      });
  };
  const cancelNotification = async (notId: number) => {
    await Notifications.cancelScheduledNotificationAsync(notId);
  };
  return { registerAsync, scheduleLocalNotification, cancelNotification };
})();
