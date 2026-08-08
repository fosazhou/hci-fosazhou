"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

// Reading modes
export type ReadingMode = "quick" | "process" | "research"
export type ReaderType = "skim" | "process" | "research"

export interface ReadingModeConfig {
  id: ReadingMode
  label: string
  shortLabel: string
  description: string
  estimatedTime: string
  targetAudience: string
}

export const READING_MODES: Record<ReadingMode, ReadingModeConfig> = {
  quick: {
    id: "quick",
    label: "Quick Overview",
    shortLabel: "QUICK",
    description: "1-minute project summary",
    estimatedTime: "~1 min",
    targetAudience: "Fast scanning",
  },
  process: {
    id: "process",
    label: "Design Process",
    shortLabel: "PROCESS",
    description: "Evolution and methodology",
    estimatedTime: "~5 min",
    targetAudience: "Design review",
  },
  research: {
    id: "research",
    label: "Research Depth",
    shortLabel: "RESEARCH",
    description: "Problems, logic, strategies",
    estimatedTime: "~10 min",
    targetAudience: "Research evaluation",
  },
}

// Separated behavior metrics
export interface ReadingBehavior {
  dwellTime: number // seconds on page
  scrollVelocity: number // average px/s
  scrollDepth: number // 0-1
  revisitCount: number // times scrolled back up
}

export interface OperationBehavior {
  clickCount: number
  hoverCount: number
  modeSwitchCount: number
  timelineDragCount: number
  sliderDragCount: number
  layerToggleCount: number
  nodeClickCount: number
}

export interface BehaviorMetrics {
  reading: ReadingBehavior
  operations: OperationBehavior
  lastInteractionTime: number
}

// Session log entry for analytics
export interface PageVisitLog {
  pageId: string
  timestamp: number
  timeOnPage: number
  avgScrollSpeed: number
  maxScrollDepth: number
  firstMeaningfulInteraction: number | null
  suggestedMode: ReadingMode | null
  userChosenMode: ReadingMode
  overrideHappened: boolean
}

// Inference result with confidence
export interface InferenceResult {
  suggestedMode: ReadingMode
  confidence: number // 0-1
  readerType: ReaderType
  reason: string
}

// Thresholds for inference rules
const INFERENCE_RULES = {
  skim: {
    maxDwellTime: 30,
    minScrollVelocity: 600,
    maxScrollDepth: 0.5,
    maxInteractions: 2,
  },
  process: {
    minDwellTime: 60,
    maxDwellTime: 300,
    scrollVelocityRange: [100, 400],
    minLayerToggles: 1,
    minTimelineDrags: 1,
  },
  research: {
    minDwellTime: 180,
    maxScrollVelocity: 200,
    minScrollDepth: 0.8,
    minNodeClicks: 2,
    minRevisits: 2,
  },
}

// Confidence threshold for showing suggestions
const CONFIDENCE_THRESHOLD = 0.5

// Cooldown after manual mode switch (5 minutes)
const MANUAL_SWITCH_COOLDOWN = 5 * 60 * 1000

interface SuggestionState {
  mode: ReadingMode | null
  confidence: number
  reason: string
  shown: boolean
  dismissed: boolean
  shownCount: number
}

interface ReadingModeContextType {
  // Current mode
  mode: ReadingMode
  setMode: (mode: ReadingMode, isManual?: boolean) => void
  
  // Mode configuration
  modeConfig: ReadingModeConfig
  allModes: typeof READING_MODES
  
  // Suggestion system (downgraded)
  suggestion: SuggestionState
  showSuggestionBadge: boolean
  expandSuggestion: () => void
  dismissSuggestion: () => void
  acceptSuggestion: () => void
  
  // Behavior tracking
  behavior: BehaviorMetrics
  trackReading: (metrics: Partial<ReadingBehavior>) => void
  trackOperation: (type: keyof OperationBehavior) => void
  
  // Inference
  inference: InferenceResult | null
  
  // UI state
  isTransitioning: boolean
  
  // Logging
  getVisitLog: () => PageVisitLog
}

const ReadingModeContext = createContext<ReadingModeContextType | undefined>(undefined)

// Session storage keys
const SESSION_SUGGESTIONS_KEY = "reading_mode_suggestions"
const SESSION_DISMISSED_KEY = "reading_mode_dismissed"
// Global once-per-session flag: only ever recommend a single time
const SESSION_GLOBAL_SHOWN_KEY = "reading_mode_global_shown"

