/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList, RootStackScreenProps } from "../types";
import { AntDesign } from "@expo/vector-icons";

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

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator>
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
              <AntDesign
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
      <Stack.Screen name="x01" component={X01} options={{ title: "X01" }} />
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
      {/* <Stack.Group screenOptions={{ presentation: "modal" }}></Stack.Group> */}
    </Stack.Navigator>
  );
};

export default RootNavigator;
