import { GameModelType, IGame, IGameStorageData } from "./types"
import { Config, InitialData } from "./game.config"

const { GameStorageName, GameModels } = Config

const createGame = (requestedModel: GameModelType): IGame => {
    let type = GameModels.model_2

    if(requestedModel in GameModels) type = GameModels[requestedModel]

    const gameTarget = createGameTarget(type.size)
    const now = new Date()

    const newGame: IGame = {
        target: gameTarget, model: { size: type.size, chance: type.chance }, createdAt: now
    }

    return newGame
}

const getGame = (type: "default" | "new" = "default"): IGameStorageData => {

    const data: IGameStorageData = LocalStorage().read()

    const newGame = (): IGameStorageData => {
        const game = createGame("model_2")
        const data = LocalStorage().create()

        data.currentGame = game

        LocalStorage().write(data)
        return data
    }

    if(type == "default" && data.currentGame) return data
    else return newGame()
}

const LocalStorage = () => {
    return {
        read: (): IGameStorageData => {
            let lsData = localStorage.getItem(GameStorageName)
            let data: IGameStorageData
        
            if(lsData) data = JSON.parse(lsData)
            else data = LocalStorage().create()
        
            return data
        },
        write: (inputData: IGameStorageData): void => {
            let data = JSON.stringify(inputData)
            localStorage.setItem(GameStorageName, data)
        },
        create: (): IGameStorageData => {            
            const data = JSON.parse(JSON.stringify(InitialData))
            LocalStorage().write(data)
            return data
        }
    }
}

const createGameTarget = (size: number): string[] => {
    const colors = [...InitialData.colors]
    const shuffleColors = colors.sort(() => 0.5 - Math.random()).splice(0, size)
    return shuffleColors
}

export {
    getGame, LocalStorage
}