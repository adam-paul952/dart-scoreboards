import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { IPlayer, usePlayerState } from "../../context/PlayerContext";
import useGame from "../../hooks/useGame";
import useUndoRedo from "../../hooks/useUndoRedo";
import usePlayerStats from "../../hooks/usePlayerStats";

import { View } from "@components/Themed";
import X01Header from "@scoreboard/header/X01Header";
import X01ScoreboardBody from "@scoreboard/body/X01ScoreboardBody";
import X01PlayerInfo from "@scoreboard/round-info/X01PlayerInfo";
import X01InputRow from "@components/scoreboard/X01InputRow";
import CalculatorButtons from "@scoreboard/calculator-buttons/CalculatorButtons";
import gameOverAlert from "@components/GameOverAlert";
import CustomButton from "@components/CustomButton";

const X01 = () => {
  const { selectedPlayers, setSelectedPlayers } = usePlayerState();
  const { onUpdatePlayerStats, setGameOver } = usePlayerStats();
  const {
    playerScore,
    setPlayerScore,
    onDeleteInput,
    changeTurns,
    currentPlayer,

    assignCurrentPlayerHighScore,

    setCurrentPlayer,

    nextPlayer,
  } = useGame();
  const navigation = useNavigation();
  const [playerState, { set: setCurrentState, undo: undoTurn, canUndo }] =
    useUndoRedo({
      player: { ...currentPlayer },
      nextPlayer: {},
    });

  const { present: presentTurn } = playerState;

  // useEffect(() => {
  //   // console.log(`Present Turn: `);
  //   // console.log(presentTurn);
  // }, [presentTurn]);

  // state to manage input error and disable buttons
  const [inputError, setInputError] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  // set X01 points
  const [x01Points] = useState(currentPlayer.score);

  let winner = { id: 0, name: "" };

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
  const onHandleSubmit = () => {
    // convert input to number
    let score = parseInt(playerScore.slice(0, 3), 10);
    if (isNaN(score)) score = 0;
    handleScoreChange(score);
    changeTurns();
    // changeRounds();
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
    setSelectedPlayers((prev: IPlayer[]) =>
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
        onUpdatePlayerStats("x01", player, winner);
      });

      setGameOver({ isOver: true, game: "x01" });

      gameOverAlert({ playerName: winner.name, resetGame, navigation });
    }
    return true;
  };

  // reset game if playing again
  const resetGame = () => {
    setSelectedPlayers((prev: IPlayer[]) =>
      prev.map((player) => {
        player.score = x01Points;
        player.scoreList = [];
        player.stats.darts = 0;
        player.stats.oneDartAverage = 0;
        return player;
      })
    );
  };

  const handleStatsChange = () => {
    // determine if this is highest score
    assignCurrentPlayerHighScore(currentPlayer);
    currentPlayer.stats.darts += 3;
  };

  const onUndo = () => {
    undoTurn();
    setSelectedPlayers((prev) =>
      prev.map((player) => {
        if (player.id === presentTurn.player.id) {
          return presentTurn.player;
        } else {
          return player;
        }
      })
    );
    setCurrentPlayer(presentTurn.player);
    // setTurn(presentTurn.turn);
    // setRound(presentTurn.round);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <X01Header />
        <X01ScoreboardBody
          selectedPlayers={selectedPlayers}
          currentPlayer={currentPlayer}
        />
      </View>
      <CustomButton
        title="Undo"
        buttonStyle={{ width: "25%", alignSelf: "center" }}
        onPressIn={() => onUndo()}
        disabled={!canUndo}
      />
      <>
        <X01InputRow
          playerScore={playerScore}
          inputError={inputError}
          currentPlayerScore={currentPlayer.score}
        />
        <View>
          <X01PlayerInfo currentPlayer={currentPlayer} />
          <CalculatorButtons
            variant="x01"
            value={playerScore}
            setValue={setPlayerScore}
            disabled={disabled}
            onHandleSubmit={() => {
              setCurrentState({
                player: JSON.parse(JSON.stringify(currentPlayer)),
                nextPlayer: JSON.parse(JSON.stringify(nextPlayer)),
              });
              onHandleSubmit();
            }}
            onDeleteInput={() => onDeleteInput("x01")}
          />
        </View>
      </>
    </View>
  );
};

export default X01;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", paddingTop: 20 },
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
