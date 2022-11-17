import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import useColorScheme from "../hooks/useColorScheme";
import CustomButton from "./CustomButton";

import Colors from "../constants/Colors";
import window from "../constants/Layout";

const height = window.window.height;

interface ILandingButtonProps {
  variant:
    | "New Game"
    | "Resume Game"
    | "Manage Players"
    | "Stats"
    | "Overall"
    | "Baseball"
    | "Cricket"
    | "Elimination"
    | "Killer"
    | "X01";
  children: React.ReactNode;
  onPressOut: () => void;
  buttonOverrideStyle?: StyleProp<ViewStyle>;
}

const LandingPageButton = (props: ILandingButtonProps) => {
  const colorScheme = useColorScheme();
  const buttonBG = Colors[colorScheme].buttonColor;

  return (
    <CustomButton
      title={props.variant}
      textStyle={styles.buttonTextStyle}
      buttonStyle={[
        styles.buttonStyle,
        props.buttonOverrideStyle,
        { backgroundColor: buttonBG },
      ]}
      buttonChildrenStyle={{ backgroundColor: "transparent" }}
      buttonIconStyle={[
        styles.buttonIconStyle,
        { backgroundColor: "transparent" },
      ]}
      onPressOut={props.onPressOut}
    >
      {props.children}
    </CustomButton>
  );
};

export default LandingPageButton;

const styles = StyleSheet.create({
  buttonStyle: {
    width: "49%",
    height: height / 3,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextStyle: {
    marginTop: 20,
    fontSize: 24,
  },
  buttonIconStyle: {
    alignSelf: "center",
  },
});
