import { useState, useContext, useEffect } from "react"
import "./header.scss";
import { GameContext } from "@app/store/GameContext"
import { ActionTypes } from "@app/store/game.actions"
import { Modal, About } from "@app/components"

import { ReactComponent as RestartSvg } from "@svg/restart.svg";
import { ReactComponent as HelpSvg } from "@svg/help.svg";
import { ReactComponent as DarkSvg } from "@svg/dark.svg";
import { ReactComponent as LightSvg } from "@svg/light.svg";

const Header = () => {

    const { dispatch } = useContext(GameContext)
    const [modal, setModal] = useState(false)
    const [theme, setTheme] = useState("dark")

    useEffect(() => {
        const isFirstTime = localStorage.getItem("mastermind_visited")
        if(!isFirstTime){
            localStorage.setItem("mastermind_visited", "true")
            setModal(true)
        }
    }, [])

    const toggleTheme = () => {
        let newTheme = theme == "dark" ? "light" : "dark"
        document.body.setAttribute("data-theme", theme)
        setTheme(newTheme)
    }

    const handleRestart = () => dispatch({ type: ActionTypes.Restart })

    return(
        <div className="container">
            <span className="icon restart" onClick={handleRestart}>
                <RestartSvg />
            </span>

            <h1>
                MasterMind
            </h1>

            <div className="menu">
                <span className="icon theme"
                onClick={toggleTheme}>
                    {
                        theme == "dark" ?
                        <DarkSvg /> :
                        <LightSvg />
                    }
                </span>
                <span className="icon"
                onClick={() => setModal(true)}>
                    <HelpSvg />
                </span>
            </div>

            <Modal show={modal} onClose={() => setModal(false)}>
                <About />
            </Modal>
        </div>
    )
}

export default Header;