/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoadResumeGameState } from "./hooks/useResumeGame";
import { GameUndoState, StateToPass } from "./screens/ResumeGame";
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type GameVariants =
  | "overall"
  | "baseball"
  | "cricket"
  | "elimination"
  | "killer"
  | "x01";

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  NotFound: undefined;
  "create-player": undefined;
  "manage-players": undefined;
  "create-match": undefined;
  baseball: StateToPass | undefined;
  cricket: StateToPass | undefined;
  elimination: undefined;
  x01: undefined;
  killer: { playerTargets: Array<number> };
  statistics: undefined;
  "resume-game": undefined;
  "x01-outchart": { currentPlayerScore?: number };
  "killer-setup": undefined;
  "display-statistics": { variant: GameVariants };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  landing: undefined;
  rules: undefined;
  settings: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
