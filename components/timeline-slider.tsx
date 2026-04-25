"use client"

import { cn } from "@/lib/utils"
import { useState, useRef, useCallback, useEffect } from "react"

export interface TimelineWork {
  id: string
  title: string
  year: number
  type: 'project' | 'exchange' | 'work'
  coverImage?: string
  keywords: string[]
}

interface TimelineSliderProps {
  startYear: number
  endYear: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  allWorks?: TimelineWork[]
  className?: string
}

export function TimelineSlider({
  startYear,
  endYear,
  value,
  onChange,
  allWorks = [],
  className,
}: TimelineSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [currentYear, setCurrentYear] = useState(endYear)
  
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
  
  // Get works count for a year
  const getWorksCount = (year: number) => allWorks.filter(w => w.year === year).length
  
  // Calculate position from year (0% = startYear, 100% = endYear)
  const getPositionFromYear = (year: number) => {
    return ((year - startYear) / (endYear - startYear)) * 100
  }
  
  // Get year from position with snapping
  const getYearFromPosition = (position: number) => {
    const rawYear = startYear + (position / 100) * (endYear - startYear)
    const year = Math.round(rawYear)
    return Math.max(startYear, Math.min(endYear, year))
  }

  const updateFromPosition = useCallback((clientX: number) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const position = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    const year = getYearFromPosition(position)
    setCurrentYear(year)
    // Filter from startYear to current dragged year
    onChange([startYear, year])
  }, [startYear, endYear, onChange])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    updateFromPosition(e.clientX)
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    updateFromPosition(e.clientX)
  }, [isDragging, updateFromPosition])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    updateFromPosition(e.touches[0].clientX)
  }

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return
    updateFromPosition(e.touches[0].clientX)
  }, [isDragging, updateFromPosition])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("touchmove", handleTouchMove as any)
      window.addEventListener("touchend", handleMouseUp)
      return () => {
        window.removeEventListener("touchmove", handleTouchMove as any)
        window.removeEventListener("touchend", handleMouseUp)
      }
    }
  }, [isDragging, handleTouchMove, handleMouseUp])

  // Click on year marker
  const handleYearClick = (year: number) => {
    setCurrentYear(year)
    onChange([startYear, year])
  }

  const sliderPosition = getPositionFromYear(currentYear)

  return (
    <div className={cn("relative select-none", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-mono text-muted-foreground/60 tracking-widest">
          Timeline
        </span>
        <span className="text-sm font-mono text-primary">
          {startYear}{currentYear !== endYear && `—${currentYear}`}
        </span>
      </div>
      
      {/* Timeline track */}
      <div 
        ref={trackRef}
        className="relative h-10 cursor-pointer"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Background track */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 bg-[rgba(255,255,255,0.1)]" />
        
        {/* Active track */}
        <div 
          className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-primary transition-[width] duration-100 ease-out"
          style={{ width: `${sliderPosition}%` }}
        />
        
        {/* Year markers */}
        {years.map((year) => {
          const pos = getPositionFromYear(year)
          const isActive = year <= currentYear
          const count = getWorksCount(year)
          
          return (
            <button
              key={year}
              onClick={() => handleYearClick(year)}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
              style={{ left: `${pos}%` }}
            >
              {/* Dot */}
              <div 
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  isActive 
                    ? "bg-primary scale-100" 
                    : "bg-[rgba(255,255,255,0.2)] scale-75 hover:scale-100 hover:bg-[rgba(255,255,255,0.4)]"
                )}
              />
              {/* Year label */}
              <span 
                className={cn(
                  "absolute top-5 text-[10px] font-mono transition-colors whitespace-nowrap",
                  isActive ? "text-primary" : "text-muted-foreground/40"
                )}
              >
                {year}
                {count > 0 && (
                  <span className="text-[8px] ml-0.5 opacity-60">({count})</span>
                )}
              </span>
            </button>
          )
        })}
        
        {/* Draggable handle */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20",
            "transition-[left] duration-100 ease-out",
            isDragging && "transition-none"
          )}
          style={{ left: `${sliderPosition}%` }}
        >
          <div 
            className={cn(
              "w-4 h-4 rounded-full border-2 border-primary bg-background",
              "transition-transform duration-150",
              "hover:scale-125",
              isDragging && "scale-125"
            )}
            style={{
              boxShadow: "0 0 10px var(--primary-glow)"
            }}
          />
        </div>
      </div>
    </div>
  )
}
