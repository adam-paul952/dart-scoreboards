import { Alert } from "react-native";

const gameOverAlert = ({
  playerName,
  resetGame,
  navigation,
}: {
  playerName: string;
  resetGame: () => void;
  navigation: any;
}) => {
  return Alert.alert(
    "Game Over",
    `${playerName} has won the game!\n\nCongratulations!`,
    [
      {
        text: "Create Match",
        onPress: () => {
          resetGame();
          navigation.navigate("create-match");
        },
        style: "cancel",
      },
      { text: "Play Again", onPress: () => resetGame() },
    ]
  );
};

export default gameOverAlert;
