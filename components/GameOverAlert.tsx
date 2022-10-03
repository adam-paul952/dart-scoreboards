import { Alert } from "react-native";

// import { useNavigation } from "@react-navigation/native";

const gameOverAlert = ({
  playerName,
  resetGame,
  navigation,
}: {
  playerName: string;
  resetGame: () => void;
  navigation: any;
}) => {
  //   const navigation = useNavigation();
  return Alert.alert(
    "Game Over",
    `${playerName} has won the game!\n\nCongratulations!`,
    [
      {
        text: "Create Match",
        onPress: () => navigation.goBack(),
        style: "cancel",
      },
      { text: "Play Again", onPress: () => resetGame() },
    ]
  );
};

export default gameOverAlert;
