import { COLORS, createEmptyRow, createGame, evaluateGuess, findNextEmptyColumn } from "@/lib"
import type { GameState } from "@/types"
import type { GameAction } from "./actions"

// start timer on first move
function ensureTimerStarted(state: GameState): GameState {
  if (state.startedAt !== 0) return state
  return { ...state, startedAt: Date.now() }
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  if (state.status !== "playing" && action.type !== "RESTART") {
    return state
  }

  const { currentRow, model, target } = state

  switch (action.type) {
    case "PICK_COLOR": {
      if (currentRow.isFull) return state

      const s = ensureTimerStarted(state)
      const colors = [...currentRow.colors]
      colors[currentRow.activeColumn] = action.color

      const next = findNextEmptyColumn(colors, currentRow.activeColumn + 1)

      return {
        ...s,
        currentRow: {
          ...currentRow,
          colors,
          activeColumn: next.index,
          isFull: next.isFull,
        },
      }
    }

    case "PICK_COLOR_BY_INDEX": {
      if (currentRow.isFull) return state

      const color = COLORS[action.index]
      if (!color) return state

      const s = ensureTimerStarted(state)
      const colors = [...currentRow.colors]
      colors[currentRow.activeColumn] = color

      const next = findNextEmptyColumn(colors, currentRow.activeColumn + 1)

      return {
        ...s,
        currentRow: {
          ...currentRow,
          colors,
          activeColumn: next.index,
          isFull: next.isFull,
        },
      }
    }

    case "SET_ACTIVE_COLUMN": {
      if (action.column < 0 || action.column >= model.size) return state
      return {
        ...state,
        currentRow: { ...currentRow, activeColumn: action.column },
      }
    }

    case "MOVE_COLUMN": {
      const last = model.size - 1
      let col = currentRow.activeColumn

      if (action.direction === "left") {
        col = col <= 0 ? last : col - 1
      } else {
        col = col >= last ? 0 : col + 1
      }

      return {
        ...state,
        currentRow: { ...currentRow, activeColumn: col },
      }
    }

    case "BACKSPACE": {
      const colors = [...currentRow.colors]
      let col = currentRow.activeColumn

      if (currentRow.isFull) {
        col = model.size - 1
        colors[col] = null
      } else if (colors[col] !== null) {
        colors[col] = null
      } else if (col > 0) {
        col--
        colors[col] = null
      }

      return {
        ...state,
        currentRow: { ...currentRow, colors, activeColumn: col, isFull: false },
      }
    }

    case "SUBMIT_GUESS": {
      const filledColors = currentRow.colors.filter((c): c is string => c !== null)
      if (filledColors.length !== model.size) return state

      const result = evaluateGuess(filledColors, target)
      const guess = { colors: filledColors, ...result }
      const guesses = [...state.guesses, guess]

      const elapsed = state.startedAt > 0 ? Date.now() - state.startedAt : 0

      if (result.exact === model.size) {
        return {
          ...state,
          guesses,
          currentRow: { ...currentRow, colors: [] },
          status: "won",
          elapsedMs: elapsed,
        }
      }

      if (guesses.length >= model.chances) {
        return {
          ...state,
          guesses,
          currentRow: { ...currentRow, colors: [] },
          status: "lost",
          elapsedMs: elapsed,
        }
      }

      return {
        ...state,
        guesses,
        currentRow: createEmptyRow(model.size, currentRow.index + 1),
      }
    }

    case "TICK_TIMER": {
      if (state.startedAt === 0) return state
      return {
        ...state,
        elapsedMs: Date.now() - state.startedAt,
      }
    }

    case "RESTART": {
      const difficulty = action.difficulty ?? state.difficulty
      const allowDup = action.allowDuplicateTarget ?? false
      return createGame(difficulty, allowDup)
    }

    default:
      return state
  }
}
