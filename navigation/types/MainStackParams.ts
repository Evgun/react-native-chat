import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type MainStackParams = {
  Contacts: undefined;
  Chat: { id: string; name: string };
};

export type MainNavProps<T extends keyof MainStackParams> = {
  navigation: NativeStackNavigationProp<MainStackParams, T>;
  route: RouteProp<MainStackParams, T>;
};
