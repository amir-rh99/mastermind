import React, { createContext, PropsWithChildren, useReducer, useEffect } from "react"

import GameReducer from "./store/game.reducer";

import { IGameStorageData } from "./core/types";
import { getGameData } from "./core/game.controller";
import { GameActions } from "./store/game.actions";

const defaultValue: IGameStorageData = getGameData()

const GameContext = createContext<{
    game: IGameStorageData,
    dispatch: React.Dispatch<GameActions>
}>({
    game: defaultValue,
    dispatch: () => {}
})

function GameProvider(props: PropsWithChildren) {

    const [game, dispatch] = useReducer(GameReducer, defaultValue);

    useEffect(() => {
        
    }, [game])

    return <GameContext.Provider value={{ game, dispatch }} {...props} />;
}

export {
    GameProvider, GameContext
}