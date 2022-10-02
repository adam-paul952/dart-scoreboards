import React from "react";

import { StyleSheet } from "react-native";
import { Text, TextInput, View } from "@components/Themed";
import { possibleOutShots } from "../../constants/data/x01OutShots";

interface IX01InputRowProps {
  playerScore: string;
  inputError: boolean;
  currentPlayerScore: number;
}

const X01InputRow = (props: IX01InputRowProps) => {
  const { playerScore, inputError, currentPlayerScore } = props;
  const possibleOut = possibleOutShots.find(
    ({ score }) => currentPlayerScore === score
  );

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <View style={{ flex: 0.65, paddingLeft: 10 }}>
        <TextInput
          style={
            inputError
              ? [styles.scoreInput, styles.scoreInputError]
              : styles.scoreInput
          }
          maxLength={3}
          value={playerScore}
        />
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {possibleOut !== undefined ? (
          possibleOut.checkOut.map((out: any) =>
            out.includes("No Check Out") ? (
              <React.Fragment key={possibleOut.score}>
                <Text
                  style={[
                    styles.outShotScore,
                    { backgroundColor: "rgba(255,0,0,0.3)" },
                  ]}
                >
                  {possibleOut.score}
                </Text>
                <Text style={styles.outShotText}>{out}</Text>
              </React.Fragment>
            ) : (
              <React.Fragment key={possibleOut.score}>
                <Text style={styles.outShotScore}>{possibleOut.score}</Text>
                <Text style={styles.outShotText}>{out.join(" -> ")}</Text>
              </React.Fragment>
            )
          )
        ) : (
          <Text style={{ fontSize: 20, paddingBottom: 20 }}>
            No Outshots Available
          </Text>
        )}
      </View>
    </View>
  );
};

export default X01InputRow;

const styles = StyleSheet.create({
  scoreInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    height: 70,
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
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "gray",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#4BB543",
    height: 70,
  },
  outShotText: { fontSize: 20, paddingBottom: 10 },
});
