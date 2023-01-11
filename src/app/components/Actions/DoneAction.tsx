import { useContext } from "react"
import { GameContext } from "../../GameContext"
import { ActionTypes } from "../../store/game.actions"

const DoneAction = () => {

    const { game, dispatch } = useContext(GameContext)
    const gameData = game.currentGameData
    
    const handleDone = () => {
        console.log("xc");
        
        dispatch({ type: ActionTypes.CheckSolution })
    }
    const isCurrentRowFull = gameData.currentRow.isFull

    return(
        <button className="square action done"
        onClick={handleDone}
        disabled={!isCurrentRowFull}>
            <svg height="20px" viewBox="0 0 24 24" width="20px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.77 4.93l1.4 1.4L8.43 19.07l-5.6-5.6 1.4-1.4 4.2 4.2L19.77 4.93m0-2.83L8.43 13.44l-4.2-4.2L0 13.47l8.43 8.43L24 6.33 19.77 2.1z"/></svg>
        </button>
    )
}

export default DoneAction;