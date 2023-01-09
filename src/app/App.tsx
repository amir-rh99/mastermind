// import { GameProvider } from "./GameContext"
import { GameProvider } from "./GameContext"

import { Main } from "./components"
import "./styles.scss"

const App = () => {
    return(
        <GameProvider>
            <Main />
        </GameProvider>
    )
}

export default App;