import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type AuthStackParams = {
  Login: undefined;
};

export type AuthNavProps<T extends keyof AuthStackParams> = {
  navigation: NativeStackNavigationProp<AuthStackParams, T>;
  route: RouteProp<AuthStackParams, T>;
};
