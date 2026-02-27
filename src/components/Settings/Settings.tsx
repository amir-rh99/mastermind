import { useGame } from "@/hooks"
import { cn, DEFAULT_SETTINGS } from "@/lib"
import { FlaskConical, Moon, RotateCcw, Sun } from "lucide-react"

export function Settings() {
  const { settings, updateSettings, dispatch, theme, toggleTheme, game } = useGame()

  const targetHasDuplicates = new Set(game.target).size !== game.target.length

  const handleDuplicateTargetChange = (v: boolean) => {
    updateSettings({
      allowDuplicateTarget: v,
      // also enable duplicate guesses
      ...(v ? { allowDuplicateColors: true } : {}),
    })
    dispatch({ type: "RESTART", allowDuplicateTarget: v })
  }

  const handleDuplicateGuessChange = (v: boolean) => {
    if (!v && targetHasDuplicates) return
    updateSettings({ allowDuplicateColors: v })
  }

  const handleReset = () => {
    updateSettings(DEFAULT_SETTINGS)
    dispatch({ type: "RESTART", allowDuplicateTarget: DEFAULT_SETTINGS.allowDuplicateTarget })
  }

  const dupGuessLocked = targetHasDuplicates

  return (
    <div>
      <h2 className="text-theme-title mb-4">Settings</h2>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <p className="text-theme-title text-base m-0">Theme</p>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-theme-surface text-white text-sm transition-transform duration-200"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            <span>{theme === "light" ? "Dark" : "Light"}</span>
          </button>
        </div>

        <ToggleRow
          label="Show timer"
          description="Display elapsed time above the board"
          checked={settings.showTimer}
          onChange={(v) => updateSettings({ showTimer: v })}
        />

        <ToggleRow
          label="Auto-scroll"
          description="Scroll to keep the active row visible"
          checked={settings.autoScroll}
          onChange={(v) => updateSettings({ autoScroll: v })}
        />

        <hr className="border-theme-border" />

        <div className="flex items-center gap-2 text-theme-text/50">
          <FlaskConical size={16} />
          <span className="text-sm">Advanced Rules</span>
        </div>

        <ToggleRow
          label="Duplicate guesses"
          description={
            dupGuessLocked
              ? "Required — target contains duplicate colors"
              : "Use the same color more than once in a guess. Makes the game easier since you can test colors individually."
          }
          checked={settings.allowDuplicateColors}
          onChange={handleDuplicateGuessChange}
          disabled={dupGuessLocked}
        />

        <ToggleRow
          label="Duplicate target"
          description="The secret code may contain the same color twice. Significantly harder — you get +2 extra guesses. Restarts the game."
          checked={settings.allowDuplicateTarget}
          onChange={handleDuplicateTargetChange}
        />

        <hr className="border-theme-border" />

        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 py-2 rounded-lg bg-theme-surface/30 text-theme-text/60 text-sm hover:bg-theme-surface/50 transition-colors cursor-pointer"
        >
          <RotateCcw size={14} />
          Reset to defaults
        </button>
      </div>
    </div>
  )
}

interface ToggleRowProps {
  label: string
  description: string
  checked: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
}

function ToggleRow({ label, description, checked, onChange, disabled }: ToggleRowProps) {
  return (
    <div className={cn("flex items-center justify-between gap-3", disabled && "opacity-50")}>
      <div className="flex-1">
        <p className="text-theme-title text-base m-0">{label}</p>
        <p className="text-theme-text/60 text-sm m-0 font-extralight">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0",
          checked ? "bg-exact" : "bg-theme-surface",
          disabled && "cursor-not-allowed",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200",
            checked && "translate-x-5",
          )}
        />
      </button>
    </div>
  )
}
