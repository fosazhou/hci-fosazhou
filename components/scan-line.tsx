import { cn } from "@/lib/utils"

interface ScanLineProps {
  className?: string
  speed?: number // seconds for one pass
  color?: string
}

export function ScanLine({
  className,
  speed = 3,
  color = "rgba(34, 211, 238, 0.3)",
}: ScanLineProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div
        className="absolute left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
          animation: `scanMove ${speed}s linear infinite`,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        }}
      />
      <style jsx>{`
        @keyframes scanMove {
          0% {
            top: -2px;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

// Terminal-style cursor blink
export function TerminalCursor({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block w-2 h-5 bg-primary ml-1",
        "animate-pulse",
        className
      )}
      style={{
        boxShadow: "0 0 10px var(--primary-glow)",
      }}
    />
  )
}

// Status indicator with pulse
export function StatusIndicator({
  status = "active",
  label,
  className,
}: {
  status?: "active" | "idle" | "processing"
  label?: string
  className?: string
}) {
  const colors = {
    active: {
      bg: "bg-emerald-500",
      glow: "rgba(16, 185, 129, 0.5)",
    },
    idle: {
      bg: "bg-zinc-500",
      glow: "rgba(113, 113, 122, 0.3)",
    },
    processing: {
      bg: "bg-primary",
      glow: "var(--primary-glow)",
    },
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "w-2 h-2 rounded-full",
          colors[status].bg,
          status === "processing" && "animate-pulse"
        )}
        style={{
          boxShadow: `0 0 8px ${colors[status].glow}`,
        }}
      />
      {label && (
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
      )}
    </div>
  )
}
