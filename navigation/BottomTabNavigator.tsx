/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import Landing from "../screens/Landing";

import Rules from "../screens/Rules";
import Settings from "../screens/Settings";
import {
  TabBarIconHome,
  TabBarIconRules,
  TabBarIconSettings,
} from "./tabBarIcons/TabBarIcon";

import { RootTabParamList } from "../types";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="landing"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerStyle: { backgroundColor: Colors[colorScheme].background },
      }}
    >
      <BottomTab.Screen
        name="landing"
        component={Landing}
        options={() => ({
          title: "Dart Scoreboard",
          tabBarIcon: ({ color }) => (
            <TabBarIconHome name="target" color={color} />
          ),
        })}
      />

      <BottomTab.Screen
        name="rules"
        component={Rules}
        options={{
          title: "Rules",
          tabBarIcon: ({ color }) => (
            <TabBarIconRules name="text-document" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="settings"
        component={Settings}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <TabBarIconSettings name="settings-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
