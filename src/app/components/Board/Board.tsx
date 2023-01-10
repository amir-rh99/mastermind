import { useEffect, useContext } from "react"
import { GameContext } from "../../GameContext"
import { PickerBox, BoardRow, Target } from "../"
import { ActionTypes } from "../../store/game.actions"

type KeyType = "right" | "left" | "enter" | "back" | "number" | null

const KEYS = {
    ENTER: 13,
    BACK: 8,
    RIGHT: 39,
    KEYD: 68,
    LEFT: 37,
    KEYA: 65
}

const Board = () => {

    const { game, dispatch } = useContext(GameContext)
    
    const rows = [...new Array(game.currentGame?.model.chance)]

    const BoardRows = rows.map((row, index) => 
        <BoardRow key={`row_${index+1}`}
        rowIndex={index}/>
    )

    useEffect(() => {
        window.addEventListener("keyup", handleKeyEvent)
    }, [])


    const handleKeyEvent = (event: any) => {
        const { keyCode, code, key } = event
        
        const keyType = checkKey({keyCode, code})
        if(keyType){
            switch (keyType) {
                case "number":
                    const number = Number(key)
                    dispatch({ type: ActionTypes.SetColorWithIndex, payload: number })
                    dispatch({ type: ActionTypes.SearchForNextPossibleActiveColumn })
                    break;

                case "left":
                case "right":
                case "back":
                    dispatch({ type: ActionTypes.MoveActiveColumn, payload: keyType })
                    
                    break;
                default:
                    break;
            }
        }
    }

    const checkKey = (key: { keyCode: number, code: string }): KeyType => {

        // if(key.code.includes("Numpad") || key.code.includes("Digit")) return "number"
        // 48 - 57 || 96 - 105
        if(key.keyCode >= 48 && key.keyCode <= 57 || key.keyCode >= 96 && key.keyCode <= 105) return "number"

        let type: KeyType = null

        switch (key.keyCode) {
            case KEYS.BACK:
                type = "back"
                break;
            case KEYS.ENTER:
                type = "enter"
                break;
            case KEYS.LEFT:
            case KEYS.KEYA:
                type = "left"
                break;
            case KEYS.RIGHT:
            case KEYS.KEYD:
                type = "right"
                break;
        }

        return type
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