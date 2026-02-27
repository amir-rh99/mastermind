import { Celebrate } from "@/components/Celebrate/Celebrate"
import { PickerBox } from "@/components/PickerBox/PickerBox"
import { useGame } from "@/hooks"
import { BoardRow } from "./BoardRow"
import { Target } from "./Target"

export function Board() {
  const { game } = useGame()
  const { model, status } = game

  return (
    <>
      {status === "won" && <Celebrate />}

      <div className="max-w-[30rem] mx-auto p-4 flex flex-col">
        <Target />

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
