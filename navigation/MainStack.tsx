import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainStackParams } from "./types/MainStackParams";
import { ContactsScreen } from "../screens/ContactsScreen";
import { ChatScreen } from "../screens/ChatScreen";

const MainStack = createNativeStackNavigator<MainStackParams>();

export const MainStackScreens: React.FC = () => (
  <MainStack.Navigator initialRouteName="Contacts">
    <MainStack.Screen name="Contacts" component={ContactsScreen} />
    <MainStack.Group screenOptions={{ presentation: "modal" }}>
      <MainStack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </MainStack.Group>
  </MainStack.Navigator>
);

export const WrapperMainStack: React.FC = () => {
  return <MainStackScreens />;
};
