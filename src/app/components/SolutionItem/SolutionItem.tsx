import { useContext, useEffect, useState } from "react"
import { GameContext } from "@app/store/GameContext"
import { ActionTypes } from "@app/store/game.actions"

import { ReactComponent as QuestionSvg } from "@svg/question.svg";

interface ISolutionItemProps {
    solutionIndex: number
    rowIndex: number
}

const SolutionItem = ({ solutionIndex, rowIndex }: ISolutionItemProps) => {

    const { game, dispatch } = useContext(GameContext)
    const gameData = game.currentGameData
    const [ colorError, setColorError ] = useState(false)

    useEffect(() => {
        if(game.event?.type == "SET_COLOR_ERROR" && solutionIndex == game.event.data){            
            setColorError(true)
            setTimeout(() => {
                setColorError(false)
            }, 1000)
        }
    }, [game.event])
    
    const {
        index: activeRowIndex,
        activeColumn: activeSolutionIndex
    } = gameData.currentRow

    const inActiveRow = activeRowIndex == rowIndex
    const isActive = inActiveRow && activeSolutionIndex == solutionIndex

    const solutionItemClass = isActive ? "active" : ""

    const solutionColor =
    inActiveRow ? gameData.currentRow.colors[solutionIndex] : 
    gameData.solutions[rowIndex]?.colors[solutionIndex]

    const colorNumber = solutionColor && game.colors.findIndex(col => col == solutionColor)

    const setSolutionItemToActive = () => {
        if(inActiveRow) {
            dispatch({
                type: ActionTypes.SetColumnActive,
                payload: solutionIndex
            })
        } else if (rowIndex < activeRowIndex){
            const solutionColor = gameData.solutions[rowIndex].colors[solutionIndex]
            dispatch({
                type: ActionTypes.SetColor,
                payload: solutionColor
            })
            dispatch({
                type: ActionTypes.SearchForNextPossibleActiveColumn
            })
        }
    }

    return(
        <div className={`square ${solutionItemClass} ${solutionColor ? 'colorful' : ""} ${inActiveRow && colorError ? 'error' : ''}`}
        style={{backgroundColor: solutionColor}}
        onClick={setSolutionItemToActive}>
            {
                isActive ?
                <QuestionSvg />
                : ""
            }
            <span className="color_num">
                {colorNumber}
            </span>
        </div>
    )
}

export default SolutionItem;