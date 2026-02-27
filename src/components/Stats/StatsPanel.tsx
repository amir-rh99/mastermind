import { useGame } from "@/hooks"
import { cn, getWeekDays } from "@/lib"
import { Clock, Flame, Snowflake, Target, Trophy, Zap } from "lucide-react"

export function StatsPanel() {
  const { stats, streak, currentStreak } = useGame()
  const days = getWeekDays(streak)

  const wins = stats.history.filter((r) => r.status === "won").length
  const losses = stats.history.filter((r) => r.status === "lost").length
  const winRate = stats.history.length > 0 ? Math.round((wins / stats.history.length) * 100) : 0

  const avgGuesses =
    wins > 0
      ? (
          stats.history.filter((r) => r.status === "won").reduce((s, r) => s + r.guessCount, 0) /
          wins
        ).toFixed(1)
      : "—"

  const avgTime =
    wins > 0
      ? formatTime(
          stats.history.filter((r) => r.status === "won").reduce((s, r) => s + r.timeMs, 0) / wins,
        )
      : "—"

  const bestTime =
    wins > 0
      ? formatTime(
          Math.min(...stats.history.filter((r) => r.status === "won").map((r) => r.timeMs)),
        )
      : "—"

  return (
    <div>
      {/* streak */}
      <div className="flex flex-col items-center gap-3 mb-5">
        <div
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full",
            currentStreak > 0 ? "bg-correct/15" : "bg-theme-surface/30",
          )}
        >
          <Flame
            size={24}
            className={cn(currentStreak > 0 ? "text-correct" : "text-theme-text/25")}
          />
          <span
            className={cn(
              "text-2xl tabular-nums font-bold",
              currentStreak > 0 ? "text-correct" : "text-theme-text/25",
            )}
          >
            {currentStreak}
          </span>
          <span className="text-sm text-theme-text/50">{currentStreak === 1 ? "day" : "days"}</span>
        </div>

        <div className="flex gap-2">
          {days.map((day) => (
            <div key={day.date} className="flex flex-col items-center gap-1">
              <span
                className={cn(
                  "text-[11px] font-bold",
                  day.isToday ? "text-theme-title" : "text-theme-text/35",
                )}
              >
                {day.label}
              </span>
              <div
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all",
                  day.status === "won" && !day.isToday && "bg-exact text-white",
                  day.status === "won" &&
                    day.isToday &&
                    "bg-exact text-white ring-2 ring-exact/40 ring-offset-2 ring-offset-theme-bg",
                  day.status === "freeze" && "bg-accent/20 text-accent",
                  day.status === "empty" &&
                    !day.isToday &&
                    "bg-theme-surface/30 text-theme-text/15",
                  day.isToday &&
                    day.status === "empty" &&
                    "bg-correct/10 text-correct/60 ring-2 ring-correct/30 ring-offset-2 ring-offset-theme-bg",
                  day.status === "future" && "bg-theme-surface/15 text-theme-text/10",
                )}
              >
                {day.status === "won" && "✓"}
                {day.status === "freeze" && <Snowflake size={14} />}
                {day.isToday && day.status === "empty" && "•"}
              </div>
            </div>
          ))}
        </div>

        {streak.freezes > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs">
            <Snowflake size={12} />
            <span>
              {streak.freezes} freeze{streak.freezes !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {/* stats */}
      {stats.history.length > 0 ? (
        <>
          <hr className="border-theme-border mb-4" />

          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={<Trophy size={16} />}
              value={`${winRate}%`}
              label="Win rate"
              accent="text-exact"
            />
            <StatCard
              icon={<Zap size={16} />}
              value={`${wins}/${stats.history.length}`}
              label="Won / Played"
            />
            <StatCard icon={<Target size={16} />} value={avgGuesses} label="Avg guesses" />
            <StatCard icon={<Clock size={16} />} value={avgTime} label="Avg time" />
          </div>

          {wins > 0 && (
            <div className="mt-3 flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-exact/10 text-exact text-xs">
                <Clock size={12} />
                <span>Best: {bestTime}</span>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <hr className="border-theme-border mb-4" />
          <p className="text-theme-text/35 text-sm text-center py-4">
            Win your first game to start tracking!
          </p>
        </>
      )}
    </div>
  )
}

function formatTime(ms: number): string {
  const s = Math.floor(ms / 1000)
  const m = Math.floor(s / 60)
  return `${m}:${String(s % 60).padStart(2, "0")}`
}

function StatCard({
  icon,
  value,
  label,
  accent,
}: {
  icon: React.ReactNode
  value: string
  label: string
  accent?: string
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-theme-surface/15">
      <div className={cn("text-theme-text/30", accent)}>{icon}</div>
      <div>
        <div className={cn("text-lg tabular-nums font-bold text-theme-title", accent)}>{value}</div>
        <div className="text-[11px] text-theme-text/40">{label}</div>
      </div>
    </div>
  )
}
