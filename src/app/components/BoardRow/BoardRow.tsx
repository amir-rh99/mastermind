import { useContext, useRef, useEffect } from "react"
import { SolutionItem, SolutionResult } from "../"
import { GameContext } from "../../GameContext"

interface IBoardRowProps {
    rowIndex: number
}

const BoardRow = ({ rowIndex }: IBoardRowProps) => {

    const activeRowRef = useRef<HTMLDivElement | null>(null)
    
    const { game } = useContext(GameContext)
    const gameData = game.currentGameData
    const activeRowIndex = gameData.currentRow.index
    
    useEffect(() => {        
        const scrollTimeOut = setTimeout(() => {
            activeRowRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            })
        }, 100)

        return () => clearTimeout(scrollTimeOut)
    }, [game.currentGameData.currentRow.activeColumn, game.currentGame])

    const columns = [...new Array(game.currentGame?.model.size)]

    const rowStatus: "active" | "past" | "" = 
    activeRowIndex == rowIndex ? "active" :
    rowIndex < activeRowIndex ? "past" : ""
    
    const SolutionItems = columns.map((col, index) => 
    <SolutionItem 
        key={`solution_${rowIndex+1}_${index+1}`}
        solutionIndex={index}
        rowIndex={rowIndex}
    />)

    return(
        <div className={`row ${rowStatus}`}
        ref={rowStatus == 'active' ? activeRowRef : null}>
            <div className={`solution`}>
                { SolutionItems }
            </div>
            <div className={`result ${rowIndex < activeRowIndex ? 'show' : ''}`}>
                <SolutionResult
                rowIndex={rowIndex}
                />
            </div> 
        </div>
    )
}

export default BoardRow;