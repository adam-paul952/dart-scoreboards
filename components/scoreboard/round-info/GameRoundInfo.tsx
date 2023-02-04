import React from "react";

import { StyleSheet } from "react-native";
import { Text, TextInput, View } from "@components/Themed";
import { IPlayer } from "@context/PlayerContext";

interface GameRoundInfoProps {
  round: number;
  currentPlayer: IPlayer;
  playerScore: string;
  leadingScore: number;
}

const GameRoundInfo = (props: GameRoundInfoProps) => {
  const { round, currentPlayer, playerScore, leadingScore } = props;

  const scoreDifference = currentPlayer.score - leadingScore;

  return (
    <>
      <View>
        <View>
          <Text>{currentPlayer.name} to throw</Text>
        </View>
      </View>
      <View>
        <View>
          <TextInput
            editable={false}
            showSoftInputOnFocus={false}
            textAlign="center"
            value={`${scoreDifference} pts`}
          />
        </View>
      </View>
    </>
  );
};

export default GameRoundInfo;

const styles = StyleSheet.create({});
