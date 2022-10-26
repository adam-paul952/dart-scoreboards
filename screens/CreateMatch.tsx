import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

const CreateMatch = () => {
  const navigation = useNavigation();
  const { selectedPlayers, setSelectedPlayers, togglePlayerSelect } =
    usePlayerState();
  // game to be selected
  const [game, setGame] = useState<null>(null);
  // x01 points - elimination lives
  const [points, setPoints] = useState<number | null>(null);

  // disable button if game is null or specific game options are not set
  const disableButton = () => {
    if (game === null) return true;
    else if (game === "x01" && points === null) return true;
    else if (game === "elimination" && points === null) return true;
    else return false;
  };

  // if x01 is selected set points to player
  const setX01Points = () => {
    if (points !== null)
      setSelectedPlayers((prev: IPlayer[]) =>
        prev.map((player) => {
          player.score = points;
          return player;
        })
      );
  };

  // if elimination - set lives to player
  const setEliminationLives = () => {
    if (points !== null)
      setSelectedPlayers((prev: IPlayer[]) =>
        prev.map((player) => {
          player.lives = points;
          return player;
        })
      );
  };

  const resetPlayerState = () => {
    setSelectedPlayers((prev: IPlayer[]) =>
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
    if (game !== null)
      if (game === "x01") {
        resetPlayerState();
        setX01Points();
        navigation.navigate(game);
      } else if (game === "elimination") {
        resetPlayerState();
        setEliminationLives();
        navigation.navigate(game);
      } else if (game === "killer") {
        resetPlayerState();
        navigation.navigate("killer-setup");
      } else {
        resetPlayerState();
        navigation.navigate(game);
      }
  };

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
        {game === "x01" && (
          <Dropdown
            data={x01Data}
            label="Points:"
            value={points}
            setValue={setPoints}
          />
        )}
        {game === "elimination" && (
          <Dropdown
            data={eliminationData}
            label="Lives:"
            value={points}
            setValue={setPoints}
          />
        )}
      </View>
      <View style={{ flexGrow: 1, paddingVertical: 10 }}>
        <Text
          style={{
            fontSize: 25,
            textDecorationLine: "underline",
            paddingBottom: 5,
          }}
        >
          Players to play:
        </Text>
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
          onPressOut={() => {
            onHandleSelect();
          }}
        />
      </View>
    </View>
  );
};

export default CreateMatch;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column" },
  buttonContainer: {
    alignSelf: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  buttonStyle: {
    marginBottom: 20,
    width: "80%",
    alignSelf: "center",
  },
});
