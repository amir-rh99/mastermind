import { IGameStorageData, GameStorageDataKey, IGame } from "./types"
import Config from "./game.config"

const { GameStorageName, Colors } = Config

const InitialData: IGameStorageData = {
    currentGame: null,
    currentGameData: {
        solutions: [{
            colors: [],
            status: "current"
        }],
        activeSolutionItem: {
            row: 0,
            column: 0
        }
    },
    colors: Colors,
}

const getData = (type: GameStorageDataKey): any => {
    const data = readLSData()
    return data[type]
}

const createData = () => {
    let LSData = readLSData()

    return {
        currentGame: (game: IGame) => {
            LSData = {
                ...LSData,
                currentGame: game
            }

            writeToLS(LSData)
        }
    }
}

const writeToLS = (inputData: IGameStorageData): void => {
    let data = JSON.stringify(inputData)
    localStorage.setItem(GameStorageName, data)
}

const readLSData = (): IGameStorageData => {
    let lsData = localStorage.getItem(GameStorageName)
    let data: IGameStorageData

    if(lsData) data = JSON.parse(lsData)
    else data = createLS()

    return data
}

const createLS = (): IGameStorageData => {
    const data = JSON.stringify(InitialData)
    localStorage.setItem(GameStorageName, data)
    return InitialData
}

export {
    getData, createData, InitialData, readLSData
}