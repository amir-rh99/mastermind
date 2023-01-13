import { useEffect, useContext } from "react"
import { GameContext } from "@app/store/GameContext"
import { LocalStorage } from "@app/core/game.controller"
import { PickerBox, BoardRow, Target, Celebrate } from "@app/components"

const Board = () => {

    const { game } = useContext(GameContext)
    
    const rows = [...new Array(game.currentGame?.model.chance)]

    useEffect(()=>{
        LocalStorage().write(game)
    }, [game])

    const BoardRows = 
    rows.map((row, index) => 
        <BoardRow 
        key={`row_${index+1}`}
        rowIndex={index}/>
    )

    const isEndGame = game.currentGameData.status !== "pending"

    return(
        <>
            { game.currentGameData.status == "win" ? <Celebrate /> : "" }
            <div 
            className={`board ${isEndGame ? "ended" : ""}`}>
                <div className="target">
                    <Target />
                </div>
                <div className="rows">
                    { BoardRows }
                </div>
                <PickerBox />
            </div>
        </>
    )
}

export default Board;