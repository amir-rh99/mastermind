import { useGame } from "@/hooks"
import { cn, getWeekDays } from "@/lib"
import { Clock, Flame, FlaskConical, Snowflake, Target, Trophy, Zap } from "lucide-react"

function getStreakMessage(streak: number): string {
  if (streak === 0) return "Win today to start a streak!"
  if (streak === 1) return "Come back tomorrow to keep it going!"
  if (streak < 5) return "Keep it up!"
  if (streak < 10) return "You're on fire!"
  if (streak < 20) return "Unstoppable!"
  if (streak < 50) return "Legendary streak!"
  return "Absolutely insane!"
}

export function StatsPanel() {
  const { stats, streak, currentStreak } = useGame()
  const days = getWeekDays(streak)

  const allWins = stats.history.filter((r) => r.status === "won")
  const total = stats.history.length
  const wins = allWins.length
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0
  const hardWins = allWins.filter((r) => r.duplicateTarget).length

  const avgGuesses =
    wins > 0 ? (allWins.reduce((s, r) => s + r.guessCount, 0) / wins).toFixed(1) : "—"

  const avgTime = wins > 0 ? formatTime(allWins.reduce((s, r) => s + r.timeMs, 0) / wins) : "—"

  const bestTime = wins > 0 ? formatTime(Math.min(...allWins.map((r) => r.timeMs))) : "—"

  const nextFreezeMilestone = Math.ceil((currentStreak + 1) / 5) * 5

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

        <p className="text-xs text-theme-text/40 m-0">{getStreakMessage(currentStreak)}</p>

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

        <div className="flex items-center gap-3">
          {streak.freezes > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs">
              <Snowflake size={12} />
              <span>
                {streak.freezes} freeze{streak.freezes !== 1 ? "s" : ""}
              </span>
            </div>
          )}
          {currentStreak > 0 && (
            <span className="text-[11px] text-theme-text/25">
              Next freeze at {nextFreezeMilestone} days
            </span>
          )}
        </div>
      </div>

      {/* stats */}
      {total > 0 ? (
        <>
          <hr className="border-theme-border mb-4" />

          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={<Trophy size={16} />}
              value={`${winRate}%`}
              label="Win rate"
              accent="text-exact"
            />
            <StatCard icon={<Zap size={16} />} value={`${wins}/${total}`} label="Won / Played" />
            <StatCard icon={<Target size={16} />} value={avgGuesses} label="Avg guesses" />
            <StatCard icon={<Clock size={16} />} value={avgTime} label="Avg time" />
          </div>

          <div className="mt-3 flex justify-center gap-2">
            {wins > 0 && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-exact/10 text-exact text-xs">
                <Clock size={12} />
                <span>Best: {bestTime}</span>
              </div>
            )}
            {hardWins > 0 && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-correct/10 text-correct text-xs">
                <FlaskConical size={12} />
                <span>
                  {hardWins} hard {hardWins === 1 ? "win" : "wins"}
                </span>
              </div>
            )}
          </div>
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
