import { GameProvider } from "./GameContext"
import { Main } from "./components"

const App = () => {
    return(
        <GameProvider>
            <Main />
        </GameProvider>
    )
}

export default App;