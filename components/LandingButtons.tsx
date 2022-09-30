import React from "react";

import { StyleSheet } from "react-native";
import CustomButton from "./CustomButton";

import window from "../constants/Layout";
const height = window.window.height;

interface ILandingButtonProps {
  variant: string;
  children: React.ReactNode;
  buttonBG?: string;
  color?: string;
  onPressOut?: () => void;
  buttonOverrideStyle?: any;
}

const LandingPageButton = (props: ILandingButtonProps) => (
  <CustomButton
    title={props.variant}
    textStyle={styles.buttonTextStyle}
    buttonStyle={[
      styles.buttonStyle,
      props.buttonOverrideStyle,
      { backgroundColor: props.buttonBG },
    ]}
    buttonChildrenStyle={{ backgroundColor: props.buttonBG }}
    buttonIconStyle={[
      styles.buttonIconStyle,
      { backgroundColor: props.buttonBG },
    ]}
    onPressOut={props.onPressOut}
  >
    {props.children}
  </CustomButton>
);

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
