import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import usePlayerStats from "../hooks/usePlayerStats";
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

import { GameVariants } from "../types";

const height = window.window.height;

const Statistics = () => {
  const navigation = useNavigation();

  const {
    overallStats,
    baseballStats,
    cricketStats,
    eliminationStats,
    killerStats,
    x01Stats,
  } = usePlayerStats();

  const colorScheme = useColorScheme();
  const color = Colors[colorScheme].text;

  const navigateToStats = (game: GameVariants) => {
    navigation.navigate("display-statistics", { variant: game });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.buttonRow}>
          <LandingPageButton
            variant="Overall"
            buttonOverrideStyle={styles.buttonStyle}
            onPressOut={() => navigateToStats("overall")}
          >
            <FontAwesome5Icon name="list" size={40} color={color} />
          </LandingPageButton>
          <LandingPageButton
            variant="Baseball"
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
            buttonOverrideStyle={styles.buttonStyle}
            onPressOut={() => navigateToStats("cricket")}
          >
            <AntDesignIcon name="closecircleo" size={40} color={color} />
          </LandingPageButton>
          <LandingPageButton
            variant="Elimination"
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
