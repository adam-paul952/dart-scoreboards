import React from "react";
import { StyleSheet } from "react-native";

import { Text, TextInput, View } from "@components/Themed";

import { possibleOutShots } from "../../constants/data/x01OutShots";

import { IPlayer } from "@context/PlayerContext";

interface X01InputRowProps {
  playerScore: string;
  inputError: boolean;
  currentPlayer: IPlayer;
}

interface OutshotProps {
  possibleOut: {
    score: number;
    checkOut: string[][];
  };
}

const X01InputRow = (props: X01InputRowProps) => {
  const { playerScore, inputError, currentPlayer } = props;

  const possibleOut = possibleOutShots.find(
    ({ score }) => currentPlayer.score === score
  );

  return (
    <>
      <View style={{ paddingHorizontal: 10 }}>
        <Text
          style={{
            fontWeight: "600",
            textDecorationLine: "underline",
            fontSize: 20,
            padding: 5,
          }}
        >
          {currentPlayer.name} to throw
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <TextInput
            style={
              inputError
                ? [styles.scoreInput, styles.scoreInputError]
                : styles.scoreInput
            }
            maxLength={3}
            value={playerScore}
            editable={false}
          />
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            justifyContent: "center",
            paddingHorizontal: 5,
          }}
        >
          {possibleOut !== undefined ? (
            possibleOut.checkOut[0].includes("No Check Out") ? (
              <OutshotError possibleOut={possibleOut} />
            ) : (
              <PossibleOuts possibleOut={possibleOut} />
            )
          ) : (
            <NoOutshots />
          )}
        </View>
      </View>
    </>
  );
};

export default X01InputRow;

const PossibleOuts = ({ possibleOut }: OutshotProps) => {
  return (
    <>
      <TextInput
        style={[
          styles.scoreInput,
          {
            backgroundColor: "rgba(75,181,67, 0.4)",
            flex: 0.75,
            alignSelf: "center",
          },
        ]}
        maxLength={3}
        value={possibleOut.score.toString()}
        editable={false}
      />
      <View
        style={{
          flexDirection: "column",
          paddingBottom: 5,
          flex: 1.25,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {possibleOut.checkOut.map((out, index) => {
          let displayOut = out.includes("")
            ? out.filter((value) => value !== "")
            : out;
          return (
            <React.Fragment key={possibleOut.score + index}>
              <Text style={[styles.outShotText, { paddingLeft: 4 }]}>
                {displayOut.join(" - ")}
              </Text>
            </React.Fragment>
          );
        })}
      </View>
    </>
  );
};

const OutshotError = ({ possibleOut }: OutshotProps) => {
  return (
    <>
      <TextInput
        style={[styles.scoreInput, styles.scoreInputError, { flex: 0.5 }]}
        maxLength={3}
        value={possibleOut.score.toString()}
        editable={false}
      />
      <Text style={[styles.outShotText]}>{possibleOut.checkOut[0][0]}</Text>
    </>
  );
};

const NoOutshots = () => (
  <Text style={{ fontSize: 20, paddingBottom: 20 }}>No Outshots Available</Text>
);

const styles = StyleSheet.create({
  scoreInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    height: 60,
    padding: 10,
    fontSize: 25,
    borderRadius: 15,
    textAlign: "center",
    fontWeight: "600",
  },
  scoreInputError: {
    borderColor: "red",
    backgroundColor: "rgba(255,0,0,0.2)",
    color: "red",
    fontWeight: "600",
  },
  outShotScore: {
    fontSize: 35,
    borderWidth: 2,
    borderColor: "gray",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#4BB543",
    height: 70,
  },
  outShotText: { fontSize: 20 },
});
