import { useEffect, useContext } from "react"
import { GameContext } from "../../GameContext"
import { PickerBox, BoardRow, Target } from "../"
import { writeToLS } from "../../core/game.storage"

const Board = () => {

    const { game } = useContext(GameContext)
    
    const rows = [...new Array(game.currentGame?.model.chance)]

    useEffect(()=>{
        writeToLS(game)
    }, [game])

    const BoardRows = 
    rows.map((row, index) => 
        <BoardRow 
        key={`row_${index+1}`}
        rowIndex={index}/>
    )

    return(
        <div 
        className="board">
            <div className="game_target">
                <Target />
            </div>
            <div className="rows">
                { BoardRows }
            </div>
            <PickerBox />
        </div>
    )
}

export default Board;