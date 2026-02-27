import { Board, Header } from "@/components"
import { useColorPicker, useGame, useKeyboard } from "@/hooks"
import { GameProvider } from "@/store"

function Game() {
  const { dispatch } = useGame()
  const { pickColorByIndex } = useColorPicker()
  useKeyboard({ dispatch, pickColorByIndex })

  return (
    <div>
      <Header />
      <main className="min-h-[calc(100dvh-3rem)] relative">
        <Board />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  )
}
