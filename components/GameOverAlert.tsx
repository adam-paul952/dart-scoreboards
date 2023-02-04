import { Alert } from "react-native";

import { PlayableGameVariants } from "../hooks/useGame";

import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { RootStackParamList } from "types";

interface GameOverAlertProps {
  winner: {
    id: number;
    name: string;
  };
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    PlayableGameVariants,
    undefined
  >;
  variant: PlayableGameVariants;
  undo: () => void;
  gameEnd: (variant: PlayableGameVariants) => void;
  assignedLives?: number;
}

const gameOverAlert = ({
  winner,
  navigation,
  undo,
  gameEnd,
  variant,
}: GameOverAlertProps) => {
  const callUndo = () => {
    console.log(`Undo called from alert`);

    undo();
  };

  return Alert.alert(
    "Game Over",
    `${winner.name} has won the game!\n\nCongratulations!`,
    [
      {
        text: "Undo Last",
        onPress: callUndo,
      },
      {
        text: "Create New",
        onPress: () => {
          gameEnd(variant);
          navigation.navigate("create-match");
        },
        style: "cancel",
      },
      {
        text: "Rematch",
        onPress: () => gameEnd(variant),
      },
    ],
    {
      cancelable: true,
      onDismiss: () => callUndo(),
      // onDismiss: () =>
      //   Alert.alert(
      //     "This alert was dismissed by tapping outside of the alert dialog."
      //   ),
    }
  );
};

export default gameOverAlert;
