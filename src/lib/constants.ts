import type { Difficulty, GameModel, Settings } from "@/types"

export const COLORS = [
  "#E91E63",
  "#9C27B0",
  "#3F51B5",
  "#03A9F4",
  "#4CAF50",
  "#CDDC39",
  "#FFC107",
  "#FF5722",
  "#795548",
  "#607D8B",
] as const

export const DIFFICULTY_MODELS: Record<Difficulty, GameModel> = {
  easy: { size: 3, chances: 8 },
  normal: { size: 4, chances: 8 },
  hard: { size: 5, chances: 10 },
}

// +2 chances for duplicate target
export const DIFFICULTY_MODELS_DUP: Record<Difficulty, GameModel> = {
  easy: { size: 3, chances: 10 },
  normal: { size: 4, chances: 10 },
  hard: { size: 5, chances: 12 },
}

export const STORAGE_KEYS = {
  game: "mastermind_game",
  theme: "mastermind_theme",
  stats: "mastermind_stats",
  settings: "mastermind_settings",
  streak: "mastermind_streak",
} as const

export const DEFAULT_SETTINGS: Settings = {
  autoScroll: true,
  allowDuplicateColors: false,
  allowDuplicateTarget: false,
  showTimer: true,
}
