"use client"

import { cn } from "@/lib/utils"
import { useReadingMode, READING_MODES } from "@/contexts/reading-mode-context"
import { X, ArrowRight, Zap, GitBranch, Search } from "lucide-react"
import { useEffect, useState } from "react"

export function ReadingModeSuggestion() {
  const { 
    mode, 
    suggestedMode, 
    showSuggestion, 
    dismissSuggestion, 
    acceptSuggestion 
  } = useReadingMode()
  
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (showSuggestion && suggestedMode) {
      // Delay show for smooth entrance
      const timer = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [showSuggestion, suggestedMode])

  const handleDismiss = () => {
    setIsExiting(true)
    setTimeout(() => {
      dismissSuggestion()
      setIsExiting(false)
    }, 200)
  }

  const handleAccept = () => {
    setIsExiting(true)
    setTimeout(() => {
      acceptSuggestion()
      setIsExiting(false)
    }, 200)
  }

  if (!showSuggestion || !suggestedMode) return null

  const suggestedConfig = READING_MODES[suggestedMode]
  const currentConfig = READING_MODES[mode]

  const icons = {
    quick: <Zap className="h-4 w-4" />,
    process: <GitBranch className="h-4 w-4" />,
    research: <Search className="h-4 w-4" />,
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "max-w-sm",
        "transition-all duration-300 ease-out",
        isVisible && !isExiting
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-lg",
          "bg-[rgba(10,10,15,0.95)] backdrop-blur-xl",
          "border border-primary/30",
          "p-4"
        )}
        style={{
          boxShadow: "0 0 30px rgba(34, 211, 238, 0.2), 0 0 60px rgba(34, 211, 238, 0.1)"
        }}
      >
        {/* Scan line effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              transparent 50%,
              rgba(34, 211, 238, 0.02) 50%
            )`,
            backgroundSize: "100% 4px",
          }}
        />
        
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded bg-primary/20 text-primary animate-pulse">
              {icons[suggestedMode]}
            </span>
            <div>
              <p className="text-[10px] font-mono text-primary/60 tracking-widest uppercase">
                SYSTEM_SUGGESTION
              </p>
              <p className="text-xs font-mono text-foreground mt-0.5">
                Switch to {suggestedConfig.label}?
              </p>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {/* Reason */}
        <p className="text-[11px] text-muted-foreground mb-4 leading-relaxed">
          Based on your reading behavior, you might prefer a{" "}
          {suggestedMode === "quick" ? "faster" : "deeper"} view of this content.
        </p>
        
        {/* Mode transition visualization */}
        <div className="flex items-center justify-center gap-3 mb-4 py-2 px-3 rounded bg-[rgba(34,211,238,0.05)] border border-[rgba(34,211,238,0.1)]">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">{icons[mode]}</span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {currentConfig.shortLabel}
            </span>
          </div>
          <ArrowRight className="h-3 w-3 text-primary animate-pulse" />
          <div className="flex items-center gap-1.5">
            <span className="text-primary">{icons[suggestedMode]}</span>
            <span className="text-[10px] font-mono text-primary">
              {suggestedConfig.shortLabel}
            </span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleDismiss}
            className={cn(
              "flex-1 px-3 py-2 rounded text-[11px] font-mono tracking-wider",
              "border border-[rgba(34,211,238,0.2)] text-muted-foreground",
              "hover:border-[rgba(34,211,238,0.3)] hover:text-foreground",
              "transition-all duration-200"
            )}
          >
            DISMISS
          </button>
          <button
            onClick={handleAccept}
            className={cn(
              "flex-1 px-3 py-2 rounded text-[11px] font-mono tracking-wider",
              "bg-primary/20 border border-primary/40 text-primary",
              "hover:bg-primary/30",
              "transition-all duration-200"
            )}
            style={{
              boxShadow: "0 0 15px rgba(34, 211, 238, 0.2)"
            }}
          >
            SWITCH
          </button>
        </div>
        
        {/* Note */}
        <p className="mt-3 text-[9px] font-mono text-muted-foreground/60 text-center">
          Manual override always available
        </p>
      </div>
    </div>
  )
}
