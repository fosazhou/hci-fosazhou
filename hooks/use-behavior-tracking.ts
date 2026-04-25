"use client"

import { useEffect, useRef, useCallback } from "react"
import { useReadingMode } from "@/contexts/reading-mode-context"

export function useBehaviorTracking() {
  const { trackReading, trackOperation } = useReadingMode()
  
  // Scroll tracking state
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const scrollSpeeds = useRef<number[]>([])
  const maxScrollDepth = useRef(0)
  const wasScrollingUp = useRef(false)

  // Track scroll behavior - separated into reading metrics
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      const currentY = window.scrollY
      const timeDiff = now - lastScrollTime.current
      const scrollDiff = currentY - lastScrollY.current
      const scrollDiffAbs = Math.abs(scrollDiff)
      
      if (timeDiff > 50) { // Debounce
        // Calculate instantaneous speed
        const speed = (scrollDiffAbs / timeDiff) * 1000
        scrollSpeeds.current.push(speed)
        
        // Keep only last 20 measurements for average
        if (scrollSpeeds.current.length > 20) {
          scrollSpeeds.current.shift()
        }
        
        // Calculate rolling average velocity
        const avgSpeed = scrollSpeeds.current.length > 0
          ? scrollSpeeds.current.reduce((a, b) => a + b, 0) / scrollSpeeds.current.length
          : 0
        
        // Calculate scroll depth (0-1)
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const currentDepth = maxScroll > 0 ? currentY / maxScroll : 0
        const clampedDepth = Math.min(1, Math.max(0, currentDepth))
        
        // Track max depth reached
        if (clampedDepth > maxScrollDepth.current) {
          maxScrollDepth.current = clampedDepth
        }
        
        // Detect revisit (scrolling back up after reaching depth)
        const isScrollingUp = scrollDiff < -50
        if (isScrollingUp && !wasScrollingUp.current && maxScrollDepth.current > 0.3) {
          // User scrolled back up - this is a revisit
          trackReading({ revisitCount: undefined }) // Will be incremented in context
        }
        wasScrollingUp.current = isScrollingUp
        
        // Update reading metrics
        trackReading({
          scrollVelocity: avgSpeed,
          scrollDepth: maxScrollDepth.current,
        })
      }
      
      lastScrollY.current = currentY
      lastScrollTime.current = now
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [trackReading])

  // Operation tracking functions
  const trackClick = useCallback(() => {
    trackOperation("clickCount")
  }, [trackOperation])

  const trackHover = useCallback(() => {
    trackOperation("hoverCount")
  }, [trackOperation])

  const trackTimelineDrag = useCallback(() => {
    trackOperation("timelineDragCount")
  }, [trackOperation])

  const trackSliderDrag = useCallback(() => {
    trackOperation("sliderDragCount")
  }, [trackOperation])

  const trackLayerToggle = useCallback(() => {
    trackOperation("layerToggleCount")
  }, [trackOperation])

  const trackNodeClick = useCallback(() => {
    trackOperation("nodeClickCount")
  }, [trackOperation])

  // Global click tracking
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Only track meaningful clicks (not on buttons that have their own tracking)
      const target = e.target as HTMLElement
      if (!target.closest("button") && !target.closest("a")) {
        trackClick()
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [trackClick])

  return {
    // Export individual trackers for components to use
    trackClick,
    trackHover,
    trackTimelineDrag,
    trackSliderDrag,
    trackLayerToggle,
    trackNodeClick,
  }
}

// Hook to track content section visibility for reading behavior
export function useContentVisibility(sectionId: string, sectionType: "hero" | "summary" | "process" | "research" | "other" = "other") {
  const { trackReading } = useReadingMode()
  const elementRef = useRef<HTMLElement | null>(null)
  const entryTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const element = document.getElementById(sectionId)
    if (!element) return
    
    elementRef.current = element

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entryTimeRef.current = Date.now()
          } else if (entryTimeRef.current) {
            // Track time spent in this section
            const timeSpent = Date.now() - entryTimeRef.current
            // Could be used for per-section analytics
            entryTimeRef.current = null
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [sectionId, trackReading])

  return elementRef
}
