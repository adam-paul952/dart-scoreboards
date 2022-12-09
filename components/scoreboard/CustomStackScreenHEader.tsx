import React from "react";
import { Alert, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Text, View } from "@components/Themed";
import CustomButton from "@components/CustomButton";
import { FontAwesome5Icon } from "@components/button-icons/ButtonIcons";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

import { PlayableGameVariants } from "../../hooks/useGame";

interface CustomStackScreenHeaderProps {
  canUndo: boolean;
  onUndo: () => void;
  title: "Baseball" | "Cricket" | "Elimination" | "Killer" | "X01";
  onResetGame: (variant: PlayableGameVariants) => void;
  currentPlayerScore?: number;
  onAddGame: () => void;
  variant: PlayableGameVariants;
}

const CustomStackScreenHeader = (props: CustomStackScreenHeaderProps) => {
  const {
    canUndo,
    onUndo,
    title,
    onResetGame,
    currentPlayerScore,
    onAddGame,
    variant,
  } = props;

  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const onGoBack = () => {
    onResetGame(variant);
    navigation.goBack();
  };

  const saveGameAlert = () => {
    Alert.alert(
      "Alert",
      "You're game is unfinished - would you like to save it?",
      [
        {
          text: "No",
          onPress: () => {
            onGoBack();
          },
        },
        {
          text: "Yes",
          onPress: () => {
            onAddGame();
            onGoBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.headerContainer}>
      <CustomButton
        title="Go Back"
        textStyle={styles.headerButtonText}
        buttonStyle={styles.headerButton}
        onPressIn={saveGameAlert}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={Colors[colorScheme].text}
        />
      </CustomButton>
      <Text style={styles.headerText}>{title}</Text>
      {title === "X01" ? (
        <CustomButton
          title="X01 OutChart"
          textStyle={styles.headerButtonText}
          buttonStyle={styles.headerButton}
          onPressIn={() =>
            navigation.navigate("x01-outchart", {
              currentPlayerScore:
                currentPlayerScore !== undefined && currentPlayerScore <= 170
                  ? currentPlayerScore
                  : undefined,
            })
          }
        >
          <FontAwesome5Icon
            name="clipboard-list"
            size={24}
            color={Colors[colorScheme].text}
          />
        </CustomButton>
      ) : null}
      <CustomButton
        buttonStyle={styles.headerButton}
        textStyle={styles.headerButtonText}
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

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginHorizontal: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgray",
    marginBottom: 5,
    height: 110,
  },
  headerButton: {
    backgroundColor: "transparent",
    flex: 0.3,
    paddingVertical: 0,
    marginHorizontal: 5,
  },
  headerButtonText: { display: "none" },
  headerText: {
    marginBottom: 6,
    fontSize: 20,
    flex: 2,
    marginLeft: 25,
    fontWeight: "600",
    letterSpacing: 0.35,
  },
});
