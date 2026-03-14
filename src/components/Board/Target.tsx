import { useGame, useTimer } from "@/hooks"
import { cn, COLORS } from "@/lib"
import { HelpCircle, List, Timer } from "lucide-react"

interface TargetProps {
  onSummaryToggle?: () => void
  showSummary?: boolean
}

export function Target({ onSummaryToggle, showSummary }: TargetProps) {
  const { game, dispatch, settings } = useGame()
  const { formatted } = useTimer()
  const { target, model, guesses, status } = game

  const isRevealed = status !== "playing"
  const remaining = model.chances - guesses.length
  const hasGuesses = guesses.length > 0

  return (
    <div className="mb-4 sticky top-2 z-9 flex flex-col gap-1">
      {/* timer */}
      {settings.showTimer && (
        <div className="flex items-center pb-1 justify-center gap-1.5 text-theme-text/60 text-sm">
          <Timer size={14} />
          <span className="tabular-nums w-[3.5ch] text-center">{formatted}</span>
        </div>
      )}

      <div
        className={cn("grid gap-2", isRevealed ? "opacity-100" : "opacity-75")}
        style={{ gridTemplateColumns: `repeat(${model.size + 1}, 1fr)` }}
      >
        {target.map((color, i) => {
          const colorIndex = COLORS.indexOf(color as (typeof COLORS)[number])

          return (
            <div
              key={i}
              className={cn(
                "square rounded-2xl border-2 border-theme-bg outline-1 outline-theme-surface-dark transition-transform duration-700",
                isRevealed ? "transform-[rotateY(360deg)]" : "bg-theme-surface-dark",
              )}
              style={isRevealed ? { backgroundColor: color } : undefined}
              onClick={() => dispatch({ type: "SET_ACTIVE_COLUMN", column: i })}
            >
              {isRevealed ? (
                <span className="text-base">{colorIndex}</span>
              ) : (
                <HelpCircle size={18} className="text-theme-target-svg" />
              )}
            </div>
          )
        })}

        {/* last cell: summary toggle when playing, status when game over */}
        {isRevealed ? (
          <div
            className={cn(
              "square rounded-2xl text-theme-target-svg",
              status === "lost" && "bg-wrong text-white",
              status === "won" && "bg-exact text-white",
            )}
          >
            {status}
          </div>
        ) : (
          <button
            onClick={hasGuesses ? onSummaryToggle : undefined}
            className={cn(
              "square rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-colors",
              hasGuesses
                ? showSummary
                  ? "bg-accent/20 text-accent cursor-pointer"
                  : "bg-theme-surface text-theme-target-svg cursor-pointer hover:bg-theme-surface-dark"
                : "bg-theme-surface text-theme-target-svg",
            )}
          >
            {hasGuesses ? (
              <>
                <List size={14} />
                <span className="text-[10px] tabular-nums leading-none">
                  {guesses.length}/{model.chances}
                </span>
              </>
            ) : (
              <span className="text-base">{remaining}</span>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
