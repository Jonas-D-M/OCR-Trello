import { Constants } from "expo";
import { Platform } from "react-native";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
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
    due: Date,
    dueReminder: number,
    name: string,
    cardId: string,
    completed: boolean
  ) => {
    const dateObj = new Date(due);
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: `⏰ ${name} moet binnekort klaar zijn!`,
      },
      trigger: {
        seconds: dateObj.setMinutes(dateObj.getMinutes() - dueReminder),
      },
    });
  };
  const cancelNotification = async (notId: string) => {
    await Notifications.cancelScheduledNotificationAsync(notId);
  };
  return { registerAsync, scheduleLocalNotification, cancelNotification };
})();
