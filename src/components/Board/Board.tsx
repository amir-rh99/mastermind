import { Celebrate } from "@/components/Celebrate/Celebrate"
import { PickerBox } from "@/components/PickerBox/PickerBox"
import { useGame } from "@/hooks"
import { useState } from "react"
import { BoardRow } from "./BoardRow"
import { GuessSummary } from "./GuessSummary"
import { Target } from "./Target"

export function Board() {
  const { game } = useGame()
  const { model, status } = game
  const [showSummary, setShowSummary] = useState(false)

  return (
    <>
      {status === "won" && <Celebrate />}

      <GuessSummary visible={showSummary} onClose={() => setShowSummary(false)} />

      <div className="max-w-[30rem] mx-auto px-4 py-2 flex flex-col">
        <Target onSummaryToggle={() => setShowSummary((v) => !v)} showSummary={showSummary} />

        <div className="flex flex-col-reverse gap-2 mb-40">
          {Array.from({ length: model.chances }, (_, i) => (
            <BoardRow key={i} rowIndex={i} />
          ))}
        </div>

        <PickerBox />
      </div>
    </>
  )
}
