import { useContext } from "react"
import { GameContext } from "../../GameContext";
import { ActionTypes } from "../../store/game.actions"

const GameResult = () => {

    const { game, dispatch } = useContext(GameContext)

    const gameStatus = game.currentGameData.status
    const handleRestart = () => dispatch({type: ActionTypes.Restart})

    const resultMessage = 
    gameStatus == "win" ? "Congratulations, you won 😀" :
    gameStatus == "lose" ? "Unfortunately, you lost ☹️ try again" : ""

    return (
        <>
            <p className={gameStatus}>
                {resultMessage}
            </p>
        
            <button className="restart" onClick={handleRestart}>
                Restart
            </button>
        </>
    )
}

export default GameResult;