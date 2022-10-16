import React from "react";

import { StyleSheet } from "react-native";
import { View } from "../components/Themed";

const ResumeGame = () => {
  return <View style={styles.container}></View>;
};

export default ResumeGame;

const styles = StyleSheet.create({
  container: { flex: 1 },
});

/* TODO:
 *  - Save game state if exit prior to game ending
 *  - Need to save the playerlist at that time
 *  - The turn & round #
 *  - Type of game
 *  - X01: Points / Elimination Lives - Global values
 *    - Maybe save those under a global async storage option
 */
