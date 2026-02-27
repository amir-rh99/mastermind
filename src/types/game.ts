export type Difficulty = "easy" | "normal" | "hard"

export interface GameModel {
  size: number
  chances: number
}

export type HintStatus = "exact" | "correct" | "wrong"

export interface Guess {
  colors: string[]
  hints: HintStatus[]
  exact: number
  correct: number
}

export interface CurrentRow {
  index: number
  activeColumn: number
  colors: (string | null)[]
  isFull: boolean
}

export type GameStatus = "playing" | "won" | "lost"

export interface Settings {
  autoScroll: boolean
  allowDuplicateColors: boolean
  allowDuplicateTarget: boolean
  showTimer: boolean
}

export interface GameState {
  target: string[]
  model: GameModel
  guesses: Guess[]
  currentRow: CurrentRow
  status: GameStatus
  difficulty: Difficulty
  startedAt: number
  elapsedMs: number
}

export interface GameRecord {
  status: "won" | "lost"
  difficulty: Difficulty
  guessCount: number
  timeMs: number
  date: number
  duplicateTarget: boolean
}

export interface Stats {
  history: GameRecord[]
}

export interface StreakData {
  // dates with a win (YYYY-MM-DD)
  winDates: string[]

  freezes: number
  // dates where freeze was used
  freezeUsedDates: string[]
}

export type ThemeMode = "dark" | "light"
