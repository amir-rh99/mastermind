import { IConfig, IGameStorageData } from "./types"

const Config: IConfig = {
    GameStorageName: "mastermind_data",
    GameModels: {
        "model_1": {
            size: 3,
            chance: 7
        },
        "model_2": {
            size: 4,
            chance: 8
        },
        "model_3": {
            size: 5,
            chance: 9
        }
    },
    Colors: [
        "#E91E63",
        "#9C27B0",
        "#3F51B5",
        "#03A9F4",
        "#4CAF50",
        "#CDDC39",
        "#FFC107",
        "#FF5722",
        "#795548",
        "#607D8B"
    ]
}

const InitialData: IGameStorageData = {
    currentGame: null,
    currentGameData: {
        solutions: [],
        currentRow: {
            index: 0,
            activeColumn: 0,
            colors: [],
            isFull: false
        },
        status: "pending"
    },
    colors: Config.Colors,
}

export {
    Config, InitialData
};