export function ReadingModeProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Get page ID from pathname
  const pageId = pathname.split("/").pop() || "unknown"
  
  // Get initial mode from URL or default to "quick"
  const [mode, setModeState] = useState<ReadingMode>(() => {
    const urlMode = searchParams.get("mode") as ReadingMode
    return urlMode && urlMode in READING_MODES ? urlMode : "quick"
  })
  
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [suggestion, setSuggestion] = useState<SuggestionState>({
    mode: null,
    confidence: 0,
    reason: "",
    shown: false,
    dismissed: false,
    shownCount: 0,
  })
  const [inference, setInference] = useState<InferenceResult | null>(null)
  const [showSuggestionBadge, setShowSuggestionBadge] = useState(false)
  
  // Track manual mode switch cooldown
  const lastManualSwitchRef = useRef<number>(0)
  const pageStartTimeRef = useRef<number>(Date.now())
  const firstInteractionRef = useRef<number | null>(null)
  
  // Behavior metrics with separated categories
  const [behavior, setBehavior] = useState<BehaviorMetrics>({
    reading: {
      dwellTime: 0,
      scrollVelocity: 0,
      scrollDepth: 0,
      revisitCount: 0,
    },
    operations: {
      clickCount: 0,
      hoverCount: 0,
      modeSwitchCount: 0,
      timelineDragCount: 0,
      sliderDragCount: 0,
      layerToggleCount: 0,
      nodeClickCount: 0,
    },
    lastInteractionTime: Date.now(),
  })

  // Check session storage for already shown suggestions
  const getSessionSuggestions = useCallback(() => {
    if (typeof window === "undefined") return new Set<string>()
    try {
      const stored = sessionStorage.getItem(SESSION_SUGGESTIONS_KEY)
      return stored ? new Set(JSON.parse(stored)) : new Set<string>()
    } catch {
      return new Set<string>()
    }
  }, [])

  const getSessionDismissed = useCallback(() => {
    if (typeof window === "undefined") return new Set<string>()
    try {
      const stored = sessionStorage.getItem(SESSION_DISMISSED_KEY)
      return stored ? new Set(JSON.parse(stored)) : new Set<string>()
    } catch {
      return new Set<string>()
    }
  }, [])

  // Global once-per-session helpers
  const getGlobalShown = useCallback(() => {
    if (typeof window === "undefined") return false
    try {
      return sessionStorage.getItem(SESSION_GLOBAL_SHOWN_KEY) === "1"
    } catch {
      return false
    }
  }, [])

  const markGlobalShown = useCallback(() => {
    if (typeof window === "undefined") return
    try {
      sessionStorage.setItem(SESSION_GLOBAL_SHOWN_KEY, "1")
    } catch {
      // ignore
    }
  }, [])

  const markSuggestionShown = useCallback((pid: string) => {
    if (typeof window === "undefined") return
    const suggestions = getSessionSuggestions()
    suggestions.add(pid)
    sessionStorage.setItem(SESSION_SUGGESTIONS_KEY, JSON.stringify([...suggestions]))
  }, [getSessionSuggestions])

  const markPageDismissed = useCallback((pid: string) => {
    if (typeof window === "undefined") return
    const dismissed = getSessionDismissed()
    dismissed.add(pid)
    sessionStorage.setItem(SESSION_DISMISSED_KEY, JSON.stringify([...dismissed]))
  }, [getSessionDismissed])

  // Sync mode to URL
  const setMode = useCallback((newMode: ReadingMode, isManual = true) => {
    setIsTransitioning(true)
    setModeState(newMode)
    
    // Update URL without navigation
    const params = new URLSearchParams(searchParams.toString())
    params.set("mode", newMode)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    
    if (isManual) {
      // Track manual switch
      lastManualSwitchRef.current = Date.now()
      setBehavior(prev => ({
        ...prev,
        operations: {
          ...prev.operations,
          modeSwitchCount: prev.operations.modeSwitchCount + 1,
        },
      }))
      
      // Clear suggestion after manual switch
      setSuggestion(prev => ({ ...prev, mode: null, shown: false }))
      setShowSuggestionBadge(false)
    }
    
    setTimeout(() => setIsTransitioning(false), 300)
  }, [pathname, router, searchParams])

  // Track reading behavior
  const trackReading = useCallback((metrics: Partial<ReadingBehavior>) => {
    setBehavior(prev => ({
      ...prev,
      reading: { ...prev.reading, ...metrics },
      lastInteractionTime: Date.now(),
    }))
    
    if (!firstInteractionRef.current) {
      firstInteractionRef.current = Date.now() - pageStartTimeRef.current
    }
  }, [])

  // Track operation behavior - each type independently
  const trackOperation = useCallback((type: keyof OperationBehavior) => {
    setBehavior(prev => ({
      ...prev,
      operations: {
        ...prev.operations,
        [type]: prev.operations[type] + 1,
      },
      lastInteractionTime: Date.now(),
    }))
    
    if (!firstInteractionRef.current) {
      firstInteractionRef.current = Date.now() - pageStartTimeRef.current
    }
  }, [])

  // Inference logic with rule matrix
  const computeInference = useCallback((): InferenceResult | null => {
    const { reading, operations } = behavior
    const totalOperations = Object.values(operations).reduce((a, b) => a + b, 0)
    
    // Calculate scores for each reader type
    let skimScore = 0
    let processScore = 0
    let researchScore = 0
    
    // Skim reader signals
    if (reading.dwellTime < INFERENCE_RULES.skim.maxDwellTime) skimScore += 0.3
    if (reading.scrollVelocity > INFERENCE_RULES.skim.minScrollVelocity) skimScore += 0.3
    if (reading.scrollDepth < INFERENCE_RULES.skim.maxScrollDepth) skimScore += 0.2
    if (totalOperations < INFERENCE_RULES.skim.maxInteractions) skimScore += 0.2
    
    // Process reader signals
    if (reading.dwellTime >= INFERENCE_RULES.process.minDwellTime && 
        reading.dwellTime <= INFERENCE_RULES.process.maxDwellTime) processScore += 0.25
    if (reading.scrollVelocity >= INFERENCE_RULES.process.scrollVelocityRange[0] &&
        reading.scrollVelocity <= INFERENCE_RULES.process.scrollVelocityRange[1]) processScore += 0.25
    if (operations.layerToggleCount >= INFERENCE_RULES.process.minLayerToggles) processScore += 0.25
    if (operations.timelineDragCount >= INFERENCE_RULES.process.minTimelineDrags) processScore += 0.25
    
    // Research reader signals
    if (reading.dwellTime >= INFERENCE_RULES.research.minDwellTime) researchScore += 0.25
    if (reading.scrollVelocity < INFERENCE_RULES.research.maxScrollVelocity) researchScore += 0.2
    if (reading.scrollDepth >= INFERENCE_RULES.research.minScrollDepth) researchScore += 0.2
    if (operations.nodeClickCount >= INFERENCE_RULES.research.minNodeClicks) researchScore += 0.2
    if (reading.revisitCount >= INFERENCE_RULES.research.minRevisits) researchScore += 0.15
    
    // Determine winner
    const scores = { skim: skimScore, process: processScore, research: researchScore }
    const maxScore = Math.max(skimScore, processScore, researchScore)
    
    if (maxScore < 0.4) return null // Not enough signal
    
    let readerType: ReaderType
    let suggestedMode: ReadingMode
    let reason: string
    
    if (skimScore === maxScore) {
      readerType = "skim"
      suggestedMode = "quick"
      reason = "Fast scrolling and brief engagement suggest quick overview preference"
    } else if (processScore === maxScore) {
      readerType = "process"
      suggestedMode = "process"
      reason = "Moderate engagement with timeline and layers suggests process interest"
    } else {
      readerType = "research"
      suggestedMode = "research"
      reason = "Deep reading with revisits and node exploration suggests research focus"
    }
    
    // Don't suggest current mode
    if (suggestedMode === mode) return null
    
    return {
      suggestedMode,
      confidence: maxScore,
      readerType,
      reason,
    }
  }, [behavior, mode])

  // Run inference periodically
  useEffect(() => {
    // Don't run inference if:
    // 1. Within manual switch cooldown
    // 2. A suggestion has already been shown once this session (global)
    // 3. Page already dismissed
    
    const timeSinceManualSwitch = Date.now() - lastManualSwitchRef.current
    if (timeSinceManualSwitch < MANUAL_SWITCH_COOLDOWN) return
    
    // Only ever recommend a single time per session
    if (getGlobalShown()) return
    
    const dismissed = getSessionDismissed()
    if (dismissed.has(pageId)) return
    
    // Already surfaced on this page
    if (suggestion.shown || suggestion.dismissed) return
    
    // Only run after minimum engagement
    if (behavior.reading.dwellTime < 10) return
    
    const result = computeInference()
    setInference(result)
    
    // Auto-open the suggestion popup directly (once) when confident enough
    if (result && result.confidence >= CONFIDENCE_THRESHOLD) {
      setSuggestion({
        mode: result.suggestedMode,
        confidence: result.confidence,
        reason: result.reason,
        shown: true,
        dismissed: false,
        shownCount: 1,
      })
      setShowSuggestionBadge(false)
      markSuggestionShown(pageId)
      markGlobalShown()
    }
  }, [behavior.reading.dwellTime, computeInference, getGlobalShown, getSessionDismissed, markGlobalShown, markSuggestionShown, pageId, suggestion.shown, suggestion.dismissed])

  // Expand badge to full suggestion
  const expandSuggestion = useCallback(() => {
    if (suggestion.shownCount >= 1) return // Max 1 popup per page
    
    setSuggestion(prev => ({
      ...prev,
      shown: true,
      shownCount: prev.shownCount + 1,
    }))
    setShowSuggestionBadge(false)
    markSuggestionShown(pageId)
  }, [markSuggestionShown, pageId, suggestion.shownCount])

  const dismissSuggestion = useCallback(() => {
    setSuggestion(prev => ({ ...prev, shown: false, dismissed: true }))
    setShowSuggestionBadge(false)
    markPageDismissed(pageId)
  }, [markPageDismissed, pageId])

  const acceptSuggestion = useCallback(() => {
    if (suggestion.mode) {
      setMode(suggestion.mode, false) // Not manual, came from suggestion
    }
    setSuggestion(prev => ({ ...prev, shown: false }))
    setShowSuggestionBadge(false)
  }, [setMode, suggestion.mode])

  // Track dwell time - update every 5 seconds instead of every second for performance
  useEffect(() => {
    const interval = setInterval(() => {
      setBehavior(prev => ({
        ...prev,
        reading: {
          ...prev.reading,
          dwellTime: prev.reading.dwellTime + 5,
        },
      }))
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  // Reset on page change
  useEffect(() => {
    pageStartTimeRef.current = Date.now()
    firstInteractionRef.current = null
    
    setBehavior({
      reading: {
        dwellTime: 0,
        scrollVelocity: 0,
        scrollDepth: 0,
        revisitCount: 0,
      },
      operations: {
        clickCount: 0,
        hoverCount: 0,
        modeSwitchCount: 0,
        timelineDragCount: 0,
        sliderDragCount: 0,
        layerToggleCount: 0,
        nodeClickCount: 0,
      },
      lastInteractionTime: Date.now(),
    })
    
    setSuggestion({
      mode: null,
      confidence: 0,
      reason: "",
      shown: false,
      dismissed: false,
      shownCount: 0,
    })
    setShowSuggestionBadge(false)
    setInference(null)
  }, [pathname])

  // Generate visit log
  const getVisitLog = useCallback((): PageVisitLog => {
    return {
      pageId,
      timestamp: pageStartTimeRef.current,
      timeOnPage: behavior.reading.dwellTime,
      avgScrollSpeed: behavior.reading.scrollVelocity,
      maxScrollDepth: behavior.reading.scrollDepth,
      firstMeaningfulInteraction: firstInteractionRef.current,
      suggestedMode: suggestion.mode,
      userChosenMode: mode,
      overrideHappened: suggestion.mode !== null && suggestion.mode !== mode,
    }
  }, [behavior.reading, mode, pageId, suggestion.mode])

  const value: ReadingModeContextType = {
    mode,
    setMode,
    modeConfig: READING_MODES[mode],
    allModes: READING_MODES,
    suggestion,
    showSuggestionBadge,
    expandSuggestion,
    dismissSuggestion,
    acceptSuggestion,
    behavior,
    trackReading,
    trackOperation,
    inference,
    isTransitioning,
    getVisitLog,
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
