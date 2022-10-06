import React from "react";

import { StyleSheet } from "react-native";

import { Text, TextInput, View } from "@components/Themed";
import { IPlayer } from "@context/PlayerContext";

interface ICricketRoundInfoProps {
  currentPlayer: IPlayer;
  round: number;
  leadingScore: number;
  marks: Array<number>;
}

const CricketRoundInfo = (props: ICricketRoundInfoProps) => {
  const { currentPlayer, round, leadingScore, marks } = props;

  const scoreDifference = currentPlayer.score - leadingScore;
  const numOfMarks = marks.reduce((a, b) => a + b, 0);

  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ width: "33%", paddingHorizontal: 5 }}>
          <Text style={{ fontSize: 20, paddingHorizontal: 5 }}>
            {currentPlayer.name}
          </Text>
          <TextInput
            style={styles.scoreInput}
            editable={false}
            showSoftInputOnFocus={false}
            textAlign="center"
            value={`${scoreDifference} pts`}
          />
        </View>
        <View style={{ width: "33%", paddingHorizontal: 5 }}>
          <Text style={{ fontSize: 20, paddingHorizontal: 5 }}>Marks</Text>
          <TextInput
            style={styles.scoreInput}
            editable={false}
            showSoftInputOnFocus={false}
            value={numOfMarks.toString()}
            textAlign="center"
          />
        </View>
        <View style={{ width: "33%", paddingHorizontal: 5 }}>
          <Text style={{ fontSize: 20, paddingHorizontal: 5 }}>Points</Text>
          <TextInput
            style={styles.scoreInput}
            editable={false}
            showSoftInputOnFocus={false}
            value="0"
            textAlign="center"
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          paddingVertical: 5,
        }}
      >
        <Text style={{ fontSize: 15 }}>Round: {round}</Text>
        <Text>mks/r: --</Text>
        <Text>pts/r: --</Text>
        <Text>mks: --/21</Text>
      </View>
    </>
  );
};

export default CricketRoundInfo;

const styles = StyleSheet.create({
  scoreInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    height: 50,
    padding: 10,
    fontSize: 20,
    borderRadius: 15,
  },
});
