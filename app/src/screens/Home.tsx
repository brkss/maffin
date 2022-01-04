import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>This Home </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
