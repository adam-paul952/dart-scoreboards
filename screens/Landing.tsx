import React from "react";
// Components
import { StyleSheet } from "react-native";
import LandingPageButton, {
  AntDesignIcon,
  FontAwesome5Icon,
  MaterialCommunityIcon,
} from "../components/LandingButtons";
import { View } from "../components/Themed";
// Hooks
import { useNavigation } from "@react-navigation/native";
import useThemeColor from "../components/Themed";
// Window Size
import window from "../constants/Layout";
const width = window.window.width;

const Landing = () => {
  // Navigation
  //   const navigate = useNavigation();
  // Theme Colors
  const buttonBG = useThemeColor(
    { light: "lightblue", dark: "royalblue" },
    "background"
  );
  const color = useThemeColor({ light: "black", dark: "white" }, "text");

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <LandingPageButton
          variant="New Game"
          buttonBG={buttonBG}
          color={color}
          //   onPressOut={() => navigate.navigate("CreateGame")}
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
          onPressOut={() => {}}
        >
          <FontAwesome5Icon name="undo-alt" color={color} size={60} />
        </LandingPageButton>
      </View>
      <View style={styles.buttonRow}>
        <LandingPageButton
          variant="Create Player"
          buttonBG={buttonBG}
          color={color}
          //   onPressOut={() => navigate.navigate("CreatePlayer")}
        >
          <AntDesignIcon name="adduser" color={color} size={60} />
        </LandingPageButton>
        <LandingPageButton
          variant="Manage Players"
          buttonBG={buttonBG}
          color={color}
          //   onPressOut={() => {
          //     navigate.navigate("ManagePlayer");
          //   }}
        >
          <FontAwesome5Icon name="user-friends" color={color} size={60} />
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
