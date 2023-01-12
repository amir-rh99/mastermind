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
    CheckSolution = "CHECK_SOLUTION",
    SetColorWithIndex = "SET_COLOR_WITH_INDEX",
    MoveActiveColumn = "MOVE_ACTIVE_COLUMN",
    Restart = "RESTART"
}

type GamePayload = {
    [ActionTypes.SetColor]: string
    [ActionTypes.SetColumnActive]: number
    [ActionTypes.SearchForNextPossibleActiveColumn] : undefined
    [ActionTypes.CheckSolution] : undefined
    [ActionTypes.SetColorWithIndex] : number
    [ActionTypes.MoveActiveColumn] : "left" | "right" | "back"
    [ActionTypes.Restart] : undefined
}

export type GameActions = ActionMap<GamePayload>[keyof ActionMap<GamePayload>];