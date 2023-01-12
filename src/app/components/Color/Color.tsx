import { useContext } from "react"
import { GameContext } from "../../GameContext"
import { ActionTypes } from "../../store/game.actions"

interface IColorProps {
    color: string
    index: number
}

const Color = ({ color, index }: IColorProps) => {

    const { dispatch } = useContext(GameContext)

    const handleColorSelect = () => {
        dispatch({
            type: ActionTypes.SetColor,
            payload: color
        })

        dispatch({
            type: ActionTypes.SearchForNextPossibleActiveColumn
        })
    }

    return(
        <button className="square color"
        style={{
            backgroundColor: color,
            outline: "1px solid",
            outlineColor: color
        }}
        onClick={handleColorSelect}
        >
            {index}
        </button>
    )
}

export default Color;