import type {
  CurrentRow,
  Difficulty,
  GameModel,
  GameState,
  Guess,
  HintStatus,
  Settings,
} from "@/types"
import { BASE_MODELS, BONUS_CHANCES, COLORS } from "./constants"

function pickUniqueColors(count: number): string[] {
  const pool = [...COLORS]
  for (let i = pool.length - 1; i > pool.length - 1 - count; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(pool.length - count)
}

function pickColorsWithDuplicates(count: number): string[] {
  const result = Array.from(
    { length: count },
    () => COLORS[Math.floor(Math.random() * COLORS.length)],
  )

  if (new Set(result).size === result.length) {
    const src = Math.floor(Math.random() * count)
    let dest = Math.floor(Math.random() * (count - 1))
    if (dest >= src) dest++
    result[dest] = result[src]
  }

  return result
}

function buildModel(difficulty: Difficulty, settings: Settings): GameModel {
  const base = BASE_MODELS[difficulty]
  let extra = 0

  if (settings.allowDuplicateTarget) extra += BONUS_CHANCES.duplicateTarget
  if (!settings.allowDuplicateColors && !settings.allowDuplicateTarget)
    extra += BONUS_CHANCES.noDuplicateGuess

  return { ...base, chances: base.chances + extra }
}

export function createGame(difficulty: Difficulty, customSettings?: Settings): GameState {
  const defaults = {
    autoScroll: true,
    allowDuplicateColors: false,
    allowDuplicateTarget: false,
    showTimer: true,
  }

  const settings = customSettings || defaults

  const model = buildModel(difficulty, settings)
  const target = settings.allowDuplicateTarget
    ? pickColorsWithDuplicates(model.size)
    : pickUniqueColors(model.size)

  return {
    target,
    model,
    guesses: [],
    currentRow: {
      index: 0,
      activeColumn: 0,
      colors: Array(model.size).fill(null),
      isFull: false,
    },
    status: "playing",
    difficulty,
    startedAt: 0,
    elapsedMs: 0,
  }
}

export function evaluateGuess(guess: string[], target: string[]): Omit<Guess, "colors"> {
  const size = target.length
  let exact = 0
  let correct = 0

  const targetUsed = Array(size).fill(false)
  const guessUsed = Array(size).fill(false)

  for (let i = 0; i < size; i++) {
    if (guess[i] === target[i]) {
      exact++
      targetUsed[i] = true
      guessUsed[i] = true
    }
  }

  for (let i = 0; i < size; i++) {
    if (guessUsed[i]) continue
    for (let j = 0; j < size; j++) {
      if (targetUsed[j]) continue
      if (guess[i] === target[j]) {
        correct++
        targetUsed[j] = true
        break
      }
    }
  }

  const hints: HintStatus[] = [
    ...Array(exact).fill("exact" as HintStatus),
    ...Array(correct).fill("correct" as HintStatus),
    ...Array(size - exact - correct).fill("wrong" as HintStatus),
  ]

  return { exact, correct, hints }
}

export function findNextEmptyColumn(
  colors: (string | null)[],
  startIndex: number,
): { index: number; isFull: boolean } {
  const size = colors.length
  for (let i = startIndex; i < size; i++) {
    if (colors[i] === null) return { index: i, isFull: false }
  }
  for (let i = 0; i < startIndex; i++) {
    if (colors[i] === null) return { index: i, isFull: false }
  }
  return { index: size, isFull: true }
}

export function createEmptyRow(size: number, rowIndex: number): CurrentRow {
  return {
    index: rowIndex,
    activeColumn: 0,
    colors: Array(size).fill(null),
    isFull: false,
  }
}
