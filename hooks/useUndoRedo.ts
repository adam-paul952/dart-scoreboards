import React, { useCallback, useReducer } from "react";

enum ActionType {
  undo = "undo",
  redo = "redo",
  set = "set",
}

export interface Actions<T> {
  set: (newPresent: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

interface State<T> {
  past: T[];
  present: T;
  future: T[];
}

interface Action<T> {
  type: ActionType;
  newPresent?: T;
}

const reducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { type, newPresent } = action;

  switch (type) {
    case ActionType.undo: {
      if (past.length === 0) {
        return state;
      }
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }

    case ActionType.redo: {
      if (future.length === 0) {
        return state;
      }
      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }

    case ActionType.set: {
      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }
    default:
      return state;
  }
};

const initialState = {
  past: [],
  present: null,
  future: [],
};

const useUndoRedo = <T>(initialPresent: T): [State<T>, Actions<T>] => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    present: initialPresent,
  }) as [State<T>, React.Dispatch<Action<T>>];

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    if (canUndo) dispatch({ type: ActionType.undo });
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) dispatch({ type: ActionType.redo });
  }, [canRedo]);

  const set = useCallback(
    (newPresent: T) => dispatch({ type: ActionType.set, newPresent }),
    []
  );

  return [state, { set, undo, redo, canUndo, canRedo }];
};

export default useUndoRedo;
