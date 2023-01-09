import { useContext } from "react"
import { GameContext } from "../../GameContext"
import { ActionTypes } from "../../store/game.actions"

interface ISolutionItemProps {
    isActive: boolean
    inActiveRow: boolean
    solutionIndex: number
    rowIndex: number
}

const SolutionItem = ({ isActive, inActiveRow, solutionIndex, rowIndex }: ISolutionItemProps) => {

    const { game, dispatch } = useContext(GameContext)
    const gameData = game.currentGameData

    const activeSolutionItemClass = isActive ? "active" : ""
    const solutionColor = inActiveRow ? gameData.currentRow.colors[solutionIndex] : ""

    const setSolutionItemToActive = () => {

        dispatch({
            type: ActionTypes.SetColumnActive,
            payload: solutionIndex
        })
        // if(inActiveRow){
        //     setGame(prev => ({
        //         ...prev,
        //         currentGameData: {
        //             ...prev.currentGameData,
        //             activeSolutionItem: {
        //                 ...prev.currentGameData.activeSolutionItem,
        //                 column: solutionIndex
        //             }
        //         }
        //     }))
        // }
    }
    
    return(
        <div className={`square ${activeSolutionItemClass}`}
        style={{backgroundColor: solutionColor}}
        onClick={setSolutionItemToActive}></div>
    )
}

export default SolutionItem;