import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import window from "../constants/Layout";

import { View } from "@components/Themed";
import LandingPageButton from "@components/LandingButtons";
import {
  AntDesignIcon,
  FontAwesome5Icon,
  MaterialCommunityIcon,
} from "@components/button-icons/ButtonIcons";

const height = window.window.height;

export interface PlayerStats {
  id: number;
  name: string;
  games_won: number;
  games_lost: number;
  games_played: number;
}

export interface BaseballStats extends PlayerStats {
  highscore: number;
}
export interface X01Stats extends PlayerStats {
  one_dart_average: number;
  highscore: number;
}

const Statistics = () => {
  const navigation = useNavigation();

  const colorScheme = useColorScheme();
  const buttonBG = Colors[colorScheme].buttonColor;
  const color = Colors[colorScheme].text;

  const navigateToStats = (game: string) => {
    navigation.navigate("display-statistics", { variant: game });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.buttonRow}>
          <LandingPageButton
            variant="Overall"
            buttonBG={buttonBG}
            color={color}
            buttonOverrideStyle={styles.buttonStyle}
            onPressOut={() => navigateToStats("overall")}
          >
            <FontAwesome5Icon name="list" size={40} color={color} />
          </LandingPageButton>
          <LandingPageButton
            variant="Baseball"
            buttonBG={buttonBG}
            color={color}
            buttonOverrideStyle={styles.buttonStyle}
            onPressOut={() => navigateToStats("baseball")}
          >
            <MaterialCommunityIcon
              name="baseball-bat"
              size={40}
              color={color}
            />
          </LandingPageButton>
        </View>
        <View style={styles.buttonRow}>
          <LandingPageButton
            variant="Cricket"
            buttonBG={buttonBG}
            color={color}
            buttonOverrideStyle={styles.buttonStyle}
            onPressOut={() => navigateToStats("cricket")}
          >
            <AntDesignIcon name="closecircleo" size={40} color={color} />
          </LandingPageButton>
          <LandingPageButton
            variant="Elimination"
            buttonBG={buttonBG}
            color={color}
            buttonOverrideStyle={styles.buttonStyle}
            onPressOut={() => navigateToStats("elimination")}
          >
            <MaterialCommunityIcon
              name="circle-off-outline"
              size={40}
              color={color}
            />
          </LandingPageButton>
        </View>
        <View style={styles.buttonRow}>
          <LandingPageButton
            variant="Killer"
            buttonBG={buttonBG}
            color={color}
            buttonOverrideStyle={styles.buttonStyle}
            onPressOut={() => navigateToStats("killer")}
          >
            <MaterialCommunityIcon
              name="target-account"
              size={40}
              color={color}
            />
          </LandingPageButton>
          <LandingPageButton
            variant="X01"
            buttonBG={buttonBG}
            color={color}
            buttonOverrideStyle={styles.buttonStyle}
            onPressOut={() => navigateToStats("x01")}
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
