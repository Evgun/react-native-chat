import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Message } from "../../hooks/useMessages";
import { format, isToday } from "date-fns";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-root-toast";

interface MessageItemProps {
  isImSender: boolean;
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  isImSender,
  message,
}) => {
  const date = new Date(message.sentAt.date.split(" ").join("T"));

  const today = isToday(date);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(message.content);

    await Toast.show("Copied to Clipboard", {
      duration: Toast.durations.SHORT,
      backgroundColor: "#F0F0F0",
      textColor: "#000",
    });
  };

  return (
    <View
      style={[
        styles.container,
        { justifyContent: isImSender ? "flex-end" : "flex-start" },
      ]}
    >
      <View style={styles.bubbleSize}>
        <TouchableOpacity
          style={[
            styles.bubble,
            { backgroundColor: isImSender ? "#007BFF" : "#F2F3F5" },
          ]}
          onLongPress={copyToClipboard}
        >
          <View style={{ flexShrink: 1 }}>
            <Text
              style={[
                styles.messageText,
                { color: isImSender ? "#FFF" : "#262626" },
              ]}
            >
              {message.content}
            </Text>
          </View>

          <View style={styles.bubbleTime}>
            <Text
              style={[
                styles.bubbleTimeText,
                { color: isImSender ? "#8FC5FF" : "#9D9FA3" },
              ]}
            >
              {today ? format(date, "HH:mm") : format(date, "HH:mm dd/MM/yyyy")}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 6,
    flexDirection: "row",
  },
  memberPicture: {
    paddingRight: 12,
    alignSelf: "flex-end",
  },
  bubble: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "stretch",
    flexWrap: "wrap",
  },
  bubbleSize: {
    maxWidth: "80%",
    flexDirection: "column",
  },
  senderName: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "500",
  },
  messageText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "400",
  },
  bubbleTime: {
    alignSelf: "stretch",
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  bubbleTimeText: {
    position: "relative",
    lineHeight: 18,
    top: 2,
    fontSize: 13,
    paddingLeft: 8,
    fontWeight: "400",
  },
  pictureWrapper: {
    backgroundColor: "#597fab",
    width: 32,
    height: 32,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  pictureLetter: {
    fontWeight: "500",
    fontSize: 12,
    color: "#fff",
  },
});
