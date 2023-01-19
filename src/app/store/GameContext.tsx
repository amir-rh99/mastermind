import React, { createContext, PropsWithChildren, useReducer, useEffect, useState } from "react"

import GameReducer from "./game.reducer";

import { IGameStorageData, ThemeMode } from "../core/types";
import { getGame, LocalStorage } from "../core/game.controller"
import { Config } from "@app/core/game.config"
import { GameActions } from "./game.actions";

const defaultValue: IGameStorageData = getGame("default")
let defaultTheme: ThemeMode = "light"

// check theme in localStorage and media-theme
const LocalStorageTheme = localStorage.getItem(Config.GameStorageThemeName)
if(LocalStorageTheme && (LocalStorageTheme == "dark" || LocalStorageTheme == "light")) defaultTheme = LocalStorageTheme
else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) defaultTheme = "dark"

const GameContext = createContext<{
    game: IGameStorageData,
    dispatch: React.Dispatch<GameActions>,
    theme: ThemeMode,
    setTheme: React.Dispatch<ThemeMode>
}>({
    game: defaultValue,
    dispatch: () => {},
    theme: defaultTheme,
    setTheme: () => {}
})
 
function GameProvider(props: PropsWithChildren) {

    const [game, dispatch] = useReducer(GameReducer, defaultValue);
    const [theme, setTheme] = useState(defaultTheme)

    useEffect(()=>{
        LocalStorage().write(game)
    }, [game])
    
    useEffect(() => {
        document.body.setAttribute("data-theme", theme)
        localStorage.setItem(Config.GameStorageThemeName, theme)
    }, [theme])

    return <GameContext.Provider value={{ game, dispatch, theme, setTheme }} {...props} />;
}

export {
    GameProvider, GameContext
}