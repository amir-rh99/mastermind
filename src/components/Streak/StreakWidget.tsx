import { useGame } from "@/hooks"
import { cn, getWeekDays } from "@/lib"
import { Flame, Snowflake } from "lucide-react"

export function StreakWidget() {
  const { streak, currentStreak } = useGame()
  const days = getWeekDays(streak)

  return (
    <div className="flex flex-col items-center gap-2 py-2">
      {/* streak count */}
      <div className="flex items-center gap-1.5">
        <Flame
          size={20}
          className={cn(currentStreak > 0 ? "text-correct" : "text-theme-text/30")}
        />
        <span
          className={cn(
            "text-lg tabular-nums font-bold",
            currentStreak > 0 ? "text-correct" : "text-theme-text/30",
          )}
        >
          {currentStreak}
        </span>
      </div>

      {/* week grid */}
      <div className="flex gap-1.5">
        {days.map((day) => (
          <div key={day.date} className="flex flex-col items-center gap-0.5">
            <span className="text-[10px] text-theme-text/40">{day.label}</span>
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors",
                day.status === "won" && "bg-exact text-white",
                day.status === "freeze" && "bg-accent/30 text-accent",
                day.status === "empty" && !day.isToday && "bg-theme-surface/40 text-theme-text/20",
                day.status === "future" && "bg-theme-surface/20 text-theme-text/10",
                day.isToday &&
                  day.status === "empty" &&
                  "bg-theme-surface/60 ring-2 ring-correct/50 text-theme-text/40",
                day.isToday && day.status === "won" && "ring-2 ring-white/40",
              )}
            >
              {day.status === "won" && "✓"}
              {day.status === "freeze" && <Snowflake size={14} />}
              {day.status === "empty" && day.isToday && "?"}
            </div>
          </div>
        ))}
      </div>

      {/* freeze count */}
      <div className="flex items-center gap-1 text-xs text-theme-text/40">
        <Snowflake size={12} />
        <span>
          {streak.freezes} freeze{streak.freezes !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  )
}
