import { GameResult } from "@/components/GameResult/GameResult"
import { useColorPicker, useGame } from "@/hooks"
import { cn, COLORS } from "@/lib"
import { Check, Delete } from "lucide-react"

export function PickerBox() {
  const { game, dispatch } = useGame()
  const { pickColor, isColorUsed } = useColorPicker()
  const { currentRow, status } = game

  if (status !== "playing") {
    return (
      <div className="pickerbox">
        <GameResult />
      </div>
    )
  }

  return (
    <div className="pickerbox">
      <div className="grid grid-cols-7 gap-2">
        {/* color palette */}
        <div className="col-span-5 grid grid-cols-5 gap-2">
          {COLORS.map((color, index) => {
            const used = isColorUsed(color)

            return (
              <button
                key={color}
                className={cn(
                  "square rounded-lg border-2 border-theme-bg outline-1 outline-theme-surface",
                  used ? "opacity-30 cursor-not-allowed" : "cursor-pointer",
                )}
                style={{ backgroundColor: color, outlineColor: color }}
                onClick={() => pickColor(color)}
                disabled={used}
              >
                {index}
              </button>
            )
          })}
        </div>

        {/* action buttons */}
        <div className="col-span-2 grid grid-rows-2 gap-2">
          <button
            className="rounded-lg bg-theme-surface flex items-center justify-center"
            onClick={() => dispatch({ type: "BACKSPACE" })}
            aria-label="Backspace"
          >
            <Delete size={28} className="text-white" />
          </button>

          <button
            className={cn(
              "rounded-lg flex items-center justify-center",
              currentRow.isFull ? "bg-accent" : "bg-accent-disabled opacity-75 cursor-default",
            )}
            onClick={() => dispatch({ type: "SUBMIT_GUESS" })}
            disabled={!currentRow.isFull}
            aria-label="Submit guess"
          >
            <Check size={24} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
