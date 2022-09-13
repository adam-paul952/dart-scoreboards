import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { View } from "./Themed";
import AccordianItem from "./AccordianItem";

interface ICustomAccordianProps {
  title: string;
  children: React.ReactNode;
}

let data = [
  { game: "Baseball" },
  { game: "Cricket" },
  { game: "Elimination" },
  { game: "Killer" },
  { game: "X01" },
];

const CustomAccordian = () => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <AccordianItem item={item} />}
        keyExtractor={(item) => item.game}
      />
    </View>
  );
};

export default CustomAccordian;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: "5%",
  },
});
