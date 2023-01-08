import { useEffect } from "react"
import { Board } from "../"

const Main = () => {

    useEffect(() => {
        calculateDocumentSize()
        window.addEventListener("resize", () => {
            calculateDocumentSize()
        })
    }, [])

    const calculateDocumentSize = () => {
        const docHeight: number = document.documentElement.clientHeight || window.innerHeight
        document.documentElement.style.setProperty("--doc_height", docHeight.toString() + "px")
    }

    return(
        <div>
            <header className="header">
                <h1>
                    MasterMind
                </h1>
            </header>
            <div className="main_container">
                <Board />       
            </div>
        </div>
    )
}

export default Main;