"use client"

import { useEffect, useRef, useCallback } from "react"
import { useReadingMode } from "@/contexts/reading-mode-context"

export function useBehaviorTracking() {
  const { updateBehavior } = useReadingMode()
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const scrollSpeeds = useRef<number[]>([])

  // Track scroll speed
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      const timeDiff = now - lastScrollTime.current
      const scrollDiff = Math.abs(window.scrollY - lastScrollY.current)
      
      if (timeDiff > 0) {
        const speed = (scrollDiff / timeDiff) * 1000 // pixels per second
        scrollSpeeds.current.push(speed)
        
        // Keep only last 10 measurements
        if (scrollSpeeds.current.length > 10) {
          scrollSpeeds.current.shift()
        }
        
        // Calculate average speed
        const avgSpeed = scrollSpeeds.current.reduce((a, b) => a + b, 0) / scrollSpeeds.current.length
        
        // Calculate scroll depth
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const scrollDepth = maxScroll > 0 ? window.scrollY / maxScroll : 0
        
        updateBehavior({
          scrollSpeed: avgSpeed,
          scrollDepth: Math.min(1, Math.max(0, scrollDepth)),
        })
      }
      
      lastScrollY.current = window.scrollY
      lastScrollTime.current = now
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [updateBehavior])

  // Track interactions (clicks, hovers on important elements)
  const trackInteraction = useCallback(() => {
    updateBehavior({
      interactionCount: undefined, // Will be incremented
      lastInteraction: Date.now(),
    })
  }, [updateBehavior])

  useEffect(() => {
    const handleClick = () => {
      updateBehavior({
        lastInteraction: Date.now(),
      })
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [updateBehavior])

  return { trackInteraction }
}

// Hook to track content section visibility
export function useContentVisibility(sectionId: string) {
  const { updateBehavior } = useReadingMode()
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = document.getElementById(sectionId)
    if (!element) return
    
    elementRef.current = element

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateBehavior({
              interactionCount: undefined,
              lastInteraction: Date.now(),
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [sectionId, updateBehavior])

  return elementRef
}
