import { Alert } from "react-native";

import { PlayableGameVariants } from "../hooks/useGame";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { RootStackParamList } from "types";

interface GameOverAlertProps {
  playerName: string;
  onResetGame: (variant: PlayableGameVariants, assignedLives?: number) => void;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    PlayableGameVariants,
    undefined
  >;
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
