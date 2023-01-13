import { useContext } from "react"
import { GameContext } from "@app/store/GameContext"
import { Color, DoneAction, BackAction, GameResult } from "@app/components"

const PickerBox = () => {
    
    const { game } = useContext(GameContext)
    
    const ColorItems = game.colors.map((color, index) => 
        <Color key={`color_${index+1}`}
        color={color}
        index={index}
        />
    )

    const isEndGame = game.currentGameData.status !== "pending"

    return(
        <div className="pickerbox">
            {
                isEndGame ?
                <div className="restart_actions">
                    <GameResult />
                </div>
                :
                <div className="game_actions">
                    <div className="colors">
                        { ColorItems }
                    </div>
                    <div className="actions">
                        <BackAction />
                        <DoneAction />
                    </div>
                </div>
            }
        </div>
    )
}

export default PickerBox;