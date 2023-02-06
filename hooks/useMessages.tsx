import axios from "axios";
import { useEffect, useState } from "react";
import RNEventSource from "react-native-event-source";
import { defaultLink, hubLink } from "../api";

export type Contacts = {
  id: string;
  isAnswered: string;
  name: string;
  phone: string;
  sent_at: string;
  isOwner: "0" | "1";
  address: string;
}[];

export type Message = {
  id: number;
  content: string;
  sentAt: {
    date: string;
    timezone: string;
    timezone_type: number;
  };
  status: -1 | 1;
  isReceived: boolean;
  port: string;
};

export type Filter = 0 | 1;

export type Messages = Message[];

export type Hook = {
  chatId?: string;
};

export const useMessages = ({
  chatId,
}: Hook): {
  contacts: Contacts | null;
  messages: Messages | null;
  sendMessage: (a: string, b: string) => void;
  isOwner: boolean;
  toggleOwner: () => void;
  getAllChats: (a: Filter) => void;
} => {
  const [contacts, setContacts] = useState(null);
  const [messages, setMessages] = useState<Messages | null>(null);
  const [sendLink, setSendLink] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    getAllChats();

    if (!!chatId) {
      getAllMessages();
    }
  }, []);

  const getAllChats = async (filter: Filter = 0) => {
    const resp = await axios.get(
      `${defaultLink}chat_json/main?isOwner=${filter}`
    );
    if (resp.data?.conversations) {
      setContacts(resp.data.conversations);

      return;
    }

    setContacts(null);
  };

  const getAllMessages = async () => {
    const resp = await axios.get(`${defaultLink}chat_json/${chatId}`);

    if (resp.data?.messages) {
      setMessages(resp.data.messages);
      setSendLink(resp.data.formAction);
      setIsOwner(resp.data.contact.isOwner);
      return;
    }

    setMessages(null);
  };

  useEffect(() => {
    const eventSource = new RNEventSource(
      `${hubLink}.well-known/mercure?topic=conversation-${chatId}`
    );

    const eventSourceGlobal = new RNEventSource(
      hubLink + ".well-known/mercure?topic=notification"
    );

    eventSourceGlobal.addEventListener("message", () => {
      getAllChats();
    });

    if (!!chatId) {
      eventSource.addEventListener("message", (e) => {
        const message: Message = JSON.parse(e.data || "");
        setMessages((prev) => {
          if (prev) {
            return [...prev, message];
          } else {
            return [message];
          }
        });
      });
    }

    function cleanup() {
      eventSource.close();
      eventSourceGlobal.close();
    }
    return cleanup;
  }, []);

  const sendMessage = async (content: string, port: string) => {
    if (!sendLink) return;

    const formData = new FormData();

    formData.append("content", content);
    formData.append("port", port);

    await fetch(sendLink, {
      body: formData,
      method: "post",
    });
  };

  const toggleOwner = async () => {
    await axios.post(`${defaultLink}chat_json/${chatId}/${+!isOwner}`);

    setIsOwner(!isOwner);
  };

  return { contacts, messages, sendMessage, isOwner, toggleOwner, getAllChats };
};
