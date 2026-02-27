import { useColorPicker, useGame } from "@/hooks"
import { cn, COLORS } from "@/lib"
import type { HintStatus } from "@/types"
import { HelpCircle } from "lucide-react"
import { useEffect, useRef } from "react"

interface BoardRowProps {
  rowIndex: number
}

export function BoardRow({ rowIndex }: BoardRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const { game, dispatch, settings } = useGame()
  const { pickColor } = useColorPicker()
  const { currentRow, guesses, model, status } = game

  const isGameOver = status !== "playing"
  const isActive = !isGameOver && currentRow.index === rowIndex
  const isPast = rowIndex < guesses.length
  const guess = guesses[rowIndex]

  useEffect(() => {
    if (!isActive || !settings.autoScroll) return
    const t = setTimeout(() => {
      rowRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }, 100)
    return () => clearTimeout(t)
  }, [isActive, settings.autoScroll, currentRow.activeColumn, game.target])

  return (
    <div
      ref={isActive ? rowRef : null}
      className={cn("grid gap-2 scroll-mb-44", isActive || isPast ? "opacity-100" : "opacity-50")}
      style={{ gridTemplateColumns: `repeat(${model.size + 1}, 1fr)` }}
    >
      {Array.from({ length: model.size }, (_, i) => {
        const color = isActive ? currentRow.colors[i] : (guess?.colors[i] ?? null)
        const isActiveSlot = isActive && currentRow.activeColumn === i
        const colorIndex = color ? COLORS.indexOf(color as (typeof COLORS)[number]) : -1

        return (
          <button
            key={i}
            className={cn(
              "square rounded-2xl bg-theme-surface relative transition-all duration-150",
              (isActive || isPast) && "cursor-pointer",
              isActive && "border-[3px] border-theme-bg outline-1 outline-theme-surface",
            )}
            style={color ? { backgroundColor: color } : undefined}
            onClick={() => {
              if (isActive) dispatch({ type: "SET_ACTIVE_COLUMN", column: i })
              else if (isPast && color) pickColor(color)
            }}
          >
            {isActiveSlot && (
              <HelpCircle
                size={18}
                className={cn(
                  "animate-[blink_2s_infinite]",
                  color ? "text-white" : "text-theme-surface-svg",
                )}
              />
            )}
            {colorIndex >= 0 && !isActiveSlot && (
              <span className="text-base absolute bottom-1 right-1">{colorIndex}</span>
            )}
          </button>
        )
      })}

      <div
        className={cn(
          "p-1 grid grid-cols-2 gap-1 transition-transform duration-500",
          isPast ? "scale-100 rotate-0 opacity-100" : "scale-75 rotate-180",
        )}
      >
        {(guess?.hints ?? Array(model.size).fill(null)).map(
          (hint: HintStatus | null, i: number) => (
            <div
              key={i}
              className={cn(
                "square aspect-square rounded-sm border",
                hint === "exact" && "bg-exact border-theme-bg",
                hint === "correct" && "bg-correct border-theme-bg",
                hint === "wrong" && "bg-wrong border-theme-bg",
                !hint && "border-theme-surface",
              )}
            />
          ),
        )}
      </div>
    </div>
  )
}
