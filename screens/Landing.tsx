import React from "react";

import { Alert, StyleSheet } from "react-native";

import LandingPageButton from "../components/LandingButtons";
import { View } from "../components/Themed";
import {
  FontAwesome5Icon,
  IonIcon,
  MaterialCommunityIcon,
} from "../components/button-icons/ButtonIcons";

import { usePlayerState } from "../context/PlayerContext";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import window from "../constants/Layout";
const width = window.window.width;

/**
 * @description Main Landing Screen - Renders buttons to direct the user
 * @description New Game - route "create-match"
 * @description Manage Players - route "manage-players"
 * @description Resume Game - route "resume-game" (Not used yet)
 * @description Stats - route "statistics" (Not used yet)
 */

const Landing = () => {
  const { playerList } = usePlayerState();

  const navigation = useNavigation();

  const colorScheme = useColorScheme();
  const buttonBG = Colors[colorScheme].buttonColor;
  const color = Colors[colorScheme].text;

  const alertUserNoPlayers = () => {
    if (playerList.length < 2)
      Alert.alert("", "Please create a player first", [
        {
          text: "Create Players",
          onPress: () => navigation.navigate("create-player"),
        },
      ]);
    else navigation.navigate("create-match");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <LandingPageButton
          variant="New Game"
          buttonBG={buttonBG}
          color={color}
          onPressOut={() => alertUserNoPlayers()}
        >
          <MaterialCommunityIcon
            name="bullseye-arrow"
            color={color}
            size={60}
          />
        </LandingPageButton>
        <LandingPageButton
          variant="Resume Game"
          buttonBG={buttonBG}
          color={color}
          onPressOut={() => navigation.navigate("resume-game")}
        >
          <FontAwesome5Icon name="undo-alt" color={color} size={60} />
        </LandingPageButton>
      </View>
      <View style={styles.buttonRow}>
        <LandingPageButton
          variant="Manage Players"
          buttonBG={buttonBG}
          color={color}
          onPressOut={() => {
            navigation.navigate("manage-players");
          }}
        >
          <FontAwesome5Icon name="user-friends" color={color} size={60} />
        </LandingPageButton>
        <LandingPageButton
          variant="Stats"
          buttonBG={buttonBG}
          color={color}
          onPressOut={() => navigation.navigate("statistics")}
        >
          <IonIcon name="stats-chart" color={color} size={60} />
        </LandingPageButton>
      </View>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    justifyContent: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
