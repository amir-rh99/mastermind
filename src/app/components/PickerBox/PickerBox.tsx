import { useContext } from "react"
import { GameContext } from "../../GameContext"
import { Color, DoneAction, BackAction } from "../"

const PickerBox = () => {
    
    const { game } = useContext(GameContext)
    
    const ColorItems = game.colors.map((color, index) => 
        <Color key={`color_${index+1}`}
        color={color}
        index={index}
        />
    )

    return(
        <div className="pickerbox">
            <div className="colors">
                { ColorItems }
            </div>
            <div className="actions">
                <BackAction />
                <DoneAction />
            </div>
        </div>
    )
}

export default PickerBox;