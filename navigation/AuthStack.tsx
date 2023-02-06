import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParams } from "./types/AuthStackParams";
import { LoginScreen } from "../screens/LoginScreen";

const AuthStack = createNativeStackNavigator<AuthStackParams>();

export const AuthStackScreens: React.FC = () => (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);
