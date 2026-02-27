import { COLORS } from "@/lib"
import { Github, Keyboard, Lightbulb } from "lucide-react"

const C = {
  purple: COLORS[1], // #9C27B0
  blue: COLORS[2], // #3F51B5
  cyan: COLORS[3], // #03A9F4
  brown: COLORS[8], // #795548
  gray: COLORS[9], // #607D8B
}

function Dot({ color, dim }: { color: string; dim?: boolean }) {
  return (
    <span
      className={`inline-block w-7 h-7 rounded-lg align-middle ${dim ? "opacity-40" : ""}`}
      style={{ backgroundColor: color }}
    />
  )
}

function HintDot({ type }: { type: "exact" | "correct" | "wrong" }) {
  const bg = type === "exact" ? "bg-exact" : type === "correct" ? "bg-correct" : "bg-wrong"
  return <span className={`inline-block w-3.5 h-3.5 rounded-sm ${bg}`} />
}

export function About() {
  return (
    <div>
      <h2 className="text-theme-title mb-1">How to Play</h2>
      <p className="about-text text-theme-text/60 mb-4">
        A secret code of 4 colors is hidden. You have 8 attempts to crack it. After each guess,
        hints tell you how close you are.
      </p>

      {/* example */}
      <div className="rounded-xl bg-theme-surface/15 p-4 mb-3">
        <p className="text-sm text-theme-text/50 m-0 mb-3 flex items-center gap-1.5">
          <Lightbulb size={14} />
          Example
        </p>

        {/* secret row */}
        <div className="flex items-center gap-2 mb-2.5 pb-2.5 border-b border-theme-border/50">
          <span className="text-[11px] text-theme-text/35 w-11 shrink-0">Secret</span>
          <div className="flex gap-1.5">
            <Dot color={C.cyan} />
            <Dot color={C.purple} />
            <Dot color={C.brown} />
            <Dot color={C.blue} />
          </div>
        </div>

        {/* guess row */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] text-theme-text/35 w-11 shrink-0">Guess</span>
          <div className="flex gap-1.5">
            <Dot color={C.brown} />
            <Dot color={C.purple} />
            <Dot color={C.gray} />
            <Dot color={C.cyan} />
          </div>
          <span className="text-theme-text/20 mx-0.5">→</span>
          <div className="grid grid-cols-2 gap-1">
            <HintDot type="exact" />
            <HintDot type="correct" />
            <HintDot type="correct" />
            <HintDot type="wrong" />
          </div>
        </div>

        {/* breakdown */}
        <div className="flex flex-col gap-1.5 text-xs text-theme-text/55 leading-snug">
          <div className="flex items-center gap-2">
            <HintDot type="exact" />
            <span>
              <span className="text-exact font-bold">Exact</span> — <Dot color={C.purple} /> is the
              right color in the right spot
            </span>
          </div>
          <div className="flex items-center gap-2">
            <HintDot type="correct" />
            <span>
              <span className="text-correct font-bold">Misplaced</span> — <Dot color={C.brown} />{" "}
              and <Dot color={C.cyan} /> are in the code but wrong position
            </span>
          </div>
          <div className="flex items-center gap-2">
            <HintDot type="wrong" />
            <span>
              <span className="text-wrong font-bold">Wrong</span> — <Dot color={C.gray} /> is not in
              the code at all
            </span>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-theme-text/30 mb-4">
        Hints are shuffled — their position doesn't match your guess order.
      </p>

      {/* controls */}
      <div className="rounded-xl bg-theme-surface/15 p-3 mb-3">
        <p className="text-sm text-theme-text/50 m-0 mb-1 flex items-center gap-1.5">
          <Keyboard size={14} />
          Controls
        </p>
        <p className="text-xs text-theme-text/50 m-0 leading-relaxed">
          <span className="text-theme-title">0–9</span> pick color ·{" "}
          <span className="text-theme-title">← →</span> move ·{" "}
          <span className="text-theme-title">⌫</span> delete ·{" "}
          <span className="text-theme-title">↵</span> submit
        </p>
      </div>

      {/* footer */}
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
