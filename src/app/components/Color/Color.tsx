import { useContext } from "react"
import { GameContext } from "../../GameContext"

interface IColorProps {
    color: string
    index: number
}

const Color = ({ color, index }: IColorProps) => {

    const { game, setGame } = useContext(GameContext)
    const gameData = game.currentGameData

    const handleColorSelect = () => {

        const activeSolutionItem = gameData.activeSolutionItem
        const currentSolution = gameData.solutions[activeSolutionItem.row]
        const colors = [...currentSolution.colors]    
        colors[activeSolutionItem.column] = color

        const nextSolutionItemColumn = getNextSolutionItemColumn(game.currentGame?.model.size!, colors)
        // const activeSolutionItem = gameData.activeSolutionItem

        // const solutions = [...gameData.solutions]
        // const currentSolution = solutions.find(sol => sol.status == "current")!

        // const colors = [...currentSolution.colors]    
        // colors[activeSolutionItem.column] = color
        // currentSolution.colors = colors

        setGame(prev => ({
            ...prev,
            currentGameData: {
                ...prev.currentGameData,
                activeSolutionItem: {
                    ...activeSolutionItem,
                    column: nextSolutionItemColumn
                }
                // solutions
            }
        }))
    }

    const getNextSolutionItemColumn = (size: number, colors: string[]) => {
        if(colors.length - 1 < size) return colors.length
        return colors.length
    }

    return(
        <button className="square color"
        style={{
            backgroundColor: color,
            border: "1px solid",
            borderColor: color
        }}
        onClick={handleColorSelect}
        >
            {index+1}
        </button>
    )
}

export default Color;