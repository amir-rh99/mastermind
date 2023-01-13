import { useContext } from "react"
import { GameContext } from "../../GameContext"
import { ActionTypes } from "../../store/game.actions"

import { ReactComponent as QuestionSvg } from "@svg/question.svg";

const Target = () => {

    const { game, dispatch } = useContext(GameContext)
    const columns = [...new Array(game.currentGame?.model.size)]

    const setColumnToActive = (index: number) => dispatch({
        type: ActionTypes.SetColumnActive,
        payload: index
    })

    const getColorNumber = (color: string) => game.colors.findIndex(col => col == color)

    const isEndGame = game.currentGameData.status !== "pending"

    const target = isEndGame ? game.currentGame?.target! : columns
    
    const remainChance = 
    !isEndGame ?
    game.currentGame?.model.chance! - game.currentGameData.solutions.length :
    game.currentGameData.status

    return(
        <>
            {
                target.map((column, index) => {
                    return(
                        <div key={`target_${index+1}`}
                        className={`square ${isEndGame ? 'show' : ''}`}
                        style={{backgroundColor: column}}
                        onClick={() => setColumnToActive(index)}
                        >
                            {
                                !isEndGame ? 
                                <QuestionSvg /> :
                                <span className="color_num">
                                    {getColorNumber(column)}
                                </span>
                            }
                        </div>
                    )
                })
            }
            <div className={`square remain ${isEndGame ? game.currentGameData.status : ""}`}>
                { remainChance }
            </div>
        </>
    )
}

export default Target;