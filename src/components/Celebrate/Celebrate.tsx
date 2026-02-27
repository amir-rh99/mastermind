export function Celebrate() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-[49]">
      {Array.from({ length: 25 }, (_, i) => (
        <div key={i} className="confetti-particle" />
      ))}
    </div>
  )
}
