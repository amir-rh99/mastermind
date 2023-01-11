import { useContext } from "react"
import { GameContext } from "../../GameContext"
import { ActionTypes } from "../../store/game.actions"

const BackAction = () => {

    const { dispatch } = useContext(GameContext)

    const handleBackSpace = () => dispatch({ type: ActionTypes.MoveActiveColumn, payload: "back" })

    return(
        <button className="square action backspace"
        onClick={handleBackSpace}>
            <svg height="24px" viewBox="0 0 48 48" width="24px"><path d="m22.4 31.7 5.6-5.6 5.6 5.6 2.15-2.15L30.1 24l5.55-5.55-2.15-2.15-5.5 5.6-5.6-5.6-2.15 2.15L25.9 24l-5.65 5.55ZM6 24l8.45-11.95q.65-.9 1.55-1.475.9-.575 2-.575h21q1.25 0 2.125.875T42 13v22q0 1.25-.875 2.125T39 38H18q-1.1 0-2-.575-.9-.575-1.55-1.475Zm3.75 0 7.7 11H39V13H17.45ZM39 24V13v22Z"/></svg>
        </button>
    )
}

export default BackAction;