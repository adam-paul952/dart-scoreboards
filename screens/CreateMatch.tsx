import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { IPlayer, usePlayerState } from "../context/PlayerContext";

import { Text, View } from "../components/Themed";
import CustomButton from "../components/CustomButton";
import Dropdown from "../components/Dropdown";
import ActivePlayerList from "@components/ActivePlayerList";

import {
  baseballData,
  x01Data,
  eliminationData,
} from "../constants/data/createMatch";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";

type CreateMatchProps = NativeStackScreenProps<
  RootStackParamList,
  "create-match"
>;

const CreateMatch = ({ navigation }: CreateMatchProps) => {
  const { selectedPlayers, setSelectedPlayers, togglePlayerSelect } =
    usePlayerState();
  // game to be selected
  const [game, setGame] = useState<null>(null);
  // x01 points - elimination lives
  const [points, setPoints] = useState<number | null>(null);

  // disable button if game is null or specific game options are not set
  const disableButton = () =>
    game === null
      ? true
      : game === "x01" && points === null
      ? true
      : game === "elimination" && points === null
      ? true
      : false;

  // if x01 is selected set points to player
  const setX01Points = () =>
    points !== null &&
    setSelectedPlayers((prev) =>
      prev.map((player) => {
        player.score = points;
        return player;
      })
    );

  // if elimination - set lives to player
  const setEliminationLives = () =>
    points !== null &&
    setSelectedPlayers((prev) =>
      prev.map((player) => {
        player.lives = points;
        return player;
      })
    );

  const resetPlayerState = () => {
    setSelectedPlayers((prev) =>
      prev.map((player) => {
        player.score = 0;
        player.scoreList = [];
        player.lives = 0;
        player.killer = false;
        return player;
      })
    );
  };

  // handle conditions for setting state and navigation
  const onHandleSelect = () => {
    game !== null &&
      (game === "x01"
        ? (setX01Points(), navigation.navigate(game))
        : game === "elimination"
        ? (setEliminationLives(), navigation.navigate(game))
        : game === "killer"
        ? navigation.navigate("killer-setup")
        : navigation.navigate(game));
  };

  const shufflePlayerList = (array: IPlayer[]) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      resetPlayerState()
    );

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View
        style={{
          minHeight: "20%",
        }}
      >
        <Dropdown
          data={baseballData}
          label="Choose Game:"
          value={game}
          setValue={setGame}
        />
        {game === "x01" ? (
          <Dropdown
            data={x01Data}
            label="Points:"
            value={points}
            setValue={setPoints}
          />
        ) : game === "elimination" ? (
          <Dropdown
            data={eliminationData}
            label="Lives:"
            value={points}
            setValue={setPoints}
          />
        ) : null}
      </View>
      <View style={{ flexGrow: 1, paddingVertical: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              textDecorationLine: "underline",
              paddingBottom: 5,
            }}
          >
            Players to play:
          </Text>
          <CustomButton
            title="Shuffle"
            buttonStyle={{
              backgroundColor: "transparent",
              paddingRight: 10,
              paddingBottom: 10,
            }}
            onPressIn={() =>
              setSelectedPlayers((prev) =>
                shufflePlayerList(prev).map((player) => player)
              )
            }
          />
        </View>
        <ActivePlayerList
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
          togglePlayerSelect={togglePlayerSelect}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Continue to Game"
          buttonStyle={styles.buttonStyle}
          disabled={disableButton()}
          onPressOut={() => onHandleSelect()}
        />
      </View>
    </View>
  );
};

export default CreateMatch;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", padding: 5 },
  buttonContainer: {
    alignSelf: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "lightgray",
  },
  buttonStyle: {
    marginVertical: 10,
    width: "80%",
    alignSelf: "center",
  },
});
