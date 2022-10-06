import React from "react";

import { FlatList, StyleSheet } from "react-native";

import ButtonItem from "./ButtonItem";

import { regularButtons } from "@scoreboard/calculator-buttons/constants";
import { cricketButtons } from "@scoreboard/calculator-buttons/constants";

interface ICalculatorButtonsProps {
  variant: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean | Array<boolean>;
  onHandleSubmit: () => void;
  onDeleteInput: () => void;
  hitTargets?: Array<number>;
}

const CalculatorButtons = (props: ICalculatorButtonsProps) => {
  const {
    value,
    setValue,
    disabled,
    onHandleSubmit,
    variant,
    onDeleteInput,
    hitTargets,
  } = props;

  let data: string[] = [];
  // assign calculator buttons
  if (variant === "cricket") data = cricketButtons;
  else data = regularButtons;

  // button on press
  const onButtonPress = (inputValue: string) => {
    // check to see if state setter is undefined
    if (setValue !== undefined) {
      // if button === "Del"
      if (inputValue === "Del") {
        // delete input function
        onDeleteInput();
        // if button === "Enter"
      } else if (inputValue === "Enter") {
        // handleSubmit function
        onHandleSubmit();
        setValue("");
        // all other buttons
      } else {
        // check if game is cricket
        if (variant === "cricket") {
          // assign value to Bull
          if (inputValue === "Bull") inputValue = "25";
          value !== undefined && value.length === 0
            ? setValue(`${inputValue}`)
            : setValue((prev: string) => `${prev},${inputValue}`);
        } else setValue((prev: string) => `${prev}${inputValue}`);
      }
    }
  };

  // for cricket assign mark count on buttons
  const assignHits = (index: number) => {
    let hit = 0;
    if (hitTargets !== undefined)
      for (let i = 0; i < hitTargets.length - 1; i++) {
        if (index === i) hit = hitTargets[i];
        else if (index === 7) hit = hitTargets[hitTargets.length - 1];
      }
    return hit;
  };

  // for cricket assign disabled buttons after all players hit three marks
  const assignDisabled = (index?: number) => {
    // set default disable to false
    let isDisabled = false;
    // check if disabled prop is provided
    if (disabled !== undefined) {
      // if just boolean value return value
      if (typeof disabled !== "object") return (isDisabled = disabled);
      // else boolean[] from cricket
      else {
        // filter disabled[] set value equal to button index
        disabled.filter((value, idx) => {
          // first values index will be the same as boolean array
          if (index === idx) isDisabled = value;
          // if last element assign to index 7 bull button
          else if (index === 7) isDisabled = value;
        });
        // return isDisabled
        return isDisabled;
      }
      // if disabled prop isn't defined return false
    } else return isDisabled;
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return hitTargets !== undefined ? (
      <ButtonItem
        item={item}
        onButtonPress={onButtonPress}
        disabled={assignDisabled(index)}
        variant={variant}
        hits={assignHits(index)}
      />
    ) : (
      <ButtonItem
        item={item}
        onButtonPress={onButtonPress}
        disabled={assignDisabled()}
        variant={variant}
      />
    );
  };

  return (
    <FlatList
      data={data}
      numColumns={3}
      renderItem={renderItem}
      keyExtractor={(item) => item}
    />
  );
};

export default CalculatorButtons;

const styles = StyleSheet.create({});
