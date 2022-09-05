import React from "react";
// Components
import { StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
// Window Size
import window from "../constants/Layout";
const height = window.window.height;
// Icons
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
// Types
interface ILandingButtonProps {
  variant: string;
  children: React.ReactNode;
  buttonBG?: string;
  color?: string;
  onPressOut?: () => void;
}

const LandingPageButton = (props: ILandingButtonProps) => (
  <CustomButton
    title={props.variant}
    textStyle={styles.buttonTextStyle}
    buttonStyle={[styles.buttonStyle, { backgroundColor: props.buttonBG }]}
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

export const AntDesignIcon = (props: {
  name: React.ComponentProps<typeof AntDesign>["name"];
  color: string;
  size: number;
}) => <AntDesign style={styles.iconStyle} {...props} />;
export const FontAwesome5Icon = (props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
  size: number;
}) => <FontAwesome5 style={styles.iconStyle} {...props} />;
export const MaterialCommunityIcon = (props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
  size: number;
}) => <MaterialCommunityIcons style={styles.iconStyle} {...props} />;
export const IonIcon = (props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  size: number;
}) => <Ionicons style={styles.iconStyle} {...props} />;

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
  iconStyle: {
    marginTop: 20,
  },
});
