import { useContext } from "react"
import { GameContext } from "@app/GameContext";
import { ActionTypes } from "../../store/game.actions";

import { ReactComponent as DoneSvg } from "@svg/done.svg";

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
            <DoneSvg />
        </button>
    )
}

export default DoneAction;