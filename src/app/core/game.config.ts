import { IConfig } from "./types"

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
        "#00A308",
        "#F77300",
        "#2E54B2",
        "#ff006e",
        "#A16600",
        "#FF8C84",
        "#ae2012",
        "#F8EA2A",
        "#6C236C",
        "#00d4f5"
    ]
}

export default Config;