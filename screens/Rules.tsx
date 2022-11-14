import React from "react";
import { StyleSheet } from "react-native";

import { View } from "@components/Themed";
import CustomAccordian from "@components/Accordian";

const Rules = () => {
  return (
    <View style={styles.container}>
      <CustomAccordian />
    </View>
  );
};

export default Rules;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
