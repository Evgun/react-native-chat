import { FC, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";

const Snackbar: FC<{ text: string }> = ({ text }) => {
  const fadeAnim = useRef(new Animated.Value(-70)).current;

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      useNativeDriver: false,
      toValue: -70,
      duration: 300,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      useNativeDriver: false,
      toValue: 0,
      duration: 300,
    }).start();
  };

  useEffect(() => {
    fadeIn();

    setTimeout(() => {
      fadeOut();
    }, 5000);
  }, []);

  return (
    <Animated.View style={[styles.container, { bottom: fadeAnim }]}>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
};

export default Snackbar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    padding: 20,
    width: "100%",
    backgroundColor: "#ff6347",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
