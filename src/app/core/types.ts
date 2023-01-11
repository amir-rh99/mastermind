export interface IGameModel {
    size: number
    chance: number
}

export type GameModelType = "model_1" | "model_2" | "model_3"

type ResultStatus = "exact" | "correct" | "wrong"
export interface IUserSolution {
    exact?: number
    correct?: number
    colorsStatus?: ResultStatus[]
    colors: string[]
}
export interface IGame {
    target: string[]
    model: IGameModel
    createdAt: Date
}

type RowColor = string | undefined

export interface IGameStorageData {
    currentGame: IGame | null
    currentGameData: {
        solutions: IUserSolution[]
        currentRow: {
            index: number
            activeColumn: number
            colors: RowColor[]
            isFull: boolean
        },
        status: "pending" | "lose" | "win"
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