import { useGame, useTimer } from "@/hooks"

export function GameResult() {
  const { game, dispatch } = useGame()
  const { formatted } = useTimer()

  const messages = {
    won: "Congratulations, you won! 🎉",
    lost: "You lost — try again!",
    playing: "",
  }

  return (
    <>
      <p className="text-center mt-0 text-theme-text">{messages[game.status]}</p>

      {/* stats summary */}
      <div className="flex justify-center gap-4 mb-3 text-sm text-theme-text/70">
        <span>
          Guesses: {game.guesses.length}/{game.model.chances}
        </span>
        <span>Time: {formatted}</span>
      </div>

      <button
        className="h-12 w-full bg-accent text-white text-lg rounded-lg cursor-pointer"
        onClick={() => dispatch({ type: "RESTART" })}
      >
        Play Again
      </button>
    </>
  )
}
