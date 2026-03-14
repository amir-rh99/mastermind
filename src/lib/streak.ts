import type { StreakData } from "@/types"

const DEFAULT_STREAK: StreakData = {
  winDates: [],
  freezes: 1,
  freezeUsedDates: [],
}

function toLocalDateStr(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

function startOfDay(d: Date): Date {
  const r = new Date(d)
  r.setHours(0, 0, 0, 0)
  return r
}

export function getToday(): string {
  return toLocalDateStr(new Date())
}

export function recordWin(data: StreakData): StreakData {
  const today = getToday()
  if (data.winDates.includes(today)) return data

  const winDates = [...data.winDates, today]
  const currentStreak = computeStreak(winDates, data.freezeUsedDates)

  const newFreezes = currentStreak > 0 && currentStreak % 5 === 0 ? data.freezes + 1 : data.freezes

  // keep only last 90 days of history to prevent unbounded growth
  const cutoff = toLocalDateStr(addDays(new Date(), -90))
  const trimmedWins = winDates.filter((d) => d >= cutoff)
  const trimmedFreezes = data.freezeUsedDates.filter((d) => d >= cutoff)

  return { ...data, winDates: trimmedWins, freezeUsedDates: trimmedFreezes, freezes: newFreezes }
}

export function computeStreak(winDates: string[], freezeUsedDates: string[]): number {
  const activeDates = new Set([...winDates, ...freezeUsedDates])
  const today = startOfDay(new Date())
  const todayStr = toLocalDateStr(today)

  // start from today if it has activity, otherwise from yesterday
  let current = activeDates.has(todayStr) ? today : addDays(today, -1)
  let streak = 0

  while (activeDates.has(toLocalDateStr(current))) {
    streak++
    current = addDays(current, -1)
  }

  return streak
}

// auto-apply freeze on load if streak would break
// Freeze protects YESTERDAY (a missed day), not today.
// Only applies if: yesterday has no win/freeze, but the day before yesterday did.
export function checkAndApplyFreeze(data: StreakData): StreakData {
  const yesterday = toLocalDateStr(addDays(new Date(), -1))

  // yesterday already covered — nothing to do
  if (data.winDates.includes(yesterday)) return data
  if (data.freezeUsedDates.includes(yesterday)) return data

  // check if the day before yesterday had activity (otherwise no streak to protect)
  const twoDaysAgo = toLocalDateStr(addDays(new Date(), -2))
  const hadPriorActivity =
    data.winDates.includes(twoDaysAgo) || data.freezeUsedDates.includes(twoDaysAgo)

  if (!hadPriorActivity) return data

  if (data.freezes > 0) {
    return {
      ...data,
      freezes: data.freezes - 1,
      freezeUsedDates: [...data.freezeUsedDates, yesterday],
    }
  }

  return data
}

export function getWeekDays(data: StreakData): WeekDay[] {
  const today = startOfDay(new Date())
  const todayStr = toLocalDateStr(today)

  const dow = today.getDay()
  const mondayOffset = dow === 0 ? -6 : 1 - dow
  const monday = addDays(today, mondayOffset)

  const winSet = new Set(data.winDates)
  const freezeSet = new Set(data.freezeUsedDates)
  const labels = ["M", "T", "W", "T", "F", "S", "S"]

  return Array.from({ length: 7 }, (_, i) => {
    const d = addDays(monday, i)
    const ds = toLocalDateStr(d)
    const isToday = ds === todayStr
    const isFuture = d.getTime() > today.getTime()

    let status: WeekDay["status"] = "empty"
    if (winSet.has(ds)) status = "won"
    else if (freezeSet.has(ds)) status = "freeze"
    else if (isFuture) status = "future"

    return { label: labels[i], date: ds, status, isToday }
  })
}

export interface WeekDay {
  label: string
  date: string
  status: "won" | "freeze" | "empty" | "future"
  isToday: boolean
}

export function getDefaultStreak(): StreakData {
  return { ...DEFAULT_STREAK }
}
