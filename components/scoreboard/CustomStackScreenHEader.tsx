import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "@components/Themed";
import CustomButton from "@components/CustomButton";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

interface CustomStackScreenHeaderProps {
  navigation: any;
  canUndo: boolean;
  onUndo: any;
  title: "Baseball" | "Cricket" | "Elimination" | "Killer" | "X01";
}

const CustomStackScreenHeader = (props: CustomStackScreenHeaderProps) => {
  const { navigation, canUndo, onUndo, title } = props;

  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flex: 0.9,
        flexDirection: "row",
        alignItems: "flex-end",
        marginHorizontal: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: "lightgray",
        marginBottom: 5,
      }}
    >
      <CustomButton
        title="Go Back"
        textStyle={{ display: "none" }}
        buttonStyle={{
          backgroundColor: "transparent",
          //   marginBottom: 3,
          flex: 0.3,
          paddingVertical: 0,
          // marginLeft: "auto",
        }}
        onPressIn={() => navigation.goBack()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={Colors[colorScheme].text}
        />
      </CustomButton>
      <Text
        style={{
          marginBottom: 6,
          fontSize: 20,
          flex: 2,
          marginLeft: 25,
          fontWeight: "600",
          letterSpacing: 0.35,
        }}
      >
        {title}
      </Text>
      <CustomButton
        buttonStyle={{
          backgroundColor: "transparent",
          //   marginBottom: 3,
          flex: 0.5,
          paddingVertical: 0,
          // marginLeft: "auto",
        }}
        textStyle={{ display: "none" }}
        title="Undo"
        onPressIn={() => onUndo()}
        disabled={!canUndo}
      >
        <MaterialCommunityIcons
          name="undo-variant"
          size={24}
          color={Colors[colorScheme].text}
        />
      </CustomButton>
    </View>
  );
};

export default CustomStackScreenHeader;

const styles = StyleSheet.create({});
