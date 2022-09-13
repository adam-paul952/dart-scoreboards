import React from "react";

import { StyleSheet } from "react-native";

import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

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

export const IonIcon = (props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  size: number;
}) => <Ionicons style={styles.iconStyle} {...props} />;

export const MaterialCommunityIcon = (props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
  size: number;
}) => <MaterialCommunityIcons style={styles.iconStyle} {...props} />;

const styles = StyleSheet.create({
  iconStyle: {
    marginTop: 20,
  },
});
