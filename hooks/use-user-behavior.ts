"use client"

import { useState, useEffect, useCallback } from "react"

// ============================================
// USER BEHAVIOR TRACKING SYSTEM
// Tracks click weights for adaptive UI reordering
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

export function useUserBehavior() {
  const [state, setState] = useState<UserBehaviorState>({
    tagWeights: {},
    topTag: null,
    totalClicks: 0,
  })
  const [isLoaded, setIsLoaded] = useState(false)

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

  // Track a click on project with given tags
  const trackClick = useCallback((tags: string[]) => {
    setState((prev) => {
      const newWeights = { ...prev.tagWeights }
      
      // Increment weight for each tag
      tags.forEach((tag) => {
        newWeights[tag] = (newWeights[tag] || 0) + 1
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
        totalClicks: prev.totalClicks + 1,
      }
    })
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
