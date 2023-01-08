import { useContext } from "react"
import { GameContext } from "../../GameContext"

interface ISolutionItemProps {
    isActive: boolean
    inActiveRow: boolean
    solutionIndex: number
}

const SolutionItem = ({ isActive, inActiveRow, solutionIndex }: ISolutionItemProps) => {

    const { setGame } = useContext(GameContext)

    const activeSolutionItemClass = isActive ? "active" : ""

    const setSolutionItemToActive = () => {
        if(inActiveRow){
            setGame(prev => ({
                ...prev,
                currentGameData: {
                    ...prev.currentGameData,
                    activeSolutionItem: solutionIndex
                }
            }))
        }
    }
    
    return(
        <button className={`square ${activeSolutionItemClass}`}
        onClick={setSolutionItemToActive}></button>
    )
}

export default SolutionItem;