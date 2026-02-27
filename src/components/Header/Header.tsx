import { About } from "@/components/About/About"
import { Modal } from "@/components/Modal/Modal"
import { Settings } from "@/components/Settings/Settings"
import { StatsPanel } from "@/components/Stats/StatsPanel"
import { useGame } from "@/hooks"
import { HelpCircle, RotateCcw, SlidersHorizontal } from "lucide-react"
import { useEffect, useState } from "react"

export function Header() {
  const { dispatch, currentStreak } = useGame()
  const [showHelp, setShowHelp] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    const visited = localStorage.getItem("mastermind_visited")
    if (!visited) {
      localStorage.setItem("mastermind_visited", "true")
      setShowHelp(true)
    }
  }, [])

  return (
    <>
      <header className="h-12 bg-theme-bg-header border-b border-theme-border flex items-center justify-center">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full max-w-[30rem] px-4">
          <div className="flex items-center">
            <button
              onClick={() => dispatch({ type: "RESTART" })}
              aria-label="Restart game"
              className="flex cursor-pointer hover:rotate-[-90deg] transition-transform duration-300"
            >
              <RotateCcw size={24} className="text-wrong" />
            </button>
          </div>

          <h1 className="m-0 text-xl text-theme-title tracking-wide">MasterMind</h1>

          <div className="flex items-center justify-end gap-2">
            {/* <button
              onClick={() => setShowStats(true)}
              aria-label="Stats"
              className="relative flex cursor-pointer text-theme-icon hover:text-theme-title transition-colors"
            >
              <BarChart3 size={24} />
              {currentStreak > 0 && (
                <span className="absolute -top-1 -right-1.5 min-w-4 h-4 px-0.5 rounded-full bg-correct text-white text-[10px] font-bold flex items-center justify-center">
                  {currentStreak}
                </span>
              )}
            </button> */}

            <button
              onClick={() => setShowSettings(true)}
              aria-label="Settings"
              className="flex cursor-pointer text-theme-icon hover:text-theme-title transition-colors"
            >
              <SlidersHorizontal size={24} />
            </button>

            <button
              onClick={() => setShowHelp(true)}
              aria-label="How to play"
              className="flex cursor-pointer text-theme-icon hover:text-theme-title transition-colors"
            >
              <HelpCircle size={24} />
            </button>
          </div>
        </div>
      </header>

      <Modal open={showHelp} onClose={() => setShowHelp(false)}>
        <About />
      </Modal>

      <Modal open={showSettings} onClose={() => setShowSettings(false)}>
        <Settings />
      </Modal>

      <Modal open={showStats} onClose={() => setShowStats(false)}>
        <StatsPanel />
      </Modal>
    </>
  )
}
