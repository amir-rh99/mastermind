import { useEffect } from "react";
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useState,
} from "react";

import { IGameStorageData } from "./core/types";
import { getGameData } from "./core/game.controller";

const defaultValue: IGameStorageData = getGameData()

type UpdateType = Dispatch<SetStateAction<IGameStorageData>>;
const defaultUpdate: UpdateType = () => defaultValue;

const GameContext = createContext({
    game: defaultValue,
    setGame: defaultUpdate,
});

function GameProvider(props: PropsWithChildren<{}>) {
    const [game, setGame] = useState(defaultValue);

    useEffect(() => {
        
    }, [game])

    return <GameContext.Provider value={{ game, setGame }} {...props} />;
}

export {
    GameProvider, GameContext
}