interface GoldDividerProps {
  className?: string
  variant?: "simple" | "ornate" | "double"
}

export default function GoldDivider({ className = "", variant = "simple" }: GoldDividerProps) {
  if (variant === "ornate") {
    return (
      <div className={`flex items-center justify-center py-4 ${className}`}>
        <div className="h-px w-16 bg-gold-400 opacity-70"></div>
        <div className="mx-3 h-1.5 w-1.5 rotate-45 bg-gold-500"></div>
        <div className="h-px w-8 bg-gold-600"></div>
        <div className="mx-4 flex h-8 w-8 items-center justify-center rounded-full border border-gold-400">
          <div className="h-2 w-2 rounded-full bg-gold-500"></div>
        </div>
        <div className="h-px w-8 bg-gold-600"></div>
        <div className="mx-3 h-1.5 w-1.5 rotate-45 bg-gold-500"></div>
        <div className="h-px w-16 bg-gold-400 opacity-70"></div>
      </div>
    )
  }

  if (variant === "double") {
    return (
      <div className={`flex flex-col items-center gap-1 py-2 ${className}`}>
        <div className="flex w-full items-center justify-center">
          <div className="h-px w-full bg-gold-400 opacity-30"></div>
        </div>
        <div className="flex w-3/4 items-center justify-center">
          <div className="h-px w-full bg-gold-500 opacity-50"></div>
        </div>
      </div>
    )
  }

  // Simple variant (default)
  return (
    <div className={`flex items-center justify-center py-2 ${className}`}>
      <div className="h-px w-12 bg-gold-300 opacity-60"></div>
      <div className="mx-4 h-1.5 w-1.5 rotate-45 bg-gold-500"></div>
      <div className="h-px w-12 bg-gold-300 opacity-60"></div>
    </div>
  )
}

