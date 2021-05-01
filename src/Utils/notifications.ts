import { Constants } from "expo";
import { Platform } from "react-native";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

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

  const getSecondsBetweenDates = (startDate: Date, endDate: Date) => {
    return (endDate.getTime() - startDate.getTime()) / 1000;
  };

  const scheduleLocalNotification = async (
    due: string,
    dueReminder: number,
    name: string
  ) => {
    const dateObj = new Date(Date.parse(due));
    console.log("Due date:\t\t", dateObj);
    dateObj.setMinutes(dateObj.getMinutes() - dueReminder);
    console.log("Create notification at:\t", dateObj);
    const seconds = getSecondsBetweenDates(new Date(), dateObj);
    console.log("seconds:\t\t", seconds);

    return await Notifications.scheduleNotificationAsync({
      content: {
        title: `⏰ ${name} moet binnekort klaar zijn!`,
      },
      trigger: {
        seconds,
      },
    });
  };
  const cancelNotification = async (notId: string) => {
    await Notifications.cancelScheduledNotificationAsync(notId);
  };
  const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const testScheduledNotificaton = async () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Time's up!",
        body: "Change sides!",
      },
      trigger: {
        seconds: 30,
      },
    });
  };

  return {
    registerAsync,
    scheduleLocalNotification,
    cancelNotification,
    cancelAllNotifications,
    testScheduledNotificaton,
  };
})();
