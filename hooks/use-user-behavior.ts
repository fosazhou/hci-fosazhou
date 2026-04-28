"use client"

import { useState, useEffect, useCallback, useRef } from "react"

// ============================================
// USER BEHAVIOR TRACKING SYSTEM
// Tracks click weights for adaptive UI reordering
// Includes delay mechanism to prevent visible reordering during navigation
// ============================================

interface TagWeights {
  [tag: string]: number
}

interface UserBehaviorState {
  tagWeights: TagWeights
  topTag: string | null
  totalClicks: number
}

const STORAGE_KEY = "fosa_user_behavior"
const REORDER_DELAY = 2000 // 2 seconds delay before reordering

export function useUserBehavior() {
  const [state, setState] = useState<UserBehaviorState>({
    tagWeights: {},
    topTag: null,
    totalClicks: 0,
  })
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Pending updates queue - will be applied after delay
  const pendingUpdatesRef = useRef<string[][]>([])
  const updateTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as UserBehaviorState
        setState(parsed)
      }
    } catch (e) {
      console.error("[v0] Failed to load user behavior:", e)
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.error("[v0] Failed to save user behavior:", e)
    }
  }, [state, isLoaded])

  // Apply pending updates to state
  const applyPendingUpdates = useCallback(() => {
    const updates = pendingUpdatesRef.current
    if (updates.length === 0) return
    
    setState((prev) => {
      const newWeights = { ...prev.tagWeights }
      let clickCount = 0
      
      // Apply all pending tag updates
      updates.forEach((tags) => {
        tags.forEach((tag) => {
          newWeights[tag] = (newWeights[tag] || 0) + 1
        })
        clickCount++
      })

      // Find top tag
      let topTag: string | null = null
      let maxWeight = 0
      Object.entries(newWeights).forEach(([tag, weight]) => {
        if (weight > maxWeight) {
          maxWeight = weight
          topTag = tag
        }
      })

      return {
        tagWeights: newWeights,
        topTag,
        totalClicks: prev.totalClicks + clickCount,
      }
    })
    
    // Clear pending updates
    pendingUpdatesRef.current = []
  }, [])

  // Track a click on project with given tags (delayed update)
  const trackClick = useCallback((tags: string[]) => {
    // Queue the update
    pendingUpdatesRef.current.push(tags)
    
    // Clear existing timer
    if (updateTimerRef.current) {
      clearTimeout(updateTimerRef.current)
    }
    
    // Set new timer to apply updates after delay
    updateTimerRef.current = setTimeout(() => {
      applyPendingUpdates()
      updateTimerRef.current = null
    }, REORDER_DELAY)
  }, [applyPendingUpdates])
  
  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (updateTimerRef.current) {
        clearTimeout(updateTimerRef.current)
      }
    }
  }, [])

  // Sort items by user preference (higher scored tags first)
  const sortByPreference = useCallback(<T extends { keywords: string[] }>(items: T[]): T[] => {
    if (Object.keys(state.tagWeights).length === 0) {
      return items
    }

    return [...items].sort((a, b) => {
      const scoreA = a.keywords.reduce((sum, tag) => sum + (state.tagWeights[tag] || 0), 0)
      const scoreB = b.keywords.reduce((sum, tag) => sum + (state.tagWeights[tag] || 0), 0)
      return scoreB - scoreA
    })
  }, [state.tagWeights])

  // Get formatted weights for display
  const getWeightsDisplay = useCallback((): string => {
    const entries = Object.entries(state.tagWeights)
    if (entries.length === 0) return ""
    
    return entries
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([tag, weight]) => `${tag}:${weight}`)
      .join(" | ")
  }, [state.tagWeights])

  return {
    ...state,
    isLoaded,
    trackClick,
    sortByPreference,
    getWeightsDisplay,
  }
}
