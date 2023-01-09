import { useContext } from "react"
import { GameContext } from "../../GameContext"

const Actions = () => {

    const { game } = useContext(GameContext)
    const gameData = game.currentGameData

    const handleBackSpace = () => {

    }

    const handleDone = () => {

    }

    const isCurrentRowFull = gameData.currentRow.isFull

    return(
        <>
            <button className="square backspace">
                <svg height="24px" viewBox="0 0 48 48" width="24px"><path d="m22.4 31.7 5.6-5.6 5.6 5.6 2.15-2.15L30.1 24l5.55-5.55-2.15-2.15-5.5 5.6-5.6-5.6-2.15 2.15L25.9 24l-5.65 5.55ZM6 24l8.45-11.95q.65-.9 1.55-1.475.9-.575 2-.575h21q1.25 0 2.125.875T42 13v22q0 1.25-.875 2.125T39 38H18q-1.1 0-2-.575-.9-.575-1.55-1.475Zm3.75 0 7.7 11H39V13H17.45ZM39 24V13v22Z"/></svg>
            </button>
            <button className="square done"
            disabled={!isCurrentRowFull}>
                <svg height="20px" viewBox="0 0 24 24" width="20px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.77 4.93l1.4 1.4L8.43 19.07l-5.6-5.6 1.4-1.4 4.2 4.2L19.77 4.93m0-2.83L8.43 13.44l-4.2-4.2L0 13.47l8.43 8.43L24 6.33 19.77 2.1z"/></svg>
            </button>
        </>
    )
}

export default Actions;