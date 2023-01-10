import { IGameStorageData } from "../core/types"
import { GameActions, ActionTypes } from "./game.actions";

const GameReducer = (state: IGameStorageData, action: GameActions): IGameStorageData => {

    const game = state.currentGame
    const gameData = state.currentGameData

    switch (action.type) {
        case ActionTypes.SetColor:
            {
                const color = action.payload
                const activeSolutionColumn = gameData.currentRow.activeColumn
                gameData.currentRow.colors[activeSolutionColumn] = color
                
                return {
                    ...state,
                    currentGameData: gameData
                }
            }

        case ActionTypes.SetColumnActive:
            {
                const columnIndex = action.payload
                gameData.currentRow.activeColumn = columnIndex

                return {
                    ...state,
                    currentGameData: gameData
                }
            }

        case ActionTypes.SearchForNextPossibleActiveColumn:
            {
                
                const currentSolutionColors = gameData.currentRow.colors
                const gameSize = game?.model.size!
                let activeColumnIndex = gameData.currentRow.activeColumn
                
                let index = activeColumnIndex
                
                // check for next squares
                for (let i = activeColumnIndex + 1; i < gameSize; i++) {
                    if(currentSolutionColors[i] === undefined){
                        index = i
                        break
                    }
                }

                // if there is no empty square in next squares, then search in previous squares
                if(index == activeColumnIndex){
                    for (let i = 0; i < gameSize; i++) {
                        if(currentSolutionColors[i] === undefined){
                            index = i
                            break;
                        }
                    } 
                }

                gameData.currentRow.activeColumn = index
                if(index == activeColumnIndex) gameData.currentRow.isFull = true

                return {
                    ...state,
                    currentGameData: gameData
                }
            }
            
        case ActionTypes.SetColorWithIndex:
            {
                const colorIndex = action.payload
                const color = state.colors[colorIndex]
                const activeSolutionColumn = gameData.currentRow.activeColumn
                gameData.currentRow.colors[activeSolutionColumn] = color
                
                
                return {
                    ...state,
                    currentGameData: gameData
                }
            }

        case ActionTypes.MoveActiveColumn:
            {
                const moveAction = action.payload;
                const lastColumnIndex = game?.model.size! - 1
                const activeColumnIndex = gameData.currentRow.activeColumn              
                
                let columnIndex = activeColumnIndex

                switch (moveAction) {
                    case "left":
                        {
                            if(activeColumnIndex == 0) columnIndex = lastColumnIndex
                            else columnIndex--;
                        }
                        break;
                    case "right":
                        {
                            if(activeColumnIndex == lastColumnIndex) columnIndex = 0
                            else columnIndex++;
                        }
                        break;

                    case "back":
                        {
                            // const currentColumnIsFull = gameData.currentRow.colors[activeColumnIndex]
                            gameData.currentRow.colors[activeColumnIndex] = ""
                            if(activeColumnIndex != 0) columnIndex--
                        }
                        break;
                }

                gameData.currentRow.activeColumn = columnIndex

                return {
                    ...state,
                    currentGameData: gameData
                }
            }
        default:
        return state
    }
}

export default GameReducer