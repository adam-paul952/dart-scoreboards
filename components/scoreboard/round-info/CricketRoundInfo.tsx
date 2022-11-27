import React from "react";
import { StyleSheet } from "react-native";

import { Text, TextInput, View } from "@components/Themed";

import { IPlayer } from "@context/PlayerContext";

interface CricketRoundInfoProps {
  currentPlayer: IPlayer;
  round: number;
  leadingScore: number;
  marks: Array<number>;
  points: number;
  allMarks: Array<number>;
}

const CricketRoundInfo = (props: CricketRoundInfoProps) => {
  const { currentPlayer, round, leadingScore, marks, points, allMarks } = props;

  const mapMarks = (number: number) => (number > 3 ? 3 : number);
  const reduceMarks = (first: number, second: number) => first + second;

  const scoreDifference = points + currentPlayer.score - leadingScore;
  const currentPoints = points + currentPlayer.score;

  let displayScore =
    Math.sign(scoreDifference) === 0 || Math.sign(scoreDifference) === 1
      ? currentPoints
      : scoreDifference;

  const numOfMarks = marks.reduce(reduceMarks, 0);
  const totalMarks =
    allMarks.map(mapMarks).reduce(reduceMarks, 0) +
    marks.map(mapMarks).reduce(reduceMarks, 0);

  let pointsPerRound = (points + currentPlayer.score) / round;

  const marksPerRound =
    ((allMarks.reduce(reduceMarks, 0) + numOfMarks) / (round * 3)) * 3;

  return (
    <>
      <View style={styles.currentTurnInfoContainer}>
        <View style={styles.currentTurnInfoColumn}>
          <Text style={styles.currentTurnInfoText}>{currentPlayer.name}</Text>
          <TextInput
            style={[
              Math.sign(scoreDifference) === 0
                ? { backgroundColor: "transparent" }
                : Math.sign(scoreDifference) === 1
                ? { backgroundColor: "rgba(75,181,67, 0.4)" }
                : { backgroundColor: "rgba(255,0,0,0.2)" },
              styles.scoreInput,
            ]}
            editable={false}
            showSoftInputOnFocus={false}
            textAlign="center"
            value={`${displayScore} pts`}
          />
        </View>
        <View style={styles.currentTurnInfoColumn}>
          <Text style={styles.currentTurnInfoText}>Marks</Text>
          <TextInput
            style={styles.scoreInput}
            editable={false}
            showSoftInputOnFocus={false}
            value={numOfMarks.toString()}
            textAlign="center"
          />
        </View>
        <View style={styles.currentTurnInfoColumn}>
          <Text style={styles.currentTurnInfoText}>Points</Text>
          <TextInput
            style={styles.scoreInput}
            editable={false}
            showSoftInputOnFocus={false}
            value={points.toString()}
            textAlign="center"
          />
        </View>
      </View>
      <View style={styles.roundStatsContainer}>
        <Text style={styles.roundStatsText}>Round: {round}</Text>
        <Text style={styles.roundStatsText}>
          mks/r: {marksPerRound.toFixed(1)}
        </Text>
        <Text style={styles.roundStatsText}>
          pts/r: {pointsPerRound.toFixed(1)}
        </Text>
        <Text style={styles.roundStatsText}>mks: {totalMarks}/21</Text>
      </View>
    </>
  );
};

export default CricketRoundInfo;

const styles = StyleSheet.create({
  currentTurnInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  currentTurnInfoColumn: { width: "33%", paddingHorizontal: 5 },
  currentTurnInfoText: { fontSize: 20, paddingHorizontal: 5 },
  scoreInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    height: 50,
    padding: 10,
    fontSize: 20,
    borderRadius: 15,
  },
  roundStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: "lightgray",
  },
  roundStatsText: { fontSize: 15 },
});
