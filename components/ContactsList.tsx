import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { FlatList, View, StyleSheet, Text, Pressable } from "react-native";
import { Contacts } from "../hooks/useMessages";
import { MainStackParams } from "../navigation/types/MainStackParams";
import { Ionicons } from "@expo/vector-icons";
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-root-toast";

const ContactsList: React.FC<{
  contacts: Contacts;
  navigation: NativeStackNavigationProp<MainStackParams, keyof MainStackParams>;
}> = ({ contacts, navigation }) => {
  const showToast = () => {
    Toast.show("Copied to Clipboard", {
      duration: Toast.durations.SHORT,
      backgroundColor: "#F0F0F0",
      textColor: "#000",
    });
  };

  return (
    <MenuProvider style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <Menu>
            <MenuTrigger
              triggerOnLongPress
              style={styles.item}
              customStyles={{
                triggerTouchable: {
                  onPress: () => {
                    navigation.navigate("Chat", {
                      id: item.id,
                      name: item.name,
                    });
                  },
                },
              }}
            >
              <View style={styles.header}>
                <Text style={styles.name}>
                  {item.name + " "}
                  <Text style={styles.address}>{item.address + " "}</Text>
                  {!!parseInt(item.isOwner) && (
                    <Ionicons name={"home"} size={16} color="#007BFF" />
                  )}
                </Text>
                {!!parseInt(item.isAnswered) && <View style={styles.dot} />}
              </View>
              <Text style={styles.phone}>+{item.phone}</Text>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                onSelect={() => {
                  Clipboard.setStringAsync(item.name);

                  showToast();
                }}
                text="Copy Name"
              />
              <MenuOption
                onSelect={() => {
                  Clipboard.setStringAsync(item.phone);

                  showToast();
                }}
                text="Copy Number"
              />
              <MenuOption
                onSelect={() => {
                  Clipboard.setStringAsync(item.address);

                  showToast();
                }}
                text="Copy Address"
              />
            </MenuOptions>
          </Menu>
        )}
      />
    </MenuProvider>
  );
};

export default ContactsList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
    padding: 10,
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 50,
    backgroundColor: "rgb(0, 123, 255)",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
  },
  phone: {
    fontSize: 14,
  },
});
