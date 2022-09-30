import React from "react";

import { ScrollView, StyleSheet } from "react-native";
import { View } from "@components/Themed";

import LandingPageButton from "@components/LandingButtons";
import {
  AntDesignIcon,
  MaterialCommunityIcon,
} from "@components/button-icons/ButtonIcons";

import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import window from "../constants/Layout";
const height = window.window.height;

const Statistics = () => {
  const navigation = useNavigation();

  const colorScheme = useColorScheme();
  const buttonBG = Colors[colorScheme].buttonColor;
  const color = Colors[colorScheme].text;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.buttonRow}>
          <LandingPageButton
            variant="Baseball"
            buttonBG={buttonBG}
            color={color}
            buttonOverrideStyle={styles.buttonStyle}
          >
            <MaterialCommunityIcon
              name="baseball-bat"
              size={40}
              color={color}
            />
          </LandingPageButton>
          <LandingPageButton
            variant="Cricket"
            buttonBG={buttonBG}
            color={color}
            buttonOverrideStyle={styles.buttonStyle}
          >
            <AntDesignIcon name="closecircleo" size={40} color={color} />
          </LandingPageButton>
        </View>
        <View style={styles.buttonRow}>
          <LandingPageButton
            variant="Elimination"
            buttonBG={buttonBG}
            color={color}
            buttonOverrideStyle={styles.buttonStyle}
          >
            <MaterialCommunityIcon
              name="circle-off-outline"
              size={40}
              color={color}
            />
          </LandingPageButton>
          <LandingPageButton
            variant="Killer"
            buttonBG={buttonBG}
            color={color}
            buttonOverrideStyle={styles.buttonStyle}
          >
            <MaterialCommunityIcon
              name="target-account"
              size={40}
              color={color}
            />
          </LandingPageButton>
        </View>
        <View style={styles.buttonRow}>
          <LandingPageButton
            variant="X01"
            buttonBG={buttonBG}
            color={color}
            buttonOverrideStyle={styles.buttonStyle}
          >
            <MaterialCommunityIcon
              name="bullseye-arrow"
              color={color}
              size={40}
            />
          </LandingPageButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonStyle: {
    height: height / 3.5,
  },
});
