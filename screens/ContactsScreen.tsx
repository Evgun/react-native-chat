import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { MainNavProps } from "../navigation/types/MainStackParams";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "../components/Button";
import { Filter, useMessages } from "../hooks/useMessages";
import ContactsList from "../components/ContactsList";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const ContactsScreen = ({ navigation }: MainNavProps<"Contacts">) => {
  const { logout } = useContext(AuthContext);
  const { contacts, getAllChats } = useMessages({});
  const [filter, setFilter] = useState<Filter>(0);

  const handleFilter = () => {
    setFilter((prev) => {
      if (prev) {
        return 0;
      } else {
        return 1;
      }
    });
  };

  useEffect(() => {
    getAllChats(filter);
  }, [filter]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.container}>
          <Button
            onPress={() => handleFilter()}
            title={
              <Ionicons name={filter ? "home" : "home-outline"} size={26} />
            }
          />
          <Button onPress={() => logout()} title="Logout" />
        </View>
      ),
    });
  }, [navigation, logout, filter]);

  return <ContactsList navigation={navigation} contacts={contacts || []} />;
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
});
