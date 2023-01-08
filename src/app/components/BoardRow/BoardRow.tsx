import { useContext } from "react"
import { SolutionItem } from "../"
import { GameContext } from "../../GameContext"

interface IBoardRowProps {
    rowIndex: number
}

const BoardRow = ({rowIndex}: IBoardRowProps) => {

    const { game } = useContext(GameContext)
    const gameData = game.currentGameData

    const columns = [...new Array(game.currentGame?.model.size)]

    const activeRowClass = (rowIndex) == gameData?.solutions.length ? "active" : ""
    
    const SolutionItems = columns.map((col, index) => 
    <SolutionItem key={`solution_${rowIndex+1}_${index+1}`}
        isActive={activeRowClass == "active" && gameData?.activeSolutionItem == index}
        inActiveRow={activeRowClass == "active"}
        solutionIndex={index}
    />)

    return(
        <div 
        // ref={index+1 == rows.length ? bottomRef : null}
        className={`row ${activeRowClass}`}
        >
            <div className={`solution`}>
                { SolutionItems }
            </div>
            <div className="result">
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
            </div>
        </div>
    )
}

export default BoardRow;