import * as React from "react";
import { useRef } from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { Messages } from "../hooks/useMessages";
import { MessageItem } from "./Items/MessageItem";

export const MessageList = (
  props: ScrollViewProps & { messages: Messages | [] }
) => {
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <ScrollView
      {...props}
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef?.current?.scrollToEnd({ animated: false })
      }
    >
      {props.messages.map((item, id) => {
        return (
          <MessageItem key={id} message={item} isImSender={!item.isReceived} />
        );
      })}
    </ScrollView>
  );
};

export default MessageList;
