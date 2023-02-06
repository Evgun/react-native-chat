import { View, ViewProps } from "react-native";

export const Center: React.FunctionComponent<ViewProps> = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
};
