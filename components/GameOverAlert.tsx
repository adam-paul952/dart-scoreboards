import { Alert } from "react-native";

const gameOverAlert = ({
  playerName,
  onResetGame,
  navigation,
}: {
  playerName: string;
  onResetGame: () => void;
  navigation: any;
}) => {
  return Alert.alert(
    "Game Over",
    `${playerName} has won the game!\n\nCongratulations!`,
    [
      {
        text: "Create Match",
        onPress: () => {
          onResetGame();
          navigation.navigate("create-match");
        },
        style: "cancel",
      },
      { text: "Play Again", onPress: () => onResetGame() },
    ]
  );
};

export default gameOverAlert;
