import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PlayerListProvider } from "./context/PlayerContext";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PlayerListProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </PlayerListProvider>
      </SafeAreaProvider>
    );
  }
};

export default App;
