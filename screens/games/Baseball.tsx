import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { IPlayer, usePlayerState } from "../../context/PlayerContext";
import useGame from "../../hooks/useGame";
import useUndoRedo from "../../hooks/useUndoRedo";
import usePlayerStats from "../../hooks/usePlayerStats";
import useColorScheme from "../../hooks/useColorScheme";

import { View } from "../../components/Themed";
import BaseballHeader from "@scoreboard/header/BaseballHeader";
import BaseballScoreboardBody from "@scoreboard/body/BaseballScoreboardBody";
import CalculatorButtons from "@scoreboard/calculator-buttons/CalculatorButtons";
import BaseballRoundInfo from "@scoreboard/round-info/BaseballRoundInfo";
import CustomButton from "@components/CustomButton";

import gameOverAlert from "@components/GameOverAlert";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

let winner: { id: number; name: string } = {
  id: 0,
  name: "",
};

const Baseball = () => {
  const { selectedPlayers, setSelectedPlayers } = usePlayerState();
  const { onUpdatePlayerStats, setGameOver } = usePlayerStats();
  const {
    playerScore,
    setPlayerScore,
    leadingScore,
    setLeadingScore,
    onDeleteInput,
    turn,
    changeTurns,
    round,
    setRound,
    changeRounds,
    currentPlayer,
    assignCurrentPlayerHighScore,
    playerIsOut,
    setPlayerIsOut,
    setTurn,
    setCurrentPlayer,
    onResetGame,
  } = useGame();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const [undoState, { set: setCurrentUndoState, undo: undoTurn, canUndo }] =
    useUndoRedo({
      turn: 0,
      round: 1,
      player: { ...currentPlayer },
      nextPlayer: {},
      leadingScore: 0,
    });

  const { present: presentPlayer } = undoState;

  // set initial player scorelist filled with 0 - for display purposes
  useEffect(() => {
    setSelectedPlayers((prev) =>
      prev.map((player) => {
        player.scoreList = new Array(9).fill(0);
        return player;
      })
    );
  }, []);

  const handleScoreInput = () => {
    // convert playerscore to number
    let roundScore = parseInt(playerScore, 10);
    // if score is NaN - score = 0
    if (isNaN(roundScore)) roundScore = 0;
    // assign score to proper index in scorelist
    currentPlayer.scoreList[round - 1] = roundScore;
    // calculate total by reducing scorelist
    const overallScore = currentPlayer.scoreList.reduce((a, b) => a + b);
    assignCurrentPlayerHighScore(currentPlayer);
    changeTurns();
    changeRounds();
    // assign new totals to current player
    setSelectedPlayers((prev) =>
      prev.map((player) =>
        player.id !== currentPlayer.id
          ? player
          : {
              ...player,
              score: overallScore,
              scoreList: currentPlayer.scoreList,
            }
      )
    );
    // if current player score is greater then leading score, set leading score
    overallScore > leadingScore && setLeadingScore(overallScore);
  };

  // handle score submit
  const onHandleTurnChange = () => {
    handleScoreInput();
    // if round is = 9 and turn is last turn check for duplicates or winner
    if (round === 9 && turn === selectedPlayers.length - 1) {
      const scores: IPlayer[] = selectedPlayers.filter(
        (player) => player.score === leadingScore
      );
      // TODO: if player's have a tie then continue on in game
      scores.length > 1 ? playExtraInnings() : declareWinner();
    }
  };

  const playExtraInnings = () => {
    selectedPlayers.forEach((player: IPlayer) => {
      if (playerIsOut.some((value) => value.name === player.name)) return;
      else if (player.score < leadingScore) {
        setPlayerIsOut((prev) => [...prev, player]);
      }
    });
    alert("Extra Innings!");
  };

  const declareWinner = () => {
    // find winner's name
    selectedPlayers.forEach((player: IPlayer) => {
      if (player.score === leadingScore)
        winner = { id: player.id, name: player.name };
    });
    if (winner) {
      selectedPlayers.forEach((player) => {
        onUpdatePlayerStats("baseball", player, winner);
      });
    }
    setGameOver({ isOver: true, game: "baseball" });
    // alert game over with winner name
    gameOverAlert({
      playerName: winner.name,
      onResetGame,
      navigation,
    });
  };

  useEffect(() => {
    if (playerIsOut.length >= 1)
      playerIsOut.forEach((player) => {
        if (player.name === currentPlayer.name) {
          changeTurns();
          changeRounds();
        }
      });
  }, [currentPlayer]);

  const onUndo = () => {
    undoTurn();
    setSelectedPlayers((prev) =>
      prev.map((player) =>
        player.id === presentPlayer.player.id ? presentPlayer.player : player
      )
    );
    setCurrentPlayer(presentPlayer.player);
    setTurn(presentPlayer.turn);
    setRound(presentPlayer.round);
    setLeadingScore(presentPlayer.leadingScore);
  };

  const onHandleSubmit = () => {
    // assign state to undo redo
    setCurrentUndoState({
      turn,
      round,
      player: JSON.parse(JSON.stringify(currentPlayer)),
      leadingScore: leadingScore,
      nextPlayer: JSON.parse(
        JSON.stringify(selectedPlayers[(turn + 1) % selectedPlayers.length])
      ),
    });
    onHandleTurnChange();
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreboardContainer}>
        <BaseballHeader />
        {selectedPlayers.map((player) => {
          return (
            <BaseballScoreboardBody
              key={player.id}
              player={player}
              currentPlayer={currentPlayer.id!}
            />
          );
        })}
        <View
          style={{
            flexDirection: "row",
            margin: 20,
          }}
        >
          <CustomButton
            buttonStyle={{
              backgroundColor: "transparent",
              padding: 10,
              marginLeft: "auto",
            }}
            textStyle={{ display: "none" }}
            title="Undo"
            onPressIn={() => onUndo()}
            disabled={!canUndo}
          >
            <MaterialCommunityIcons
              name="undo-variant"
              size={28}
              color={Colors[colorScheme].text}
            />
          </CustomButton>
        </View>
      </View>
      <View>
        <BaseballRoundInfo
          currentPlayer={currentPlayer}
          round={round}
          playerScore={playerScore}
          leadingScore={leadingScore}
        />
        <CalculatorButtons
          variant="baseball"
          onHandleSubmit={onHandleSubmit}
          onDeleteInput={() => onDeleteInput("baseball")}
          setValue={setPlayerScore}
        />
      </View>
    </View>
  );
};

export default Baseball;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scoreboardContainer: { flex: 2 },
});
