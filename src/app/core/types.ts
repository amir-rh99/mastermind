export interface IGameModel {
    size: number
    chance: number
}

export type GameModelType = "model_1" | "model_2" | "model_3"

export interface IGame {
    target: string[]
    model: IGameModel
    createdAt: Date
}

export interface IGameStorageData {
    currentGame: IGame | null
}

export type GameStorageDataKey = keyof IGameStorageData

export interface IConfig {
    GameStorageName: string
    GameModels: {
        [key in GameModelType]: IGameModel
    }
    Colors: string[]
}