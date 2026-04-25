"use client"

import { useState, useEffect, useMemo } from "react"
import { cn } from "@/lib/utils"
import { useUserBehavior } from "@/hooks/use-user-behavior"

interface BehaviorTrackerDisplayProps {
  section: "projects" | "exchanges" | "works"
  itemCount: number
}

// Minimal scanning phrases
const SCANNING_PHRASES = [
  "analyzing patterns",
  "tracking interactions",
  "mapping preferences",
  "indexing behavior",
]

export function BehaviorTrackerDisplay({ section, itemCount }: BehaviorTrackerDisplayProps) {
  const { isLoaded, totalClicks, topTag } = useUserBehavior()
  const [currentPhrase, setCurrentPhrase] = useState(SCANNING_PHRASES[0])
  const [dotCount, setDotCount] = useState(1)

  // Cycle through scanning phrases
  useEffect(() => {
    if (totalClicks === 0) {
      const phraseInterval = setInterval(() => {
        setCurrentPhrase(prev => {
          const currentIndex = SCANNING_PHRASES.indexOf(prev)
          return SCANNING_PHRASES[(currentIndex + 1) % SCANNING_PHRASES.length]
        })
      }, 2500)
      
      const dotInterval = setInterval(() => {
        setDotCount(prev => prev >= 3 ? 1 : prev + 1)
      }, 500)
      
      return () => {
        clearInterval(phraseInterval)
        clearInterval(dotInterval)
      }
    }
  }, [totalClicks])

  const sectionLabels = {
    projects: "PROJECTS",
    exchanges: "EXPERIENCES",
    works: "ARCHIVE",
  }

  return (
    <div className="flex items-center gap-4 mb-8 text-[10px] font-mono">
      {/* Status indicator */}
      <div className="flex items-center gap-2">
        <div 
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            !isLoaded && "bg-yellow-500/60",
            isLoaded && totalClicks === 0 && "bg-primary/50 animate-pulse",
            isLoaded && totalClicks > 0 && "bg-emerald-500/60"
          )}
        />
        <span className="text-muted-foreground/40 uppercase tracking-widest">
          {sectionLabels[section]}
        </span>
      </div>
      
      {/* Separator */}
      <div className="w-px h-3 bg-border" />
      
      {/* Dynamic status */}
      <span className="text-muted-foreground/30">
        {!isLoaded ? (
          "initializing"
        ) : totalClicks === 0 ? (
          <>{currentPhrase}{".".repeat(dotCount)}</>
        ) : (
          <>
            interest detected: <span className="text-brand/70">{topTag}</span>
          </>
        )}
      </span>
      
      {/* Item count */}
      <span className="text-muted-foreground/20 ml-auto tabular-nums">
        {itemCount} items
      </span>
    </div>
  )
}
