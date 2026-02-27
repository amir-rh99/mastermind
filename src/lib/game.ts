import type { CurrentRow, Difficulty, GameState, Guess, HintStatus } from "@/types"
import { COLORS, DIFFICULTY_MODELS, DIFFICULTY_MODELS_DUP } from "./constants"

function pickUniqueColors(count: number): string[] {
  const pool = [...COLORS]
  for (let i = pool.length - 1; i > pool.length - 1 - count; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(pool.length - count)
}

function pickColorsWithDuplicates(count: number): string[] {
  // start with random colors
  const result = Array.from(
    { length: count },
    () => COLORS[Math.floor(Math.random() * COLORS.length)],
  )

  // if no duplicates by chance, force one
  if (new Set(result).size === result.length) {
    // pick a random slot and copy a different slot's color into it
    const src = Math.floor(Math.random() * count)
    let dest = Math.floor(Math.random() * (count - 1))
    if (dest >= src) dest++
    result[dest] = result[src]
  }

  return result
}

export function createGame(difficulty: Difficulty, allowDuplicateTarget = false): GameState {
  const models = allowDuplicateTarget ? DIFFICULTY_MODELS_DUP : DIFFICULTY_MODELS
  const model = models[difficulty]
  const target = allowDuplicateTarget
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

  // exact matches
  for (let i = 0; i < size; i++) {
    if (guess[i] === target[i]) {
      exact++
      targetUsed[i] = true
      guessUsed[i] = true
    }
  }

  // misplaced colors
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
