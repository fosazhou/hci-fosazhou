"use client"

import { cn } from "@/lib/utils"
import { useReadingMode, READING_MODES, type ReadingMode } from "@/contexts/reading-mode-context"
import { Zap, GitBranch, Search } from "lucide-react"
import { useState } from "react"

const modeIcons: Record<ReadingMode, React.ReactNode> = {
  quick: <Zap className="h-3.5 w-3.5" />,
  process: <GitBranch className="h-3.5 w-3.5" />,
  research: <Search className="h-3.5 w-3.5" />,
}

interface ReadingModeSwitcherProps {
  className?: string
  compact?: boolean
}

export function ReadingModeSwitcher({ className, compact = false }: ReadingModeSwitcherProps) {
  const { mode, setMode, modeConfig, isTransitioning } = useReadingMode()
  const [hoveredMode, setHoveredMode] = useState<ReadingMode | null>(null)
  
  const modes = Object.values(READING_MODES)

  if (compact) {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={cn(
              "px-2 py-1 text-[10px] font-mono tracking-wider rounded transition-all duration-200",
              mode === m.id
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-primary/5 border border-transparent"
            )}
          >
            {m.shortLabel}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div 
      id="reading-density-section"
      className={cn(
        "relative",
        "bg-[rgba(10,10,15,0.8)] backdrop-blur-xl",
        "border border-[rgba(34,211,238,0.15)] rounded-lg",
        "p-4",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[rgba(34,211,238,0.1)]">
        <span className="text-[10px] font-mono text-primary/60 tracking-widest">MODE/</span>
        <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
          READING_DENSITY
        </span>
      </div>
      
      {/* Mode buttons */}
      <div className="flex gap-2">
        {modes.map((m, index) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            onMouseEnter={() => setHoveredMode(m.id)}
            onMouseLeave={() => setHoveredMode(null)}
            disabled={isTransitioning}
            className={cn(
              "group relative flex-1 flex flex-col items-center gap-2 p-3 rounded-md",
              "border transition-all duration-300",
              mode === m.id
                ? "bg-primary/10 border-primary/40 text-primary"
                : "bg-transparent border-[rgba(34,211,238,0.1)] text-muted-foreground hover:border-primary/20 hover:text-foreground",
              isTransitioning && "pointer-events-none opacity-50"
            )}
            style={{
              boxShadow: mode === m.id 
                ? "0 0 20px rgba(34, 211, 238, 0.15), inset 0 0 20px rgba(34, 211, 238, 0.05)"
                : "none"
            }}
          >
            {/* Index */}
            <span className={cn(
              "absolute top-1.5 left-2 text-[9px] font-mono",
              mode === m.id ? "text-primary/60" : "text-muted-foreground/40"
            )}>
              {String(index + 1).padStart(2, '0')}
            </span>
            
            {/* Icon */}
            <div className={cn(
              "p-2 rounded-md transition-all duration-300",
              mode === m.id 
                ? "bg-primary/20" 
                : "bg-[rgba(34,211,238,0.05)] group-hover:bg-[rgba(34,211,238,0.1)]"
            )}>
              {modeIcons[m.id]}
            </div>
            
            {/* Label */}
            <span className="text-[10px] font-mono tracking-wider uppercase">
              {m.shortLabel}
            </span>
            
            {/* Time indicator */}
            <span className={cn(
              "text-[9px] font-mono",
              mode === m.id ? "text-primary/60" : "text-muted-foreground/60"
            )}>
              {m.estimatedTime}
            </span>
            
            {/* Active indicator */}
            {mode === m.id && (
              <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" 
                style={{ boxShadow: "0 0 10px var(--primary)" }}
              />
            )}
          </button>
        ))}
      </div>
      
      {/* Mode description */}
      <div className="mt-4 pt-3 border-t border-[rgba(34,211,238,0.1)]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <p className="text-[10px] font-mono text-muted-foreground">
            {hoveredMode ? READING_MODES[hoveredMode].description : modeConfig.description}
          </p>
        </div>
        <p className="mt-1 text-[9px] font-mono text-muted-foreground/60 ml-3.5">
          Target: {hoveredMode ? READING_MODES[hoveredMode].targetAudience : modeConfig.targetAudience}
        </p>
      </div>
    </div>
  )
}

// Inline minimal switcher for header
export function ReadingModeIndicator({ className }: { className?: string }) {
  const { mode, modeConfig } = useReadingMode()
  
  return (
    <div className={cn(
      "flex items-center gap-2 px-2 py-1 rounded",
      "border border-primary/20 bg-primary/5",
      className
    )}>
      {modeIcons[mode]}
      <span className="text-[10px] font-mono text-primary tracking-wider">
        {modeConfig.shortLabel}
      </span>
    </div>
  )
}
