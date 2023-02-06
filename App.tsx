import * as React from "react";
import { Routes } from "./navigation/Routes";
import { AuthProvider } from "./contexts/AuthContext";
import { View, AppState } from "react-native";
import { useEffect } from "react";
import RNEventSource from "react-native-event-source";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "./utils/notifications";
import { RootSiblingParent } from "react-native-root-siblings";
import { hubLink } from "./api";

const App = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      const eventSourceGlobal = new RNEventSource(
        hubLink + ".well-known/mercure?topic=notification"
      );

      if (nextAppState.match(/inactive|background/)) {
        eventSourceGlobal.addEventListener("message", (e) => {
          const info = JSON.parse(e.data || "");

          Notifications.scheduleNotificationAsync({
            content: {
              title: info.contact.name,
              body: info.content,
              data: { id: "", title: "" },
            },
            trigger: { seconds: 1 },
          });
        });
      } else if (nextAppState === "active") {
        eventSourceGlobal.close();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <RootSiblingParent>
      <View
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </View>
    </RootSiblingParent>
  );
};

export default App;
