import React from "react";
import { Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { usePlayerState } from "../context/PlayerContext";
import useColorScheme from "../hooks/useColorScheme";

import LandingPageButton from "../components/LandingButtons";
import { View } from "../components/Themed";
import {
  FontAwesome5Icon,
  IonIcon,
  MaterialCommunityIcon,
} from "../components/button-icons/ButtonIcons";

import Colors from "../constants/Colors";
import window from "../constants/Layout";
const width = window.window.width;

/**
 * @component
 * @description Main Landing Screen - Renders buttons to direct the user
 *  New Game - route "create-match"
 *  Manage Players - route "manage-players"
 *  Resume Game - route "resume-game" (Not used yet)
 *  Stats - route "statistics"
 */

const Landing = () => {
  const { playerList } = usePlayerState();

  const navigation = useNavigation();
  const colorScheme = useColorScheme();
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
          onPressOut={() => navigation.navigate("resume-game")}
        >
          <FontAwesome5Icon name="undo-alt" color={color} size={60} />
        </LandingPageButton>
      </View>
      <View style={styles.buttonRow}>
        <LandingPageButton
          variant="Manage Players"
          onPressOut={() => {
            navigation.navigate("manage-players");
          }}
        >
          <FontAwesome5Icon name="user-friends" color={color} size={60} />
        </LandingPageButton>
        <LandingPageButton
          variant="Stats"
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
