import { GameContext } from "@/store"
import { useContext } from "react"

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error("useGame must be used inside GameProvider")
  return ctx
}
