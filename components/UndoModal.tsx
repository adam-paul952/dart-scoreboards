import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";

const UndoModal = () => {
  return (
    <View style={{ flex: 0.25, backgroundColor: "transparent" }}>
      <Text>This view will be used to display undo status</Text>
    </View>
  );
};

export default UndoModal;

const styles = StyleSheet.create({});
