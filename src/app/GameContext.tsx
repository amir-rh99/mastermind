import { createContext, useEffect, PropsWithChildren } from "react"

const GameContext = createContext(null)

const GameProvider = (props: PropsWithChildren) => {
    useEffect(() => {
        // const game = 
    }, [])

    return(
        <GameContext.Provider value={null}>
            {props.children}
        </GameContext.Provider>
    )
}

export {
    GameProvider, GameContext
}