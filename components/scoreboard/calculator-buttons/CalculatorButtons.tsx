import React from "react";

import { FlatList, StyleSheet } from "react-native";

import ButtonItem from "./ButtonItem";

import { regularButtons } from "@scoreboard/calculator-buttons/constants";
import { cricketButtons } from "@scoreboard/calculator-buttons/constants";

interface ICalculatorButtonsProps {
  variant: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
  onHandleSubmit: () => void;
  onDeleteInput: () => void;
}

const CalculatorButtons = (props: ICalculatorButtonsProps) => {
  const { value, setValue, disabled, onHandleSubmit, variant, onDeleteInput } =
    props;

  let data: string[] = [];

  if (variant === "cricket") data = cricketButtons;
  else data = regularButtons;

  // button on press
  const onButtonPress = (inputValue: string) => {
    if (setValue !== undefined) {
      if (inputValue === "Del") {
        onDeleteInput();
        console.log("Deleted score");
      } else if (inputValue === "Enter") {
        onHandleSubmit();
        setValue("");
        console.log("Score is submitted");
      } else {
        if (variant === "cricket") {
          if (inputValue === "Bull") inputValue = "25";
          value !== undefined && value.length === 0
            ? setValue(`${inputValue}`)
            : setValue((prev: string) => `${prev},${inputValue}`);
        } else setValue((prev: string) => `${prev}${inputValue}`);
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
