import { useGame } from "./useGame"

export function useTimer() {
  const { game } = useGame()

  const totalSeconds = Math.floor(game.elapsedMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

  return { formatted, ms: game.elapsedMs, minutes, seconds }
}
