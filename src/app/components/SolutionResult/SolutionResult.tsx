import { useContext } from "react"
import { GameContext } from "../../GameContext"
import { DoneAction } from "../"

interface ISolutionResultProps {
    rowIndex: number
}

const SolutionResult = ({ rowIndex }: ISolutionResultProps) => {

    const { game } = useContext(GameContext)
    const solution = game.currentGameData.solutions[rowIndex]

    // if(!solution?.colorsStatus){
    //     return <DoneAction />
    // }

    const items = solution?.colorsStatus || [...new Array(game.currentGame?.model.size)]

    const ResultItems = items?.map((item, index) => 
    <div 
    key={`result_${rowIndex+1}_${index+1}`}
    className={`square ${item}`}></div>)

    return(
        <>
            { ResultItems }
        </>
    )
}

export default SolutionResult;