import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { createContext, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { colors } from "../styles";
import { Subscription } from "@unimodules/core";
import { errorToast } from "../components/Toast";

interface UserContextData {
  expoPushToken: string;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({ children }) => {
  const [expoPushToken, setExpoPushToken] = useState<string>("");

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const [
    notification,
    setNotification,
  ] = useState<Notifications.Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
        console.log("Received notification: ", notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current as Subscription
      );
      Notifications.removeNotificationSubscription(
        responseListener.current as Subscription
      );
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        expoPushToken: expoPushToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  if (!Constants.isDevice) {
    errorToast("Deve ser usado um dispositivo físico para Push Notifications");
    return "";
  }

  const allowNotifications = await getNotificationPermissionStatus();

  if (!allowNotifications) {
    return "";
  }

  let token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: colors.primary,
    });
  }

  return token;
}

async function getNotificationPermissionStatus() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === "granted";
}
