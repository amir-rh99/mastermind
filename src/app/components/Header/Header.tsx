import { useState, useContext } from "react"
import { GameContext } from "@app/store/GameContext"
import { ActionTypes } from "@app/store/game.actions"
import { Modal } from "@app/components"

import { ReactComponent as RestartSvg } from "@svg/restart.svg";
import { ReactComponent as HelpSvg } from "@svg/help.svg";

const Header = () => {

    const { dispatch } = useContext(GameContext)
    const [modal, setModal] = useState(false)

    const handleRestart = () => dispatch({ type: ActionTypes.Restart })

    return(
        <div className="container">
            <span className="restart" onClick={handleRestart}>
                <RestartSvg />
            </span>
            <h1>
                MasterMind
            </h1>
            <span className="help" onClick={() => setModal(true)}>
                <HelpSvg />
            </span>

            <Modal show={modal} onClose={() => setModal(false)}>
                <div>sadasd</div>
            </Modal>
        </div>
    )
}

export default Header;