import React, { useContext, useState, useLayoutEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MainNavProps } from "../navigation/types/MainStackParams";
import { AuthContext } from "../contexts/AuthContext";
import { MessageList } from "../components/MessageList";
import { Button } from "../components/Button";
import { isIphoneX } from "../utils";
import { useMessages } from "../hooks/useMessages";

export const ChatScreen = ({ navigation, route }: MainNavProps<"Chat">) => {
  const [inputValue, setInputValue] = useState("");
  const { logout } = useContext(AuthContext);
  const { messages, sendMessage, isOwner, toggleOwner } = useMessages({
    chatId: route.params.id,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => toggleOwner()}
          title={
            <Ionicons name={isOwner ? "home" : "home-outline"} size={26} />
          }
        />
      ),
    });
  }, [navigation, logout, isOwner]);

  return (
    <View style={{ flex: 1 }}>
      <MessageList messages={messages || []} />

      <View style={styles.accessoryContainer}>
        <TextInput
          multiline
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
          placeholder={"Message"}
          placeholderTextColor={"#9D9FA3"}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => {
            sendMessage(inputValue, messages?.[messages.length - 1].port || "");
            setInputValue("");
          }}
          style={[styles.buttonSend, { opacity: inputValue ? 1 : 0.5 }]}
          disabled={!inputValue}
        >
          <Ionicons name="md-arrow-up" size={18} color={"#FFF"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  accessoryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    borderRadius: 18,
    paddingBottom: Platform.OS === "android" ? 6 : 9,
    paddingTop: Platform.OS === "android" ? 5 : 8,
    paddingHorizontal: 12,
    fontSize: 17,
    flexGrow: 1,
    lineHeight: 20,
    maxHeight: isIphoneX ? 200 : 100,
    minHeight: 36,
    color: "#262626",
    backgroundColor: "#F2F3F5",
  },
  buttonSend: {
    marginLeft: 12,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: "#007BFF",
  },
});
