import React from "react";

import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import CricketScoreboardColumn from "./CricketScoreboardColumn";
import { Text, View } from "../../Themed";
import { IPlayer } from "@context/PlayerContext";

interface ICricketScoreboardBodyProps {
  player: IPlayer;
  currentPlayer: IPlayer;
  // hitTargets: Array<number>;
}

const CricketScoreboardBody = (props: ICricketScoreboardBodyProps) => {
  const { player, currentPlayer } = props;

  return (
    <View style={styles.playerRow}>
      <View
        style={[
          styles.playerColumn,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <Text style={[styles.scoreboardText, { flex: 2 }]}>{player.name}</Text>
        {player.id === currentPlayer.id && (
          <AntDesign name="caretleft" size={18} color="darkred" />
        )}
      </View>
      <CricketScoreboardColumn player={player} />
      <Text style={[styles.scoreboardText, { flex: 1, textAlign: "center" }]}>
        {player.score}
      </Text>
    </View>
  );
};

export default CricketScoreboardBody;

const styles = StyleSheet.create({
  scoreboardText: { paddingLeft: 2, fontSize: 20 },
  playerRow: { flexDirection: "row", marginHorizontal: 5 },
  playerColumn: {
    flex: 2,
    borderRightColor: "gray",
    borderRightWidth: 1,
  },
});
