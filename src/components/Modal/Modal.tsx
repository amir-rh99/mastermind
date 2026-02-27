import { cn } from "@/lib"
import { X } from "lucide-react"
import { useCallback, useEffect, type PropsWithChildren } from "react"

interface ModalProps extends PropsWithChildren {
  open: boolean
  onClose: () => void
}

export function Modal({ open, onClose, children }: ModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, handleEscape])

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center",
        "bg-black/40 backdrop-blur-[2px] transition-opacity",
        open
          ? "pointer-events-auto opacity-100 duration-150 ease-in-out"
          : "pointer-events-none opacity-0 duration-500 ease-out",
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "relative flex flex-col",
          "w-full max-w-[34rem] max-h-[85dvh]",
          "m-4 rounded-xl",
          "shadow-[0_8px_40px_rgba(0,0,0,0.2)]",
          "border border-theme-border bg-theme-bg",
          "transition-transform duration-500 ease-out",
          open ? "scale-100" : "scale-0",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-theme-surface border border-theme-border flex items-center justify-center cursor-pointer text-theme-text hover:opacity-75"
        >
          <X size={16} />
        </button>

        <div className="overflow-y-auto overscroll-contain px-6 py-5 modal-scrollbar">
          {children}
        </div>
      </div>
    </div>
  )
}
