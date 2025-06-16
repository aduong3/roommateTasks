import { useState, useEffect, useRef } from "react";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import Constants from "expo-constants";

import { Platform, PushNotification } from "react-native";

export interface PushNotificationState {
  notification?: Notifications.Notification;
  expoPushToken?: Notifications.ExpoPushToken;
}

export const usePushNotifications = (): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  async function registerForPushNotificationsAsync() {
    let token;
    try {
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          console.log("existingStatus not granted");
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          console.log("finalStatus not granted");
          alert("Failed to get push token");
        }

        token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas?.projectId,
        });

        if (Platform.OS === "android") {
          Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#55CCFF",
          });
        }
        console.log(token);
        return token;
      } else {
        console.log("ERROR: Please use a physical device.");
      }
    } catch (err) {
      console.log(err.message ?? err);
    }
  }

  useEffect(() => {
    console.log("hook is running");
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener?.current?.remove();
      responseListener?.current?.remove();
    };
  }, []);

  return { expoPushToken, notification };
};
