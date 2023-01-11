import { IGameStorageData, IUserSolution } from "../core/types"
import { GameActions, ActionTypes } from "./game.actions";

const GameReducer = (state: IGameStorageData, action: GameActions): IGameStorageData => {

    const game = state.currentGame
    const gameData = state.currentGameData
    const isRowFull = gameData.currentRow.isFull
    const isEndGame = gameData.status !== "pending"

    if(isEndGame) return state;

    switch (action.type) {
        case ActionTypes.SetColor:
            {    
                if(isRowFull) return state;

                const color = action.payload
                const activeSolutionColumn = gameData.currentRow.activeColumn
                gameData.currentRow.colors[activeSolutionColumn] = color
                
                return {
                    ...state,
                    currentGameData: gameData
                }
            }
            break;

        case ActionTypes.SetColumnActive:
            {
                const columnIndex = action.payload
                gameData.currentRow.activeColumn = columnIndex

                return {
                    ...state,
                    currentGameData: gameData
                }
            }
            break;
            
        case ActionTypes.SearchForNextPossibleActiveColumn:
            {
                if(isRowFull) return state;

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
                
                if(index == activeColumnIndex) {
                    gameData.currentRow.isFull = true
                    gameData.currentRow.activeColumn = gameSize
                }

                return {
                    ...state,
                    currentGameData: gameData
                }
            }
            break;

        case ActionTypes.SetColorWithIndex:
            {
                if(isRowFull) return state;

                const colorIndex = action.payload
                const color = state.colors[colorIndex]
                const activeSolutionColumn = gameData.currentRow.activeColumn
                gameData.currentRow.colors[activeSolutionColumn] = color
                
                
                return {
                    ...state,
                    currentGameData: gameData
                }
            }
            break;

        case ActionTypes.MoveActiveColumn:
            {
                const moveAction = action.payload;
                const lastColumnIndex = game?.model.size! - 1
                const activeColumnIndex = gameData.currentRow.activeColumn              
                
                let columnIndex = activeColumnIndex

                switch (moveAction) {
                    case "left":
                        {
                            if(activeColumnIndex <= 0) columnIndex = lastColumnIndex
                            else columnIndex--;
                        }
                        break;
                    case "right":
                        {
                            if(activeColumnIndex >= lastColumnIndex) columnIndex = 0
                            else columnIndex++;
                        }
                        break;

                    case "back":
                        {
                            const currentColumnIsFull = gameData.currentRow.colors[activeColumnIndex]

                            if(currentColumnIsFull) gameData.currentRow.colors[activeColumnIndex] = undefined
                            else if (activeColumnIndex != 0) {
                                gameData.currentRow.colors[activeColumnIndex - 1] = undefined
                                columnIndex--
                            }

                            gameData.currentRow.isFull = false
                        }
                        break;
                }

                gameData.currentRow.activeColumn = columnIndex

                return {
                    ...state,
                    currentGameData: gameData
                }
            }
            break;
        case ActionTypes.CheckSolution:
            {                                                
                const gameSize = game?.model.size
                const currentRowIndex = gameData.currentRow.index
                const lastRowIndex = game?.model.chance! - 1

                const isRowFull = 
                gameSize == gameData.currentRow.colors.length && 
                gameData.currentRow.colors.every(color => color !== undefined)
                
                if(isRowFull){
                    const target = game?.target
                    const userSolution = gameData.currentRow.colors as string[]

                    let exact = 0;
                    let correct = 0;

                    target?.forEach((color, index) => {
                        const colorIndex = userSolution.filter(userColor => userColor == color)
                        if(colorIndex.length){
                            if(userSolution[index] == color && colorIndex[colorIndex.length - 1] == target[index]) exact++
                            else correct++
                        }
                    })

                    let solution: IUserSolution = {
                        colors: userSolution,
                        exact, correct
                    }

                    let colorsStatus = getColorsStatus(solution, gameSize)
                    solution.colorsStatus = colorsStatus
                    gameData.solutions.push(solution)

                    if(exact == gameSize){
                        gameData.status = "win"
                    } else {
                        if(currentRowIndex == lastRowIndex){
                            gameData.status = "lose"
                        } else {
                            gameData.currentRow.activeColumn = 0
                            gameData.currentRow.isFull = false
                        }
                    }
                    
                    gameData.currentRow.colors = []
                    gameData.currentRow.index = currentRowIndex + 1

                    return {
                        ...state,
                        currentGameData: gameData
                    }
                }
                
                return state
            }
            break;
            
        default:
        return state
    }
}

const getColorsStatus = (solution: IUserSolution, colorsSize: number) => {

    let items = [...new Array(colorsSize)]

    for(let i = 0; i < items.length; i++){
        let j = 0;
        if(solution.exact && solution.exact > 0){
            for(let i = 0; i < solution.exact; i++){
                items[j] = "exact"
                j++
            }
        }
        if(solution.correct && solution.correct > 0){
            for(let i = 0; i < solution.correct; i++){
                items[j] = "correct"
                j++
            }
        }
        if(j < items.length){
            let temp = j
            for(let i = 0; i < items.length - temp; i++){
                items[j] = 'wrong'
                j++
            }
        }
    }

    return items
}
export default GameReducer