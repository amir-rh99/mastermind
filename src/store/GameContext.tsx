import {
  checkAndApplyFreeze,
  computeStreak,
  createGame,
  DEFAULT_SETTINGS,
  getDefaultStreak,
  recordWin,
  storage,
  STORAGE_KEYS,
} from "@/lib"
import type { GameRecord, GameState, Settings, Stats, StreakData, ThemeMode } from "@/types"
import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
  type Dispatch,
  type PropsWithChildren,
} from "react"
import type { GameAction } from "./actions"
import { gameReducer } from "./reducer"

function getInitialTheme(): ThemeMode {
  const stored = localStorage.getItem(STORAGE_KEYS.theme)
  if (stored === "dark" || stored === "light") return stored
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark"
  return "light"
}

function getInitialGame(): GameState {
  const saved = storage.get<GameState>(STORAGE_KEYS.game)
  if (saved && saved.status === "playing") {
    // reset timer so it starts fresh on reload
    return { ...saved, elapsedMs: 0, startedAt: 0 }
  }
  return createGame("normal", DEFAULT_SETTINGS)
}

function getInitialSettings(): Settings {
  const saved = storage.get<Settings>(STORAGE_KEYS.settings)
  if (saved) return { ...DEFAULT_SETTINGS, ...saved }
  return DEFAULT_SETTINGS
}

function getInitialStats(): Stats {
  return storage.get<Stats>(STORAGE_KEYS.stats) ?? { history: [] }
}

function getInitialStreak(): StreakData {
  const saved = storage.get<StreakData>(STORAGE_KEYS.streak)
  if (saved) return checkAndApplyFreeze(saved)
  return getDefaultStreak()
}

interface GameContextValue {
  game: GameState
  dispatch: Dispatch<GameAction>
  theme: ThemeMode
  toggleTheme: () => void
  settings: Settings
  updateSettings: (patch: Partial<Settings>) => void
  stats: Stats
  clearStats: () => void
  streak: StreakData
  currentStreak: number
}

export const GameContext = createContext<GameContextValue>(null!)

export function GameProvider({ children }: PropsWithChildren) {
  const [game, dispatch] = useReducer(gameReducer, null, getInitialGame)
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)
  const [settings, setSettings] = useState<Settings>(getInitialSettings)
  const [stats, setStats] = useState<Stats>(getInitialStats)
  const [streak, setStreak] = useState<StreakData>(getInitialStreak)

  const prevStatusRef = useRef(game.status)

  // persist
  useEffect(() => {
    const { elapsedMs: _, ...rest } = game
    storage.set(STORAGE_KEYS.game, rest)
  }, [game])
  useEffect(() => {
    storage.set(STORAGE_KEYS.settings, settings)
  }, [settings])
  useEffect(() => {
    storage.set(STORAGE_KEYS.stats, stats)
  }, [stats])
  useEffect(() => {
    storage.set(STORAGE_KEYS.streak, streak)
  }, [streak])

  // record result
  useEffect(() => {
    if (prevStatusRef.current === "playing" && game.status !== "playing") {
      const hasTargetDuplicates = new Set(game.target).size !== game.target.length

      const record: GameRecord = {
        status: game.status,
        difficulty: game.difficulty,
        guessCount: game.guesses.length,
        timeMs: game.elapsedMs,
        date: Date.now(),
        duplicateTarget: hasTargetDuplicates,
      }
      setStats((prev) => ({ history: [...prev.history, record] }))

      if (game.status === "won") {
        setStreak((prev) => recordWin(prev))
      }
    }
    prevStatusRef.current = game.status
  }, [game.status])

  // tick timer
  useEffect(() => {
    if (game.status !== "playing") return
    const interval = setInterval(() => dispatch({ type: "TICK_TIMER" }), 1000)
    return () => clearInterval(interval)
  }, [game.status, game.startedAt])

  // apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem(STORAGE_KEYS.theme, theme)
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? "dark" : "light")
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"))

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...patch }))
  }, [])

  const clearStats = useCallback(() => {
    setStats({ history: [] })
    setStreak(getDefaultStreak())
  }, [])

  // auto-inject current settings into RESTART
  const wrappedDispatch: Dispatch<GameAction> = useCallback(
    (action) => {
      if (action.type === "RESTART") {
        dispatch({ ...action, settings: action.settings ?? settings })
      } else {
        dispatch(action)
      }
    },
    [settings],
  )

  const currentStreak = computeStreak(streak.winDates, streak.freezeUsedDates)

  return (
    <GameContext
      value={{
        game,
        dispatch: wrappedDispatch,
        theme,
        toggleTheme,
        settings,
        updateSettings,
        stats,
        clearStats,
        streak,
        currentStreak,
      }}
    >
      {children}
    </GameContext>
  )
}
