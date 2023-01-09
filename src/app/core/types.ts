export interface IGameModel {
    size: number
    chance: number
}

export type GameModelType = "model_1" | "model_2" | "model_3"

interface IUserSolution {
    exact?: number
    correct?: number
    status: "current" | "complete"
    colors: string[]
}
export interface IGame {
    target: string[]
    model: IGameModel
    createdAt: Date
}
export interface IGameStorageData {
    currentGame: IGame | null
    currentGameData: {
        solutions: IUserSolution[]
        activeSolutionItem: {
            row: number
            column: number
        }
    }
    colors: string[]
}

export type GameStorageDataKey = keyof IGameStorageData

export interface IConfig {
    GameStorageName: string
    GameModels: {
        [key in GameModelType]: IGameModel
    }
    Colors: string[]
}