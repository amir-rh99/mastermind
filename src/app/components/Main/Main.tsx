import { useContext, useEffect } from "react"
import { Board, Header } from "../"
import { GameContext } from "@app/store/GameContext"
import { ActionTypes } from "@app/store/game.actions"

type KeyType = "right" | "left" | "enter" | "back" | "number" | null

const KEYBOARDKEYS = {
    ENTER: 13,
    BACK: 8,
    RIGHT: 39,
    KEYD: 68,
    LEFT: 37,
    KEYA: 65
}

const Main = () => {

    const { dispatch } = useContext(GameContext)

    useEffect(() => {
        calculateDocumentSize()
        window.addEventListener("resize", calculateDocumentSize)
        window.addEventListener("keyup", handleKeyEvent)
        
        return ()=> {
            window.removeEventListener('keyup', handleKeyEvent)
            window.removeEventListener("resize", calculateDocumentSize)
        }
    }, [])

    const calculateDocumentSize = () => {
        const docHeight: number = document.documentElement.clientHeight || window.innerHeight
        const docWidth: number = document.documentElement.clientWidth || window.innerWidth
        document.documentElement.style.setProperty("--doc_height", docHeight.toString() + "px")
        document.documentElement.style.setProperty("--doc_width", docWidth.toString() + "px")
    }

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

                case "enter":                    
                    dispatch({ type: ActionTypes.CheckSolution })

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
            case KEYBOARDKEYS.BACK:
                type = "back"
                break;
            case KEYBOARDKEYS.ENTER:
                type = "enter"
                break;
            case KEYBOARDKEYS.LEFT:
            case KEYBOARDKEYS.KEYA:
                type = "left"
                break;
            case KEYBOARDKEYS.RIGHT:
            case KEYBOARDKEYS.KEYD:
                type = "right"
                break;
        }

        return type
    }

    return(
        <div>
            <header className="header">
                <Header />
            </header>
            <main className="main_container">
                <Board />       
            </main>
        </div>
    )
}

export default Main;