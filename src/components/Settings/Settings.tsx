import { useGame } from "@/hooks"
import { cn, BONUS_CHANCES } from "@/lib"
import { FlaskConical, Moon, RotateCcw, Sun, RotateCw } from "lucide-react"

export function Settings() {
  const { settings, updateSettings, dispatch, theme, toggleTheme, game } = useGame()

  const targetHasDuplicates = new Set(game.target).size !== game.target.length

  const handleDuplicateTargetChange = (v: boolean) => {
    const newSettings = {
      ...settings,
      allowDuplicateTarget: v,
      ...(v ? { allowDuplicateColors: true } : {}),
    }
    updateSettings(newSettings)
    dispatch({ type: "RESTART", settings: newSettings })
  }

  const handleDuplicateGuessChange = (v: boolean) => {
    if (!v && targetHasDuplicates) return
    const newSettings = { ...settings, allowDuplicateColors: v }
    updateSettings(newSettings)
    dispatch({ type: "RESTART", settings: newSettings })
  }

  const handleReset = () => {
    const defaults = {
      autoScroll: true,
      allowDuplicateColors: false,
      allowDuplicateTarget: false,
      showTimer: true,
    }
    updateSettings(defaults)
    dispatch({ type: "RESTART", settings: defaults })
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

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-theme-text/50">
            <FlaskConical size={16} />
            <span className="text-sm">Advanced Rules</span>
          </div>
          <span className="flex items-center gap-1 text-[11px] text-theme-text/30">
            <RotateCw size={10} />
            Restarts game
          </span>
        </div>

        {/* duplicate guesses */}
        <div className={cn("flex flex-col gap-1", dupGuessLocked && "opacity-50")}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-theme-title text-base m-0">Duplicate guesses</p>
            <ToggleSwitch
              checked={settings.allowDuplicateColors}
              onChange={handleDuplicateGuessChange}
              disabled={dupGuessLocked}
            />
          </div>
          {dupGuessLocked ? (
            <p className="text-theme-text/40 text-sm m-0 font-extralight">
              Required — target contains duplicate colors.
            </p>
          ) : (
            <div className="flex flex-col gap-0.5 text-sm font-extralight">
              <p
                className={cn(
                  "m-0",
                  settings.allowDuplicateColors ? "text-exact/80" : "text-theme-text/25",
                )}
              >
                <span className="font-bold">ON:</span> Same color allowed multiple times
              </p>
              <p
                className={cn(
                  "m-0",
                  !settings.allowDuplicateColors ? "text-exact/80" : "text-theme-text/25",
                )}
              >
                <span className="font-bold">OFF:</span> Each color once per guess, +
                {BONUS_CHANCES.noDuplicateGuess} guesses
              </p>
            </div>
          )}
        </div>

        {/* duplicate target */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-theme-title text-base m-0">Duplicate target</p>
            <ToggleSwitch
              checked={settings.allowDuplicateTarget}
              onChange={handleDuplicateTargetChange}
            />
          </div>
          <div className="flex flex-col gap-0.5 text-sm font-extralight">
            <p
              className={cn(
                "m-0",
                !settings.allowDuplicateTarget ? "text-exact/80" : "text-theme-text/25",
              )}
            >
              <span className="font-bold">OFF:</span> All unique colors — classic mode
            </p>
            <p
              className={cn(
                "m-0",
                settings.allowDuplicateTarget ? "text-exact/80" : "text-theme-text/25",
              )}
            >
              <span className="font-bold">ON:</span> Code may repeat colors, +
              {BONUS_CHANCES.duplicateTarget} guesses
            </p>
          </div>
        </div>

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

interface ToggleSwitchProps {
  checked: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
}

function ToggleSwitch({ checked, onChange, disabled }: ToggleSwitchProps) {
  return (
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
  )
}

interface ToggleRowProps {
  label: string
  description: string
  checked: boolean
  onChange: (value: boolean) => void
}

function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex-1">
        <p className="text-theme-title text-base m-0">{label}</p>
        <p className="text-theme-text/60 text-sm m-0 font-extralight">{description}</p>
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
  )
}
