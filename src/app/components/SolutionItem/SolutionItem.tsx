import { useContext } from "react"
import { GameContext } from "../../GameContext"

interface ISolutionItemProps {
    isActive: boolean
    inActiveRow: boolean
    solutionIndex: number
    rowIndex: number
}

const SolutionItem = ({ isActive, inActiveRow, solutionIndex, rowIndex }: ISolutionItemProps) => {

    const { game, setGame } = useContext(GameContext)
    const gameData = game.currentGameData

    const activeSolutionItemClass = isActive ? "active" : ""
    const solutionColor = gameData.solutions[rowIndex]?.colors[solutionIndex]

    const setSolutionItemToActive = () => {
        if(inActiveRow){
            setGame(prev => ({
                ...prev,
                currentGameData: {
                    ...prev.currentGameData,
                    activeSolutionItem: {
                        ...prev.currentGameData.activeSolutionItem,
                        column: solutionIndex
                    }
                }
            }))
        }
    }
    
    return(
        <button className={`square ${activeSolutionItemClass}`}
        style={{backgroundColor: solutionColor}}
        onClick={setSolutionItemToActive}></button>
    )
}

export default SolutionItem;