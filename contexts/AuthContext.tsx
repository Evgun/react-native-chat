import React, { Dispatch, SetStateAction } from "react";
import { ViewProps } from "react-native";
const RCTNetworking = require("react-native/Libraries/Network/RCTNetworking");
import axios from "axios";
import { defaultLink } from "../api";

type User = {
  isLogged: boolean;
  error: boolean;
};

type AuthContextState = {
  login: (a: string, b: string) => void;
  logout: () => void;
  setUserState: Dispatch<SetStateAction<User>>;
  checkUser: () => Promise<boolean>;
  user: User | null;
};

const InitialUserState: User = { isLogged: false, error: false };

const InitialState = {
  login: () => {},
  logout: () => {},
  setUserState: () => {},
  checkUser: (): any => {},
  user: InitialUserState,
};

export const AuthContext = React.createContext<AuthContextState>(InitialState);

export const useUser = (): User | null => {
  const { user } = React.useContext(AuthContext);
  return user;
};

export const AuthProvider: React.FunctionComponent<ViewProps> = ({
  children,
}) => {
  const [userState, setUserState] = React.useState<User>(InitialUserState);

  const checkUser = () => {
    return axios.get(defaultLink + "chat_json/main/").then((resp) => {
      if (resp.data?.conversations) {
        setUserState({ isLogged: true, error: false });
        return true;
      }

      return false;
    });
  };

  const login = React.useCallback(async (email: string, password: string) => {
    const resp = await fetch(defaultLink + "chat/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    if (resp.status === 200) {
      setUserState((prev) => ({ ...prev, isLogged: true }));
    } else {
      setUserState({ isLogged: false, error: true });
    }
  }, []);

  const logout = React.useCallback(async () => {
    setUserState(InitialUserState);
    RCTNetworking.clearCookies(() => {});
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: userState, login, logout, checkUser, setUserState }}
    >
      {children}
    </AuthContext.Provider>
  );
};
