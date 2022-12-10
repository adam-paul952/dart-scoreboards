import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { usePlayerState } from "../../context/PlayerContext";
import useGame from "../../hooks/useGame";
import useUndoRedo from "../../hooks/useUndoRedo";
import usePlayerStats from "../../hooks/usePlayerStats";
import useResumeGame from "../../hooks/useResumeGame";

import { View } from "@components/Themed";
import CustomStackScreenHeader from "@components/scoreboard/CustomStackScreenHeader";
import X01Header from "@scoreboard/header/X01Header";
import X01ScoreboardBody from "@scoreboard/body/X01ScoreboardBody";
import X01PlayerInfo from "@scoreboard/round-info/X01PlayerInfo";
import X01InputRow from "@components/scoreboard/X01InputRow";
import CalculatorButtons from "@scoreboard/calculator-buttons/CalculatorButtons";
import gameOverAlert from "@components/GameOverAlert";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";

type X01Props = NativeStackScreenProps<RootStackParamList, "x01">;

let winner = { id: 0, name: "" };

const X01 = ({ route }: X01Props) => {
  const variant = route.name;
  const { selectedPlayers, setSelectedPlayers } = usePlayerState();
  const { onUpdatePlayerStats, setGameOver } = usePlayerStats();
  const { onAddGame } = useResumeGame();
  const {
    playerScore,
    setPlayerScore,
    onDeleteInput,
    changeTurns,
    currentPlayer,
    assignCurrentPlayerHighScore,
    setCurrentPlayer,
    nextPlayer,
    onResetGame,
  } = useGame();
  const navigation = useNavigation();
  const [undoState, { set: setUndoState, undo: undoTurn, canUndo }] =
    useUndoRedo({
      player: { ...currentPlayer },
      nextPlayer: {},
    });

  const { present: presentTurn } = undoState;

  // state to manage input error and disable buttons
  const [inputError, setInputError] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  // set X01 points
  const [x01Points] = useState(currentPlayer.score);

  // check user input for error
  const checkForInputError = () => {
    if (playerScore.length === 3) {
      const score = parseInt(playerScore, 10);
      // check if input > 180 add error
      if (score > 180) {
        setInputError(true);
        setDisabled(true);
      }
      // else no error
      else {
        setInputError(false);
        setDisabled(false);
      }
    } else if (playerScore.length === 0) {
      setInputError(false);
      setDisabled(false);
    }
  };

  useEffect(() => {
    checkForInputError();
  }, [playerScore]);

  // handle submit action enter button
  const onHandleTurnChange = () => {
    // convert input to number
    let score = parseInt(playerScore.slice(0, 3), 10);
    if (isNaN(score)) score = 0;
    handleScoreChange(score);
    changeTurns();
  };

  const handleScoreChange = (score: number) => {
    currentPlayer.scoreList.push(score);
    const playerNewScore = currentPlayer.score - score;
    // if score is< 0 or 1 we declare bust
    if (playerNewScore < 0 || playerNewScore === 1) {
      Alert.alert("BUST!", "", [{ text: "Ok" }]);
      return;
    }
    // seperate function handle changing of a player in-game stats
    handleStatsChange();
    // set playerlist with currentplayer totals
    setSelectedPlayers((prev) =>
      prev.map((player) => {
        // if current player isn't equal to player return
        if (currentPlayer.id !== player.id) return player;
        // assigns player totals
        else {
          player.score = playerNewScore;
          player.scoreList = currentPlayer.scoreList;
          player.stats.oneDartAverage = parseFloat(
            ((x01Points - player.score) / player.stats.darts).toFixed(2)
          );
          return player;
        }
      })
    );
    // if current player is winner - game over
    if (currentPlayer.score === 0) {
      winner = { id: currentPlayer.id!, name: currentPlayer.name };

      selectedPlayers.forEach((player) => {
        onUpdatePlayerStats(variant, player, winner);
      });

      setGameOver({ isOver: true, game: variant });

      gameOverAlert({
        playerName: winner.name,
        onResetGame,
        navigation,
        variant,
        assignedLives: x01Points,
      });
    }
    return true;
  };

  const handleStatsChange = () => {
    // determine if this is highest score
    assignCurrentPlayerHighScore(currentPlayer);
    currentPlayer.stats.darts += 3;
  };

  const onUndo = () => {
    undoTurn();
    setSelectedPlayers((prev) =>
      prev.map((player) =>
        player.id === presentTurn.player.id ? presentTurn.player : player
      )
    );

    setCurrentPlayer(presentTurn.player);
  };

  const onHandleSubmit = () => {
    setUndoState({
      player: JSON.parse(JSON.stringify(currentPlayer)),
      nextPlayer: JSON.parse(JSON.stringify(nextPlayer)),
    });

    onHandleTurnChange();
  };

  const routes = navigation.getState()?.routes;

  const addGame = () => onAddGame(variant, selectedPlayers, undoState);

  return (
    <View style={styles.container}>
      <CustomStackScreenHeader
        onUndo={onUndo}
        canUndo={canUndo}
        onResetGame={onResetGame}
        currentPlayerScore={currentPlayer.score}
        variant={variant}
        onAddGame={addGame}
      />
      <View style={styles.headerRow}>
        <X01Header />
        <X01ScoreboardBody
          selectedPlayers={selectedPlayers}
          currentPlayer={currentPlayer}
        />
      </View>
      <X01InputRow
        playerScore={playerScore}
        inputError={inputError}
        currentPlayer={currentPlayer}
      />
      <X01PlayerInfo currentPlayer={currentPlayer} />
      <View>
        <CalculatorButtons
          variant="x01"
          value={playerScore}
          setValue={setPlayerScore}
          disabled={disabled}
          onHandleSubmit={onHandleSubmit}
          onDeleteInput={() => onDeleteInput(variant)}
        />
      </View>
    </View>
  );
};

export default X01;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column" },
  headerRow: { flex: 2 },
  scoreboardRow: { flexDirection: "row", justifyContent: "center" },
  playerHeaderColumn: {
    flex: 3,
    borderRightColor: "gray",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  pointsHeaderColumn: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
});
