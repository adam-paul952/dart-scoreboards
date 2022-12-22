import React, { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { useKeepAwake } from "expo-keep-awake";

import { usePlayerState } from "../../context/PlayerContext";
import useGame, { PlayableGameVariants } from "../../hooks/useGame";
import useUndoRedo from "../../hooks/useUndoRedo";
import usePlayerStats from "../../hooks/usePlayerStats";
import useResumeGame from "../../hooks/useResumeGame";

import { View } from "../../components/Themed";
import CustomStackScreenHeader from "@components/scoreboard/CustomStackScreenHeader";
import CricketHeader from "@scoreboard/header/CricketHeader";
import CricketScoreboardBody from "@scoreboard/body/CricketScoreboardBody";
import CricketRoundInfo from "@scoreboard/round-info/CricketRoundInfo";
import CalculatorButtons from "@scoreboard/calculator-buttons/CalculatorButtons";
import gameOverAlert from "@components/GameOverAlert";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";

type CricketProps = NativeStackScreenProps<RootStackParamList, "cricket">;

const targets = [20, 19, 18, 17, 16, 15, 25];

const Cricket = ({ route, navigation }: CricketProps) => {
  // keep device awake during game
  useKeepAwake();
  const variant = route.name;
  const { onUpdatePlayerStats, setGameOver } = usePlayerStats();
  const { selectedPlayers, setSelectedPlayers } = usePlayerState();
  const { onAddGame } = useResumeGame();
  const {
    playerScore,
    setPlayerScore,
    leadingScore,
    setLeadingScore,
    changeTurns,
    round,
    setRound,
    changeRounds,
    currentPlayer,
    turn,
    setCurrentPlayer,
    setTurn,
    onDeleteInput,
    onResetGame,
    nextPlayer,
    limitNumberOfHits,
    calculateHits,
  } = useGame();

  const [undoState, { set: setUndoState, undo: undoTurn, canUndo }] =
    useUndoRedo({
      turn: 0,
      round: 1,
      player: { ...currentPlayer },
      nextPlayer: {},
      leadingScore: 0,
      disabledButtons: [] as boolean[],
      playerScore: "",
    });

  const { present: presentTurn } = undoState;

  let playerScoreArray = playerScore.split(",");

  // assign a ref to turn to enable or disable calculator buttons that are closed
  const previousTurn = useRef(-1);

  // disabled state for calculator buttons
  const [disableButton, setDisableButton] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const onHandleTurnCharge = () => {
    previousTurn.current = turn;
    // convert string array into numbers and push into current player scoreList
    playerScoreArray.forEach((score) => {
      const newScore = parseInt(score, 10);
      !isNaN(newScore) && currentPlayer.scoreList.push(newScore);
    });
    // calculate score
    const newScore = handleScoreChange(currentPlayer.scoreList);
    // determine if player has highest score
    newScore > leadingScore && setLeadingScore(newScore);
    // set player state with updated values
    setSelectedPlayers((prev) =>
      prev.map((player) => {
        if (player.id !== currentPlayer.id) return player;
        else {
          player.scoreList = currentPlayer.scoreList;
          player.score = newScore;
          if (player.stats.highScore < newScore)
            player.stats.highScore = newScore;
          player.stats.darts += 3;
          return player;
        }
      })
    );
    // check current player array for maximum marks
    const declareWinner = targets
      .map(
        (target) =>
          currentPlayer.scoreList.filter((num) => num === target).length
      )
      .every((hit) => hit >= 3);
    // if player has all marks and leading score
    if (declareWinner && currentPlayer.score >= leadingScore) {
      onDeclareWinner();
      // else change turns and rounds
    } else {
      // change turns
      changeTurns();
      // changeRounds
      changeRounds();
    }
  };

  // if player has more then three marks on a number assign score
  const handleScoreChange = (playerArray: Array<number>) => {
    let newScore: number[] = [];
    targets.forEach((target) => {
      let countedScore = playerArray.filter((hitNum) => hitNum === target);
      countedScore.splice(0, 3);
      newScore.push(countedScore.reduce((a, b) => a + b, 0));
    });

    return newScore.reduce((a, b) => a + b, 0);
  };

  const onHandleSubmit = () => {
    setUndoState({
      turn,
      round,
      player: JSON.parse(JSON.stringify(currentPlayer)),
      leadingScore,
      nextPlayer: JSON.parse(JSON.stringify(nextPlayer)),
      disabledButtons: [...disableButton],
      playerScore,
    });

    onHandleTurnCharge();
  };

  const onDeclareWinner = () => {
    selectedPlayers.forEach((player) => {
      onUpdatePlayerStats(variant, player, currentPlayer);
    });

    setGameOver({ isOver: true, game: variant });

    gameOverAlert({
      playerName: currentPlayer.name,
      onResetGame: resetGame,
      navigation,
      variant,
    });
  };

  const resetGame = (variant: PlayableGameVariants) => {
    onResetGame(variant);
    setDisableButton((prev) => prev.map((value) => (value = false)));
  };

  // disable buttons if all players have number closed
  const disableInputButtons = () => {
    if (previousTurn.current !== turn)
      // loop over target array
      for (let i = 0; i < targets.length; i++) {
        // map over playerList
        let checkNumOfMarks: number[] = selectedPlayers.map((player) => {
          // if player.id is equal to currentPlayer
          if (player.id === currentPlayer.id) {
            // make shallow copy of scorelist
            let hitArray = [...player.scoreList];
            // convert current marks to array and push into copy of player scorelist
            playerScoreArray.forEach(
              (num) =>
                !isNaN(parseInt(num, 10)) && hitArray.push(parseInt(num, 10))
            );
            // filter updated scorelist copy to determine if number should be closed
            return hitArray.filter((hitNum) => hitNum === targets[i]).length;
          }
          // if player is not current player then no need to update or copy playerlist - marks are set
          return player.scoreList.filter((hitNum) => hitNum === targets[i])
            .length;
        });
        // for each target we check against current marks
        const markClosed = checkNumOfMarks.every((num: number) => num >= 3);
        // if the marks are closed
        if (markClosed) {
          setDisableButton((prev) =>
            prev.map((value, index) =>
              // if the index is equal to the index in targets we set mark disabled
              index === i
                ? (value = true)
                : // or just return the value
                  value
            )
          );
        }
      }
    else return;
  };

  const onUndoTurn = () => {
    undoTurn();
    setSelectedPlayers((prev) =>
      prev.map((player) =>
        player.id === presentTurn.player.id ? presentTurn.player : player
      )
    );

    setCurrentPlayer(presentTurn.player);
    setTurn(presentTurn.turn);
    setRound(presentTurn.round);
    setLeadingScore(presentTurn.leadingScore);
    setDisableButton(presentTurn.disabledButtons);
    setPlayerScore(presentTurn.playerScore);
  };

  const calculatedHits = calculateHits(playerScoreArray, targets);

  useEffect(() => {
    disableInputButtons();
    limitNumberOfHits(calculatedHits);
  }, [playerScore, selectedPlayers]);

  const addGame = () => onAddGame(variant, selectedPlayers, undoState);

  const routes = navigation.getState()?.routes;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const previousScreen = routes[routes.length - 2].name;
      const resumeGameState = route.params;
      // console.log(`The routes object: `, resumeGameState);

      // console.log(`From the route prop: `, route.params);
      if (previousScreen === "resume-game" && resumeGameState !== undefined) {
        resumeGameState.undoState.past.forEach((item) => setUndoState(item));
        setUndoState(resumeGameState.undoState.present);
        setTurn(
          () =>
            (resumeGameState.undoState.present.turn + 1) %
            resumeGameState.players.length
        );
        setRound(() =>
          turn === 0
            ? resumeGameState.undoState.present.round + 1
            : resumeGameState.undoState.present.round
        );
        setCurrentPlayer(resumeGameState.undoState.present.nextPlayer);
        setLeadingScore(resumeGameState.undoState.present.leadingScore);
        setSelectedPlayers(() => resumeGameState.players);
        setDisableButton(
          () => resumeGameState.undoState.present.disabledButtons
        );
      } else return;
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <CustomStackScreenHeader
        canUndo={canUndo}
        onUndo={onUndoTurn}
        onResetGame={onResetGame}
        variant={variant}
        onAddGame={addGame}
        navigation={navigation}
      />
      <View style={styles.scoreboardContainer}>
        <CricketHeader />
        {selectedPlayers.map((player) => (
          <CricketScoreboardBody
            key={player.id}
            player={player}
            currentPlayer={currentPlayer}
            hitTargets={calculatedHits}
          />
        ))}
      </View>
      <View>
        <CricketRoundInfo
          currentPlayer={currentPlayer}
          round={round}
          leadingScore={leadingScore}
          marks={calculatedHits}
          points={handleScoreChange(
            playerScoreArray.map((item) => parseInt(item, 10))
          )}
          allMarks={calculateHits(
            currentPlayer.scoreList.map((item) => item.toString()),
            targets
          )}
        />
        <CalculatorButtons
          variant="cricket"
          value={playerScore}
          setValue={setPlayerScore}
          onHandleSubmit={onHandleSubmit}
          onDeleteInput={() => onDeleteInput(variant)}
          hitTargets={calculatedHits}
          disabled={disableButton}
        />
      </View>
    </View>
  );
};

export default Cricket;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column" },
  scoreboardContainer: { flex: 2.75, marginTop: 20 },
});
