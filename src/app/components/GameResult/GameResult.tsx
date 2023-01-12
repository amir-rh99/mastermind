import { useContext } from "react"
import { GameContext } from "../../GameContext";

const GameResult = () => {

    const { game } = useContext(GameContext)

    const gameStatus = game.currentGameData.status

    const resultMessage = 
    gameStatus == "win" ? "Congratulations, you won 😀" :
    gameStatus == "lose" ? "Unfortunately, you lost ☹️ try again" : ""

    return (
        <>
            <p className={gameStatus}>
                {resultMessage}
            </p>
        
            <button className="restart">
                Restart
            </button>
        </>
    )
}

export default GameResult;