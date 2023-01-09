import { useEffect, useRef, useContext } from "react"
import { GameContext } from "../../GameContext"
import { PickerBox, BoardRow, Target } from "../"

const Board = () => {
    const bottomRef = useRef<null | HTMLDivElement>(null);

    const { game, setGame } = useContext(GameContext)
    const gameData = game.currentGameData
    
    const rows = [...new Array(game.currentGame?.model.chance)]
    const BoardRows = rows.map((row, index) => 
        <BoardRow key={`row_${index+1}`}
        rowIndex={index}/>
    )

    useEffect(() => {
        // console.log(game, " xxx********game");
        setTimeout(() => {
            bottomRef?.current?.scrollIntoView({behavior: 'smooth'});
        }, 500)
    }, [game])

    // useEffect(() => {
    //     // check for handle next possibillity
    //     let currentSolutionColumn = gameData.activeSolutionItem.column
        
    //     // if(currentSolutionColumn == 0) return;

    //     setGame(prev => ({
    //         ...prev,
    //         currentGameData: {
    //             ...prev.currentGameData,
    //             activeSolutionItem: {
    //                 ...prev.currentGameData.activeSolutionItem,
    //                 column: currentSolutionColumn + 1
    //             }
    //         }
    //     }))
    // }, [gameData.solutions[gameData.activeSolutionItem.row].colors])

    return(
        <div className="board">
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