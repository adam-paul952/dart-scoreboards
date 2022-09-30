import React from "react";

import { FlatList, StyleSheet } from "react-native";

import ButtonItem from "./ButtonItem";

interface ICalculatorButtonsProps {
  data: Array<string>;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
}
const CalculatorButtons = (props: ICalculatorButtonsProps) => {
  const { data, value, setValue, disabled } = props;

  // button on press
  const onButtonPress = (inputValue: number | string) => {
    if (setValue !== undefined) {
      if (inputValue === "Del") {
        setValue("");
        console.log("Deleted score");
      } else if (inputValue === "Enter") console.log("Score is submitted");
      else {
        setValue((prev: any) => `${prev}${inputValue}`);
        console.log(inputValue);
      }
    }
  };

  return (
    <FlatList
      data={data}
      numColumns={3}
      renderItem={({ item }) => (
        <ButtonItem
          item={item}
          onButtonPress={onButtonPress}
          disabled={disabled}
        />
      )}
      keyExtractor={(item) => item}
    />
  );
};

export default CalculatorButtons;

const styles = StyleSheet.create({});
