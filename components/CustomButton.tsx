import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

import { Text, View } from "../components/Themed";

import window from "../constants/Layout";

const winHeight = window.window.height;
const winWidth = window.window.width;

interface ICustomButtonProps extends PressableProps {
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  buttonIconStyle?: StyleProp<ViewStyle>;
  buttonChildrenStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  selected?: boolean;
}

const CustomButton = (props: ICustomButtonProps) => {
  return (
    <Pressable
      {...props}
      accessibilityLabel={props.title}
      accessibilityRole="button"
      accessibilityState={
        props.disabled
          ? { disabled: true }
          : props.selected
          ? { selected: true }
          : { disabled: false, selected: false }
      }
      accessibilityActions={[{ name: "activate" }]}
      // onAccessibilityAction={() => !props.disabled && props.onPressOut!()}
      style={
        props.disabled
          ? [styles.disabledButton, props.buttonStyle]
          : props.selected
          ? [styles.button, props.buttonStyle, styles.selectedButton]
          : ({ pressed }) => [
              { opacity: pressed ? 0.5 : 1 },
              props.buttonStyle
                ? [styles.button, props.buttonStyle]
                : styles.button,
            ]
      }
    >
      {props.children ? (
        <View
          style={[
            {
              alignSelf: "center",
              padding: 5,
            },
            props.buttonChildrenStyle,
          ]}
        >
          <View style={props.buttonIconStyle}>{props.children}</View>
          <View style={props.buttonChildrenStyle}>
            <Text
              style={
                props.selected
                  ? [
                      styles.buttonText,
                      props.textStyle,
                      styles.selectedButtonText,
                    ]
                  : props.textStyle
                  ? [styles.buttonText, props.textStyle]
                  : styles.buttonText
              }
            >
              {props.title}
            </Text>
          </View>
        </View>
      ) : (
        <Text
          style={
            props.disabled
              ? [styles.disabledButtonText]
              : props.textStyle
              ? [styles.buttonText, props.textStyle]
              : styles.buttonText
          }
        >
          {props.title}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    // backgroundColor: "royalblue",
    // width: winWidth * 0.8,
    // alignSelf: "center",
    // borderRadius: 20,
    // padding: 5,
  },
  buttonText: {
    // fontSize: 30,
    // alignSelf: "center",
    // color: "#FCF2CE",
  },
  disabledButton: {
    // backgroundColor: "transparent",
    // borderStyle: "solid",
    // borderColor: "#707070",
    // borderWidth: 1,
    // width: winWidth * 0.8,
    // alignSelf: "center",
    // borderRadius: 20,
    // padding: 5,
  },
  disabledButtonText: {
    //   color: "#5D6758", fontSize: 30, alignSelf: "center"
  },
  selectedButton: {
    // backgroundColor: "#BCCEAB",
    // width: winWidth * 0.8,
    // alignSelf: "center",
    // borderRadius: 20,
    // padding: 5,
  },
  selectedButtonText: {
    //   backgroundColor: "#BCCEAB"
  },
});
