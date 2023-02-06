import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { AuthNavProps } from "../navigation/types/AuthStackParams";
import { Button } from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";
import Snackbar from "../components/Snackbar";

export const LoginScreen = ({}: AuthNavProps<"Login">) => {
  const { login, user } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ flex: 1, marginTop: 12 }}>
      <View style={{ alignItems: "center" }}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder={"Email"}
          placeholderTextColor={"#9D9FA3"}
          style={styles.input}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder={"Password"}
          placeholderTextColor={"#9D9FA3"}
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title="Login"
          onPress={() => email && password && login(email, password)}
        />
      </View>
      {user?.error && <Snackbar text="Incorrect credentials" />}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    borderRadius: 2,
    marginBottom: 10,
    paddingHorizontal: 12,
    fontSize: 17,
    flexGrow: 1,
    lineHeight: 20,
    height: 36,
    color: "#262626",
    backgroundColor: "#F2F3F5",
  },
});
