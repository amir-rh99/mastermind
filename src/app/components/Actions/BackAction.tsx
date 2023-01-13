import { useContext } from "react"
import { GameContext } from "../../GameContext"
import { ActionTypes } from "../../store/game.actions"

import { ReactComponent as BackSpaceSvg } from "@svg/backspace.svg"

const BackAction = () => {

    const { dispatch } = useContext(GameContext)

    const handleBackSpace = () => dispatch({ type: ActionTypes.MoveActiveColumn, payload: "back" })

    return(
        <button className="square action backspace"
        onClick={handleBackSpace}>
            <BackSpaceSvg />
        </button>
    )
}

export default BackAction;