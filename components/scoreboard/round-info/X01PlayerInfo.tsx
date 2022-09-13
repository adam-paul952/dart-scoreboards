import React from "react";

import { StyleSheet } from "react-native";

import { Text, View } from "../../Themed";

const X01PlayerInfo = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingVertical: 5,
      }}
    >
      <Text style={{ fontSize: 15 }}>Darts: 0</Text>
      <Text>1 Dart: --</Text>
      <Text>High Score: --</Text>
      <Text>CO: --</Text>
    </View>
  );
};

export default X01PlayerInfo;

const styles = StyleSheet.create({});
