"use client"

import { cn } from "@/lib/utils"
import { useReadingMode, READING_MODES } from "@/contexts/reading-mode-context"
import { X, ArrowRight, Zap, GitBranch, Search, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

// Minimized suggestion hint - subtle reminder that can be clicked
function SuggestionHint() {
  const { suggestion, showSuggestionBadge, expandSuggestion } = useReadingMode()
  
  // Only show hint if badge should be visible but popup not shown yet
  if (!showSuggestionBadge || !suggestion.mode || suggestion.shown) return null
  
  const icons = {
    quick: <Zap className="h-3 w-3" />,
    process: <GitBranch className="h-3 w-3" />,
    research: <Search className="h-3 w-3" />,
  }
  
  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
      )}
    >
      <button
        onClick={expandSuggestion}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-full",
          "bg-[rgba(10,10,15,0.85)] backdrop-blur-md",
          "border border-primary/30",
          "hover:border-primary/50 hover:scale-105",
          "transition-all duration-300"
        )}
        style={{
          boxShadow: "0 0 15px rgba(34, 211, 238, 0.15)"
        }}
      >
        <Sparkles className="h-3 w-3 text-primary/70" />
        <span className="text-[10px] font-mono text-primary/70 tracking-wider">
          优化阅读体验?
        </span>
        <span className="flex items-center justify-center w-4 h-4 rounded bg-primary/15 text-primary/70">
          {icons[suggestion.mode]}
        </span>
      </button>
    </div>
  )
}

// Full suggestion popup - shown when badge is clicked
function SuggestionPopup() {
  const { 
    mode, 
    suggestion,
    dismissSuggestion, 
    acceptSuggestion,
    inference,
  } = useReadingMode()
  
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (suggestion.shown && suggestion.mode) {
      const timer = setTimeout(() => setIsVisible(true), 50)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [suggestion.shown, suggestion.mode])

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

  if (!suggestion.shown || !suggestion.mode) return null

  const suggestedConfig = READING_MODES[suggestion.mode]
  const currentConfig = READING_MODES[mode]

  const icons = {
    quick: <Zap className="h-4 w-4" />,
    process: <GitBranch className="h-4 w-4" />,
    research: <Search className="h-4 w-4" />,
  }

  const readerTypeLabels = {
    skim: "快速浏览型",
    process: "过程导向型",
    research: "研究深度型",
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "max-w-xs",
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
            background: `linear-gradient(transparent 50%, rgba(34, 211, 238, 0.02) 50%)`,
            backgroundSize: "100% 4px",
          }}
        />
        
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded bg-primary/20 text-primary">
              {icons[suggestion.mode]}
            </span>
            <div>
              <p className="text-[9px] font-mono text-primary/60 tracking-widest uppercase">
                READING_PATTERN_DETECTED
              </p>
              <p className="text-xs font-medium text-foreground mt-0.5">
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
        
        {/* Reader type and confidence */}
        {inference && (
          <div className="flex items-center justify-between mb-3 text-[10px] font-mono">
            <span className="text-muted-foreground">
              Pattern: <span className="text-primary">{readerTypeLabels[inference.readerType]}</span>
            </span>
            <span className="text-muted-foreground/60">
              Conf: {Math.round(inference.confidence * 100)}%
            </span>
          </div>
        )}
        
        {/* Reason */}
        <p className="text-[11px] text-muted-foreground mb-4 leading-relaxed">
          {suggestion.reason}
        </p>
        
        {/* Mode transition visualization */}
        <div className="flex items-center justify-center gap-3 mb-4 py-2 px-3 rounded bg-[rgba(34,211,238,0.05)] border border-[rgba(34,211,238,0.1)]">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">{icons[mode]}</span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {currentConfig.shortLabel}
            </span>
          </div>
          <ArrowRight className="h-3 w-3 text-primary" />
          <div className="flex items-center gap-1.5">
            <span className="text-primary">{icons[suggestion.mode]}</span>
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
              "flex-1 px-3 py-2 rounded text-[10px] font-mono tracking-wider",
              "border border-[rgba(34,211,238,0.2)] text-muted-foreground",
              "hover:border-[rgba(34,211,238,0.3)] hover:text-foreground",
              "transition-all duration-200"
            )}
          >
            STAY
          </button>
          <button
            onClick={handleAccept}
            className={cn(
              "flex-1 px-3 py-2 rounded text-[10px] font-mono tracking-wider",
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
        <p className="mt-3 text-[8px] font-mono text-muted-foreground/50 text-center">
          Won&apos;t ask again on this page
        </p>
      </div>
    </div>
  )
}

// Combined export
export function ReadingModeSuggestion() {
  return (
    <>
      <SuggestionHint />
      <SuggestionPopup />
    </>
  )
}
