import { useGame } from "@/hooks"
import { cn } from "@/lib"
import type { HintStatus } from "@/types"
import { X, GripVertical } from "lucide-react"
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
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // set default position for desktop on first open
  useEffect(() => {
    if (visible && isDesktop && !pos) {
      setPos({ x: 16, y: 64 })
    }
  }, [visible, isDesktop])

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!isDesktop) return
      dragging.current = true
      const rect = panelRef.current?.getBoundingClientRect()
      if (rect) {
        offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      }
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    },
    [isDesktop],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current || !isDesktop) return
      setPos({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      })
    },
    [isDesktop],
  )

  const onPointerUp = useCallback(() => {
    dragging.current = false
  }, [])

  if (!visible || guesses.length === 0) return null

  const rows = [...guesses].reverse()

  const panel = (
    <div
      ref={panelRef}
      className={cn(
        "rounded-2xl border border-theme-border/50 shadow-lg overflow-hidden",
        isDesktop
          ? "fixed z-[101]"
          : "fixed left-1/2 -translate-x-1/2 bottom-44 z-[101] max-w-[90vw]",
      )}
      style={{
        backgroundColor: "rgb(var(--bg) / 0.95)",
        backdropFilter: "blur(8px)",
        ...(isDesktop && pos ? { left: pos.x, top: pos.y } : {}),
      }}
    >
      {/* drag handle / header */}
      <div
        className={cn(
          "flex items-center justify-between px-3 py-1.5 border-b border-theme-border/30",
          isDesktop && "cursor-grab active:cursor-grabbing",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="flex items-center gap-1 text-[11px] text-theme-text/35">
          {isDesktop && <GripVertical size={12} />}
          <span>
            {guesses.length}/{model.chances}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-theme-text/30 hover:text-theme-text/60 transition-colors cursor-pointer p-0.5"
        >
          <X size={14} />
        </button>
      </div>

      {/* guess rows */}
      <div className="p-2 flex flex-col gap-1">
        {rows.map((guess, ri) => {
          const guessNum = guesses.length - ri
          return (
            <div key={ri} className="flex items-center gap-1.5">
              <span className="text-[9px] text-theme-text/20 w-3 text-right tabular-nums shrink-0">
                {guessNum}
              </span>
              <div className="flex gap-0.5">
                {guess.colors.map((color, j) => (
                  <div key={j} className="w-4 h-4 rounded-sm" style={{ backgroundColor: color }} />
                ))}
              </div>
              <div className="flex gap-0.5">
                {guess.hints.map((hint: HintStatus, j: number) => (
                  <div
                    key={j}
                    className={cn(
                      "w-2 h-2 rounded-full",
                      hint === "exact" && "bg-exact",
                      hint === "correct" && "bg-correct",
                      hint === "wrong" && "bg-theme-surface/40",
                    )}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  // mobile: with backdrop
  if (!isDesktop) {
    return (
      <>
        <div className="fixed inset-0 z-[100] bg-black/20" onClick={onClose} />
        {panel}
      </>
    )
  }

  // desktop: floating, no backdrop
  return panel
}
