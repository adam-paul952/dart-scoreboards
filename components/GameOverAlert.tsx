import { Alert } from "react-native";

import { PlayableGameVariants } from "../hooks/useGame";

interface GameOverAlertProps {
  playerName: string;
  onResetGame: (variant: PlayableGameVariants, assignedLives?: number) => void;
  navigation: any;
  variant: PlayableGameVariants;
  assignedLives?: number;
}

const gameOverAlert = ({
  playerName,
  onResetGame,
  navigation,
  variant,
  assignedLives,
}: GameOverAlertProps) => {
  let resetGameFunc =
    assignedLives !== undefined
      ? onResetGame(variant, assignedLives)
      : onResetGame(variant);

  return Alert.alert(
    "Game Over",
    `${playerName} has won the game!\n\nCongratulations!`,
    [
      {
        text: "Create Match",
        onPress: () => {
          onResetGame(variant);
          navigation.navigate("create-match");
        },
        style: "cancel",
      },
      { text: "Play Again", onPress: () => resetGameFunc },
    ]
  );
};

export default gameOverAlert;
