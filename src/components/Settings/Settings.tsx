import { useGame } from "@/hooks"
import { cn, BONUS_CHANCES } from "@/lib"
import { Moon, RotateCcw, Sun, RotateCw } from "lucide-react"

export function Settings() {
  const { settings, updateSettings, dispatch, theme, toggleTheme } = useGame()

  const handleDuplicateTargetChange = (v: boolean) => {
    const newSettings = { ...settings, allowDuplicateTarget: v }
    updateSettings(newSettings)
    dispatch({ type: "RESTART", settings: newSettings })
  }

  const handleReset = () => {
    const defaults = {
      autoScroll: true,
      allowDuplicateTarget: false,
      showTimer: true,
    }
    updateSettings(defaults)
    dispatch({ type: "RESTART", settings: defaults })
  }

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

        {/* Repeating colors in secret code */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <p className="text-theme-title text-base m-0">Repeating colors</p>
            <p className="text-theme-text/60 text-sm m-0 font-extralight">
              {settings.allowDuplicateTarget
                ? `Hard mode — the secret code might use a color twice (e.g. 🔴🔵🔴🟢), so you get +${BONUS_CHANCES.duplicateTarget} extra guesses.`
                : "Classic — every color in the secret code is different, no repeats."}
            </p>
          </div>
          <ToggleSwitch
            checked={settings.allowDuplicateTarget}
            onChange={handleDuplicateTargetChange}
          />
        </div>

        <span className="flex items-center gap-1 text-[11px] text-theme-text/30 -mt-2">
          <RotateCw size={10} />
          Toggling restarts the current game
        </span>

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
