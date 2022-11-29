/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList, RootStackScreenProps } from "../types";
import { Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import CreateMatch from "../screens/CreateMatch";
import CreatePlayer from "../screens/CreatePlayer";
import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import ManagePlayerScreen from "../screens/ManagePlayer";
import Baseball from "../screens/games/Baseball";
import Cricket from "../screens/games/Cricket";
import X01 from "../screens/games/X01";
import Elimination from "../screens/games/Elimination";
import Killer from "../screens/games/Killer";
import Statistics from "../screens/Statistics";
import ResumeGame from "../screens/ResumeGame";
import X01OutChart from "../screens/games/X01OutChart";
import KillerSetup from "../screens/games/KillerSetup";
import DisplayStatistics from "../screens/statistics/DisplayStatistics";

import { AntDesignIcon } from "../components/button-icons/ButtonIcons";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors[colorScheme].background },
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
        <Stack.Screen
          name="manage-players"
          component={ManagePlayerScreen}
          options={({
            navigation,
            route,
          }: RootStackScreenProps<"manage-players">) => ({
            title: "Manage Players",
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("create-player")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
                accessibilityHint="add-player"
              >
                <AntDesignIcon
                  name="adduser"
                  size={25}
                  color={Colors[colorScheme].text}
                />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="create-match"
          component={CreateMatch}
          options={{ title: "Create Match" }}
        />
        <Stack.Screen
          name="create-player"
          component={CreatePlayer}
          options={{ title: "Create New Player" }}
        />
        <Stack.Screen
          name="baseball"
          component={Baseball}
          options={{ title: "Baseball", headerShown: false }}
        />
        <Stack.Screen
          name="cricket"
          component={Cricket}
          options={{ title: "Cricket", headerShown: false }}
        />
        <Stack.Screen
          name="x01"
          component={X01}
          options={{ title: "X01", headerShown: false }}
        />
        <Stack.Screen
          name="elimination"
          component={Elimination}
          options={{ title: "Elimination", headerShown: false }}
        />
        <Stack.Screen
          name="killer"
          component={Killer}
          options={{ title: "Killer", headerShown: false }}
        />
        <Stack.Screen
          name="statistics"
          component={Statistics}
          options={{ title: "Stats" }}
        />
        <Stack.Screen
          name="resume-game"
          component={ResumeGame}
          options={{ title: "Resume Game" }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="x01-outchart"
          component={X01OutChart}
          options={{ title: "X01 Out Chart" }}
        />
        <Stack.Screen
          name="killer-setup"
          component={KillerSetup}
          options={{
            title: "Killer Setup",
            // headerBackVisible: false
          }}
        />
        <Stack.Screen
          name="display-statistics"
          component={DisplayStatistics}
          options={{ title: "Statistics" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootNavigator;
