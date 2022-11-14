import React from "react";
import { StyleSheet } from "react-native";

import useColorScheme from "../hooks/useColorScheme";
import CustomButton from "./CustomButton";

import Colors from "../constants/Colors";
import window from "../constants/Layout";
const height = window.window.height;

interface ILandingButtonProps {
  variant: "New Game" | "Resume Game" | "Manage Players" | "Stats";
  children: React.ReactNode;
  onPressOut: () => void;
}

const LandingPageButton = (props: ILandingButtonProps) => {
  const colorScheme = useColorScheme();
  const buttonBG = Colors[colorScheme].buttonColor;

  return (
    <CustomButton
      title={props.variant}
      textStyle={styles.buttonTextStyle}
      buttonStyle={[styles.buttonStyle, { backgroundColor: buttonBG }]}
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
