import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import CustomAccordian from "../components/Accordian";

import { Text, View } from "../components/Themed";

// import CustomAccordian from "../components/Accordian";
// import RulesDescription from "../components/RulesDescription";

const games = ["Baseball", "X01", "Cricket", "Elimination", "Killer"];

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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "5%",
    marginVertical: "5%",
    alignSelf: "center",
  },
});
