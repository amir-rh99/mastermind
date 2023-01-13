// import { GameProvider } from "./GameContext"
import { GameProvider } from "./store/GameContext"

import { Main } from "./components"
import "./styles/main.scss";

const App = () => {
    return(
        <GameProvider>
            <Main />
        </GameProvider>
    )
}

export default App;