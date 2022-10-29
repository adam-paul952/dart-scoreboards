/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList, RootStackScreenProps } from "../types";
import {
  AntDesignIcon,
  FontAwesome5Icon,
} from "../components/button-icons/ButtonIcons";

import { Pressable } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import CreateMatch from "../screens/CreateMatch";
import CreatePlayer from "../screens/CreatePlayer";
import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import ManagePlayerScreen from "../screens/ManagePlayer";
import Baseball from "../screens/Baseball";
import Cricket from "../screens/Cricket";
import X01 from "../screens/X01";
import Elimination from "../screens/Elimination";
import Killer from "../screens/Killer";
import Statistics from "../screens/Statistics";
import ResumeGame from "../screens/ResumeGame";
import X01OutChart from "../screens/X01OutChart";
import KillerSetup from "../screens/KillerSetup";
import DisplayStatistics from "../screens/statistics/DisplayStatistics";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator>
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
          options={{ title: "Baseball" }}
        />
        <Stack.Screen
          name="cricket"
          component={Cricket}
          options={{ title: "Cricket" }}
        />
        <Stack.Screen
          name="x01"
          component={X01}
          options={({ navigation, route }: RootStackScreenProps<"x01">) => ({
            title: "X01",
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("x01-outchart")}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                  { position: "absolute", bottom: -13, right: 5 },
                ]}
                accessibilityHint="x01-outshot-left"
              >
                <FontAwesome5Icon
                  name="clipboard-list"
                  size={23}
                  color={Colors[colorScheme].text}
                />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="elimination"
          component={Elimination}
          options={{ title: "Elimination" }}
        />
        <Stack.Screen
          name="killer"
          component={Killer}
          options={{ title: "Killer" }}
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
