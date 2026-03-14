import { useGame } from "@/hooks"
import { cn, COLORS } from "@/lib"
import type { HintStatus } from "@/types"
import { X, GripHorizontal } from "lucide-react"
import { useState, useRef, useCallback, useEffect } from "react"

interface GuessSummaryProps {
  visible: boolean
  onClose: () => void
}

export function GuessSummary({ visible, onClose }: GuessSummaryProps) {
  const { game } = useGame()
  const { guesses, model } = game

  const panelRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  // set default position on first open
  useEffect(() => {
    if (visible && !pos) {
      const isWide = window.innerWidth >= 768
      setPos({
        x: isWide ? 16 : Math.max(8, (window.innerWidth - 180) / 2),
        y: isWide ? 64 : 80,
      })
    }
  }, [visible])

  // update guesses while open — scroll latest into view
  const listRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (visible && listRef.current) {
      listRef.current.scrollTop = 0
    }
  }, [guesses.length, visible])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true
    const rect = panelRef.current?.getBoundingClientRect()
    if (rect) {
      offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return
    const x = Math.max(0, Math.min(window.innerWidth - 60, e.clientX - offset.current.x))
    const y = Math.max(0, Math.min(window.innerHeight - 60, e.clientY - offset.current.y))
    setPos({ x, y })
  }, [])

  const onPointerUp = useCallback(() => {
    dragging.current = false
  }, [])

  if (!visible || guesses.length === 0) return null

  const rows = [...guesses].reverse()

  return (
    <div
      ref={panelRef}
      className="fixed z-[101] rounded-xl shadow-xl overflow-hidden border border-theme-border/40"
      style={{
        backgroundColor: "rgb(var(--bg) / 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        left: pos?.x ?? 16,
        top: pos?.y ?? 80,
        maxHeight: "calc(100dvh - 200px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* drag handle */}
      <div
        className="flex items-center justify-between px-2.5 py-1.5 border-b border-theme-border/20 cursor-grab active:cursor-grabbing select-none touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="flex items-center gap-1.5">
          <GripHorizontal size={14} className="text-theme-text/35" />
          <span className="text-[10px] text-theme-text/50 tabular-nums">
            {guesses.length}/{model.chances}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-theme-text/40 hover:text-theme-text/60 transition-colors cursor-pointer p-0.5 -mr-0.5"
        >
          <X size={14} />
        </button>
      </div>

      {/* scrollable guess list */}
      <div
        ref={listRef}
        className="overflow-y-auto overscroll-contain p-2 flex flex-col gap-1.5 modal-scrollbar"
      >
        {rows.map((guess, ri) => {
          const guessNum = guesses.length - ri
          const exactCount = guess.hints.filter((h: HintStatus) => h === "exact").length
          const isLatest = ri === 0

          return (
            <div
              key={ri}
              className={cn(
                "flex items-center gap-2 rounded-lg px-1.5 py-1 transition-colors",
                isLatest && "bg-theme-surface/10",
              )}
            >
              {/* guess number */}
              <span
                className={cn(
                  "text-[9px] w-3 text-right tabular-nums shrink-0",
                  isLatest ? "text-theme-text/60 font-bold" : "text-theme-text/30",
                )}
              >
                {guessNum}
              </span>

              {/* color dots */}
              <div className="flex gap-0.5">
                {guess.colors.map((color: string, j: number) => {
                  const colorIndex = COLORS.indexOf(color as (typeof COLORS)[number])
                  return (
                    <div
                      key={j}
                      className="w-5 h-5 rounded-md shadow-sm relative flex items-center justify-center"
                      style={{ backgroundColor: color }}
                    >
                      <span className="text-[8px] text-white font-bold leading-none">
                        {colorIndex >= 0 ? colorIndex : ""}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* hint dots */}
              <div className="flex gap-0.5 ml-0.5">
                {guess.hints.map((hint: HintStatus, j: number) => (
                  <div
                    key={j}
                    className={cn(
                      "w-2 h-2 rounded-full",
                      hint === "exact" && "bg-exact",
                      hint === "correct" && "bg-correct",
                      hint === "wrong" && "bg-theme-surface/30",
                    )}
                  />
                ))}
              </div>

              {/* exact count badge for quick scanning */}
              {exactCount > 0 && (
                <span
                  className={cn(
                    "text-[8px] tabular-nums ml-auto shrink-0",
                    exactCount === model.size ? "text-exact font-bold" : "text-exact/50",
                  )}
                >
                  {exactCount}✓
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
