import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthContext";
import { WrapperMainStack } from "./MainStack";
import { AuthStackScreens } from "./AuthStack";
import { Center } from "../components/Center";
import { ActivityIndicator } from "react-native";

export const Routes: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const { user, checkUser } = React.useContext(AuthContext);

  useEffect(() => {
    checkUser().finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#007BFF" />
      </Center>
    );
  }

  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: "#007BFF",
          background: "#FFF",
          card: "#FFF",
          text: "#262626",
          border: "lightgrey",
          notification: "white",
        },
      }}
    >
      {user?.isLogged ? <WrapperMainStack /> : <AuthStackScreens />}
    </NavigationContainer>
  );
};
