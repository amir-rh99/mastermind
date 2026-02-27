import type { Difficulty } from "@/types"

export type GameAction =
  | { type: "PICK_COLOR"; color: string }
  | { type: "PICK_COLOR_BY_INDEX"; index: number }
  | { type: "SET_ACTIVE_COLUMN"; column: number }
  | { type: "MOVE_COLUMN"; direction: "left" | "right" }
  | { type: "BACKSPACE" }
  | { type: "SUBMIT_GUESS" }
  | { type: "TICK_TIMER" }
  | { type: "RESTART"; difficulty?: Difficulty; allowDuplicateTarget?: boolean }
