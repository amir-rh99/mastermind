import { COLORS } from "@/lib"
import { useCallback } from "react"
import { useGame } from "./useGame"

export function useColorPicker() {
  const { game, dispatch, settings } = useGame()
  const { currentRow } = game

  // In classic mode (no duplicate target), block duplicate colors in guesses
  // In hard mode (duplicate target), allow duplicates since the code may have them
  const duplicatesAllowed = settings.allowDuplicateTarget

  const isColorUsed = useCallback(
    (color: string) => {
      if (duplicatesAllowed) return false
      return currentRow.colors.some((c) => c === color)
    },
    [currentRow.colors, duplicatesAllowed],
  )

  const pickColor = useCallback(
    (color: string) => {
      if (isColorUsed(color)) return
      dispatch({ type: "PICK_COLOR", color })
    },
    [dispatch, isColorUsed],
  )

  const pickColorByIndex = useCallback(
    (index: number) => {
      const color = COLORS[index]
      if (!color || isColorUsed(color)) return
      dispatch({ type: "PICK_COLOR", color })
    },
    [dispatch, isColorUsed],
  )

  return { pickColor, pickColorByIndex, isColorUsed }
}
