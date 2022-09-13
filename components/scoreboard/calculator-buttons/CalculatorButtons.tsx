import React from "react";

import { FlatList, StyleSheet } from "react-native";

import CustomButton from "../../CustomButton";

interface ICalculatorButtonsProps {
  data: Array<string>;
}
const CalculatorButtons = (props: ICalculatorButtonsProps) => {
  const Item = ({ item }: { item: any }) => {
    return <CustomButton buttonStyle={styles.item} title={item} />;
  };

  return (
    <FlatList
      data={props.data}
      numColumns={3}
      renderItem={Item}
      keyExtractor={(item) => item}
    />
  );
};

export default CalculatorButtons;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    maxWidth: "33.33%",
    justifyContent: "center",
    borderRadius: 0,
    padding: 10,
    backgroundColor: "rgba(249, 180, 45, 0.25)",
    borderWidth: 1.5,
    borderColor: "#fff",
    height: 70,
  },
});
