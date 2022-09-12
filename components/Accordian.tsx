import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { Entypo } from "@expo/vector-icons";
import RulesDescription from "./RulesDescription";

interface ICustomAccordianProps {
  title: string;
  children: React.ReactNode;
}

let data = [
  { game: "Baseball", scoring: "", note: "" },
  { game: "Cricket", scoring: "", note: "" },
  { game: "Elimination", scoring: "", note: "" },
  { game: "Killer", scoring: "", note: "" },
  { game: "X01", scoring: "", note: "" },
];

const CustomAccordian = () => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => AccordianItem({ item, expanded })}
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

const AccordianItem = ({
  item,
  expanded,
}: {
  item: any;
  expanded: boolean;
}) => {
  return (
    <View>
      <Pressable>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>{item.game}</Text>
          <Entypo name="chevron-thin-down" size={24} color="black" />
        </View>
      </Pressable>
      {expanded && <RulesDescription variant={item.game} />}
    </View>
  );
};
