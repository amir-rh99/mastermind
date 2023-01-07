import Config from "./game.config"
import { GameModelType, IGame } from "./types"
import { createData, getData } from "./game.storage"

const { GameModels, Colors } = Config

const createGame = (requestedModel: GameModelType): IGame => {
    let type = GameModels.model_2

    if(requestedModel in GameModels) type = GameModels[requestedModel]

    const gameTarget = createGameTarget(type.size)
    const now = new Date()

    const newGame: IGame = {
        target: gameTarget, model: { size: type.size, chance: type.chance }, createdAt: now
    }

    createData().currentGame(newGame)
    return newGame
}

const getCurrentGame = (): IGame | null => {
    const currentGame = getData("currentGame")
    return currentGame
}

const getGame = (type: GameModelType): IGame => {
    return getCurrentGame() || createGame(type)
}

const createGameTarget = (size: number): string[] => {
    const shuffleColors = [...Colors.sort(() => 0.5 - Math.random()).splice(0, size)]
    return shuffleColors
}

export {
    getGame
}