import { useEffect, useContext, KeyboardEvent } from "react"
import { GameContext } from "../../GameContext"
import { PickerBox, BoardRow, Target } from "../"

const Board = () => {

    const { game } = useContext(GameContext)
    
    const rows = [...new Array(game.currentGame?.model.chance)]

    const BoardRows = rows.map((row, index) => 
        <BoardRow key={`row_${index+1}`}
        rowIndex={index}/>
    )

    useEffect(() => {
    }, [])


    const checkeys = (event: KeyboardEvent) => {

    }

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