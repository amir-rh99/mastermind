import { BASE_MODELS, COLORS } from "@/lib"
import { Github, Lightbulb } from "lucide-react"

const C = {
  purple: COLORS[1],
  blue: COLORS[2],
  cyan: COLORS[3],
  brown: COLORS[8],
  gray: COLORS[9],
}

function Dot({ color, label }: { color: string; label?: string }) {
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-lg align-middle text-[9px] font-bold text-white/80 shrink-0"
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  )
}

function HintDot({ type }: { type: "exact" | "correct" | "wrong" }) {
  const bg = type === "exact" ? "bg-exact" : type === "correct" ? "bg-correct" : "bg-wrong"
  return <span className={`inline-block w-3.5 h-3.5 rounded-sm shrink-0 ${bg}`} />
}

export function About() {
  const normal = BASE_MODELS.normal

  return (
    <div>
      <h2 className="text-theme-title mb-1">How to Play</h2>
      <p className="about-text text-theme-text/60 mb-4">
        Crack the secret code of{" "}
        <span className="text-theme-title font-bold">{normal.size} colors</span> in{" "}
        <span className="text-theme-title font-bold">{normal.chances} guesses</span> or fewer. After
        each guess, hints reveal how close you are.
      </p>

      {/* ─── Example ─── */}
      <div className="rounded-xl bg-theme-surface/15 p-4 mb-3">
        <p className="text-sm text-theme-text/50 m-0 mb-3 flex items-center gap-1.5">
          <Lightbulb size={14} />
          Example
        </p>

        {/* secret row */}
        <div className="flex items-center gap-2 mb-2.5 pb-2.5 border-b border-theme-border/50">
          <span className="text-[11px] text-theme-text/35 w-11 shrink-0">Secret</span>
          <div className="flex gap-1.5">
            <Dot color={C.cyan} label="3" />
            <Dot color={C.purple} label="1" />
            <Dot color={C.brown} label="8" />
            <Dot color={C.blue} label="2" />
          </div>
        </div>

        {/* guess row */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] text-theme-text/35 w-11 shrink-0">Guess</span>
          <div className="flex gap-1.5">
            <Dot color={C.brown} label="8" />
            <Dot color={C.purple} label="1" />
            <Dot color={C.gray} label="9" />
            <Dot color={C.cyan} label="3" />
          </div>
          <span className="text-theme-text/20 mx-0.5">→</span>
          <div className="grid grid-cols-2 gap-1">
            <HintDot type="exact" />
            <HintDot type="correct" />
            <HintDot type="correct" />
            <HintDot type="wrong" />
          </div>
        </div>

        {/* breakdown — each hint type as a full-width row */}
        <div className="flex flex-col gap-2.5 text-xs text-theme-text/55 leading-snug">
          <div className="flex gap-2">
            <HintDot type="exact" />
            <p className="m-0">
              <span className="text-exact font-bold">Exact</span> — right color, right position.{" "}
              <Dot color={C.purple} label="1" /> is in spot 2 in both rows.
            </p>
          </div>
          <div className="flex gap-2">
            <HintDot type="correct" />
            <p className="m-0">
              <span className="text-correct font-bold">Misplaced</span> — right color, wrong
              position. <Dot color={C.brown} label="8" /> and <Dot color={C.cyan} label="3" /> are
              in the code but need to move.
            </p>
          </div>
          <div className="flex gap-2">
            <HintDot type="wrong" />
            <p className="m-0">
              <span className="text-wrong font-bold">Wrong</span> — not in the code at all.{" "}
              <Dot color={C.gray} label="9" /> can be eliminated.
            </p>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-theme-text/50 mb-4">
        Hint positions are shuffled — they don't correspond to your guess order.
      </p>

      {/* ─── Footer ─── */}
      <div className="text-center pt-1">
        <a
          href="https://github.com/amir-rh99/mastermind"
          target="_blank"
          rel="noopener noreferrer"
          className="text-theme-icon hover:text-theme-title transition-colors"
        >
          <Github size={24} />
        </a>
      </div>
    </div>
  )
}
