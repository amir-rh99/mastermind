import type { GameAction } from "@/store"
import type { Dispatch } from "react"
import { useEffect } from "react"

interface KeyboardOptions {
  dispatch: Dispatch<GameAction>
  pickColorByIndex: (index: number) => void
}

export function useKeyboard({ dispatch, pickColorByIndex }: KeyboardOptions) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code.startsWith("Digit") || e.code.startsWith("Numpad")) {
        const num = parseInt(e.key, 10)
        if (!isNaN(num)) pickColorByIndex(num)
        return
      }

      switch (e.key) {
        case "ArrowLeft":
        case "a":
          dispatch({ type: "MOVE_COLUMN", direction: "left" })
          break
        case "ArrowRight":
        case "d":
          dispatch({ type: "MOVE_COLUMN", direction: "right" })
          break
        case "Backspace":
          dispatch({ type: "BACKSPACE" })
          break
        case "Enter":
          dispatch({ type: "SUBMIT_GUESS" })
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [dispatch, pickColorByIndex])
}
