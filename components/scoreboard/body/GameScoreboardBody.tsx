import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Text, View } from "@components/Themed";
import CricketScoreboardColumn from "./CricketScoreboardColumn";

import Colors from "../../../constants/Colors";
import useColorScheme from "../../../hooks/useColorScheme";

import { IPlayer } from "@context/PlayerContext";
import { PlayableGameVariants } from "../../../hooks/useGame";

interface GameScoreboardBodyProps {
  variant: PlayableGameVariants;
  selectedPlayers: Array<IPlayer>;
  currentPlayer: number;
  playersOut?: Array<IPlayer>;
  hitTargets?: Array<number>;
}

const GameScoreboardBody = (props: GameScoreboardBodyProps) => {
  const { selectedPlayers, currentPlayer, playersOut, variant, hitTargets } =
    props;
  const colorScheme = useColorScheme();
  const activePlayerColor = Colors[colorScheme].activePlayer;
  const hitMarkColor = Colors[colorScheme].text;

  const playerStrikeThrough = (player: IPlayer) => {
    (variant === "baseball" &&
      playersOut !== undefined &&
      playersOut.some((item) => item.id === player.id)) ||
    (variant === "elimination" && player.lives === 0) ? (
      <View style={styles.strikeThrough} />
    ) : null;
  };

  return (
    <>
      {selectedPlayers.map((player) => (
        <View
          key={player.id}
          style={[
            styles.playerRow,
            player.id === currentPlayer
              ? { backgroundColor: activePlayerColor }
              : {},
            variant === "baseball"
              ? styles.baseballPlayerRow
              : variant === "cricket"
              ? styles.cricketPlayerRow
              : variant === "elimination"
              ? styles.eliminationPlayerRow
              : variant === "killer"
              ? styles.killerPlayerRow
              : null,
          ]}
        >
          <>
            {playerStrikeThrough(player)}

            <View
              style={[
                styles.playerColumn,
                variant === "baseball"
                  ? styles.baseballPlayerColumn
                  : variant === "cricket"
                  ? styles.cricketPlayerColumn
                  : variant === "elimination"
                  ? styles.eliminationPlayerColumn
                  : variant === "killer"
                  ? {
                      flex: 2.1,
                    }
                  : styles.x01PlayerColumn,
              ]}
            >
              <Text
                style={[
                  styles.textStyle,
                  { paddingLeft: 3 },
                  variant === "cricket"
                    ? { flex: 3 }
                    : variant === "x01"
                    ? {
                        flex: 4,
                        backgroundColor: "transparent",
                        // textAlign: "center",
                        // fontSize: 20,
                      }
                    : variant === "killer"
                    ? { textAlign: "left" }
                    : null,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {player.name}
              </Text>
            </View>

            {variant === "baseball"
              ? player.scoreList.map((score, index) => (
                  <View
                    key={player.id * 25 + index}
                    style={[{ backgroundColor: "transparent", flex: 1 }]}
                  >
                    <Text style={styles.textStyle}>{score}</Text>
                  </View>
                ))
              : null}

            {variant === "cricket" && player.id === currentPlayer ? (
              <CricketScoreboardColumn
                player={player}
                hitTargets={hitTargets}
                hitMarkColor={hitMarkColor}
              />
            ) : variant === "cricket" && player.id !== currentPlayer ? (
              <CricketScoreboardColumn
                player={player}
                hitMarkColor={hitMarkColor}
              />
            ) : null}

            <View
              style={[
                { backgroundColor: "transparent" },
                variant === "baseball"
                  ? { flex: 1.5 }
                  : variant === "cricket"
                  ? { flex: 1 }
                  : variant === "elimination"
                  ? { flex: 0.6 }
                  : variant === "x01"
                  ? { flexDirection: "row", flex: 1 }
                  : variant === "killer"
                  ? { flex: 1 }
                  : null,
              ]}
            >
              {variant === "x01" ? (
                <Text style={[styles.textStyle, { flex: 1 }]}>0</Text>
              ) : null}

              <Text
                style={[
                  styles.textStyle,
                  variant === "x01" ? { flex: 1 } : null,
                ]}
              >
                {player.score}
              </Text>
            </View>

            {variant === "elimination" || variant === "killer" ? (
              <View
                style={[
                  { backgroundColor: "transparent" },
                  variant === "elimination" ? { flex: 0.6 } : { flex: 1 },
                ]}
              >
                <Text
                  style={[
                    styles.textStyle,
                    variant === "elimination"
                      ? { paddingLeft: 10 }
                      : {
                          //   flex: 1, backgroundColor: "transparent",
                        },
                  ]}
                >
                  {player.lives}
                </Text>
              </View>
            ) : null}

            {variant === "killer" ? (
              <View style={{ flex: 1, backgroundColor: "transparent" }}>
                <Text style={styles.textStyle}>
                  {player.killer === true ? (
                    <Ionicons
                      name="checkmark"
                      size={24}
                      color={Colors[colorScheme].text}
                    />
                  ) : (
                    ""
                  )}
                </Text>
              </View>
            ) : null}
          </>
        </View>
      ))}
    </>
  );
};

export default GameScoreboardBody;

const styles = StyleSheet.create({
  strikeThrough: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "105%",
    position: "absolute",
    top: "55%",
    left: "-2%",
  },
  playerRow: {
    flexDirection: "row",
  },
  baseballPlayerRow: {
    justifyContent: "space-evenly",
    padding: 2,
    position: "relative",
  },
  cricketPlayerRow: {
    marginHorizontal: 5,
  },
  eliminationPlayerRow: {
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
    position: "relative",
  },
  killerPlayerRow: {
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
  playerColumn: {
    backgroundColor: "transparent",
  },
  baseballPlayerColumn: { flex: 3 },
  cricketPlayerColumn: {
    flex: 2,
  },
  eliminationPlayerColumn: {
    flexDirection: "row",
    flex: 1.3,
    marginLeft: 2,
  },
  killerPlayerColumn: {
    // flexDirection: "row",
    // justifyContent: "space-evenly",
    // flex: 2,
    // marginLeft: 2,
    // backgroundColor: "purple",
  },
  x01PlayerColumn: {
    flex: 1,
    flexDirection: "row",
  },
  scoreColumn: {},
  textStyle: { fontSize: 18, textAlign: "center" },
});
