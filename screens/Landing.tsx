import React from "react";
// Components
import { StyleSheet } from "react-native";
import LandingPageButton, {
  FontAwesome5Icon,
  IonIcon,
  MaterialCommunityIcon,
} from "../components/LandingButtons";
import { View } from "../components/Themed";
// Hooks
import { useNavigation } from "@react-navigation/native";
import useThemeColor from "../components/Themed";
// Window Size
import window from "../constants/Layout";
import { usePlayerState } from "../context/PlayerContext";
const width = window.window.width;

const Landing = () => {
  const { playerList } = usePlayerState();
  // Navigation
  const navigation = useNavigation();
  // Theme Colors
  const buttonBG = useThemeColor(
    { light: "lightblue", dark: "royalblue" },
    "background"
  );
  const color = useThemeColor({ light: "black", dark: "white" }, "text");

  const alertUser = () => {
    if (playerList.length === 0) alert("Please create a player first");
    else navigation.navigate("create-match");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <LandingPageButton
          variant="New Game"
          buttonBG={buttonBG}
          color={color}
          onPressOut={() => alertUser()}
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
