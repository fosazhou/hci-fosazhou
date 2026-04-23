"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

// Reading modes with their characteristics
export type ReadingMode = "quick" | "process" | "research"

export interface ReadingModeConfig {
  id: ReadingMode
  label: string
  shortLabel: string
  description: string
  icon: string
  estimatedTime: string
  targetAudience: string
}

export const READING_MODES: Record<ReadingMode, ReadingModeConfig> = {
  quick: {
    id: "quick",
    label: "Quick Overview",
    shortLabel: "QUICK",
    description: "1-minute project summary",
    icon: "⚡",
    estimatedTime: "~1 min",
    targetAudience: "Fast scanning",
  },
  process: {
    id: "process",
    label: "Design Process",
    shortLabel: "PROCESS",
    description: "Evolution and methodology",
    icon: "🔄",
    estimatedTime: "~5 min",
    targetAudience: "Design review",
  },
  research: {
    id: "research",
    label: "Research Depth",
    shortLabel: "RESEARCH",
    description: "Problems, logic, strategies",
    icon: "🔬",
    estimatedTime: "~10 min",
    targetAudience: "Research evaluation",
  },
}

// Behavior tracking for auto-suggestion
interface BehaviorMetrics {
  scrollSpeed: number // pixels per second
  timeOnPage: number // seconds
  scrollDepth: number // 0-1
  interactionCount: number
  lastInteraction: number
}

interface ReadingModeContextType {
  // Current mode
  mode: ReadingMode
  setMode: (mode: ReadingMode) => void
  
  // Mode configuration
  modeConfig: ReadingModeConfig
  allModes: typeof READING_MODES
  
  // Suggestion system
  suggestedMode: ReadingMode | null
  showSuggestion: boolean
  dismissSuggestion: () => void
  acceptSuggestion: () => void
  
  // Behavior tracking
  behavior: BehaviorMetrics
  updateBehavior: (metrics: Partial<BehaviorMetrics>) => void
  
  // UI state
  isTransitioning: boolean
}

const ReadingModeContext = createContext<ReadingModeContextType | undefined>(undefined)

export function ReadingModeProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Get initial mode from URL or default to "quick"
  const [mode, setModeState] = useState<ReadingMode>(() => {
    const urlMode = searchParams.get("mode") as ReadingMode
    return urlMode && urlMode in READING_MODES ? urlMode : "quick"
  })
  
  const [suggestedMode, setSuggestedMode] = useState<ReadingMode | null>(null)
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [suggestionDismissed, setSuggestionDismissed] = useState(false)
  
  const [behavior, setBehavior] = useState<BehaviorMetrics>({
    scrollSpeed: 0,
    timeOnPage: 0,
    scrollDepth: 0,
    interactionCount: 0,
    lastInteraction: Date.now(),
  })

  // Sync mode to URL
  const setMode = useCallback((newMode: ReadingMode) => {
    setIsTransitioning(true)
    setModeState(newMode)
    
    // Update URL without navigation
    const params = new URLSearchParams(searchParams.toString())
    params.set("mode", newMode)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    
    // Reset suggestion when manually changing
    setSuggestedMode(null)
    setShowSuggestion(false)
    
    setTimeout(() => setIsTransitioning(false), 300)
  }, [pathname, router, searchParams])

  // Update behavior metrics
  const updateBehavior = useCallback((metrics: Partial<BehaviorMetrics>) => {
    setBehavior(prev => ({ ...prev, ...metrics }))
  }, [])

  // Conservative auto-suggestion logic
  useEffect(() => {
    if (suggestionDismissed) return
    
    // Only suggest after significant engagement
    const shouldSuggestProcess = 
      mode === "quick" &&
      behavior.scrollDepth > 0.8 &&
      behavior.timeOnPage > 60 && // At least 1 minute
      behavior.scrollSpeed < 200 // Slow, careful reading

    const shouldSuggestResearch =
      mode === "process" &&
      behavior.scrollDepth > 0.9 &&
      behavior.timeOnPage > 180 && // At least 3 minutes
      behavior.interactionCount > 5 // Active engagement

    const shouldSuggestQuick =
      (mode === "process" || mode === "research") &&
      behavior.scrollSpeed > 800 && // Fast scrolling
      behavior.timeOnPage < 30 // Very short time

    if (shouldSuggestProcess && suggestedMode !== "process") {
      setSuggestedMode("process")
      setShowSuggestion(true)
    } else if (shouldSuggestResearch && suggestedMode !== "research") {
      setSuggestedMode("research")
      setShowSuggestion(true)
    } else if (shouldSuggestQuick && suggestedMode !== "quick") {
      setSuggestedMode("quick")
      setShowSuggestion(true)
    }
  }, [behavior, mode, suggestedMode, suggestionDismissed])

  const dismissSuggestion = useCallback(() => {
    setShowSuggestion(false)
    setSuggestionDismissed(true)
  }, [])

  const acceptSuggestion = useCallback(() => {
    if (suggestedMode) {
      setMode(suggestedMode)
    }
    setShowSuggestion(false)
  }, [suggestedMode, setMode])

  // Track time on page
  useEffect(() => {
    const interval = setInterval(() => {
      setBehavior(prev => ({
        ...prev,
        timeOnPage: prev.timeOnPage + 1,
      }))
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  // Reset behavior when navigating
  useEffect(() => {
    setBehavior({
      scrollSpeed: 0,
      timeOnPage: 0,
      scrollDepth: 0,
      interactionCount: 0,
      lastInteraction: Date.now(),
    })
    setSuggestionDismissed(false)
  }, [pathname])

  const value: ReadingModeContextType = {
    mode,
    setMode,
    modeConfig: READING_MODES[mode],
    allModes: READING_MODES,
    suggestedMode,
    showSuggestion,
    dismissSuggestion,
    acceptSuggestion,
    behavior,
    updateBehavior,
    isTransitioning,
  }

  return (
    <ReadingModeContext.Provider value={value}>
      {children}
    </ReadingModeContext.Provider>
  )
}

export function useReadingMode() {
  const context = useContext(ReadingModeContext)
  if (context === undefined) {
    throw new Error("useReadingMode must be used within a ReadingModeProvider")
  }
  return context
}
