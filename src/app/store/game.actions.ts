type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
      ? {
          type: Key;
        }
      : {
          type: Key;
          payload: M[Key];
        }
};

export enum ActionTypes {
    SetColor = "SET_COLOR",
    SetColumnActive = "SET_COLUMN_ACTIVE",
    SearchForNextPossibleActiveColumn = "SEARCH_FOR_NEXT_POSSIBLE_ACTIVE_COLUMN",
    CheckSolution = "CHECK_SOLUTION"
}

type GamePayload = {
    [ActionTypes.SetColor]: string,
    [ActionTypes.SetColumnActive]: number,
    [ActionTypes.SearchForNextPossibleActiveColumn] : undefined
    [ActionTypes.CheckSolution] : undefined
}

export type GameActions = ActionMap<GamePayload>[keyof ActionMap<GamePayload>];