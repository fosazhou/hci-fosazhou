"use client"

import { cn } from "@/lib/utils"
import { useState, useRef, useEffect, useCallback } from "react"

interface TimelineSliderProps {
  startYear: number
  endYear: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  className?: string
}

export function TimelineSlider({
  startYear,
  endYear,
  value,
  onChange,
  className,
}: TimelineSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState<"start" | "end" | null>(null)
  const [hoveredYear, setHoveredYear] = useState<number | null>(null)
  
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
  
  const getPositionFromYear = (year: number) => {
    return ((year - startYear) / (endYear - startYear)) * 100
  }
  
  const getYearFromPosition = (position: number) => {
    const year = Math.round(startYear + (position / 100) * (endYear - startYear))
    return Math.max(startYear, Math.min(endYear, year))
  }

  const handleMouseDown = (handle: "start" | "end") => (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(handle)
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !trackRef.current) return
    
    const rect = trackRef.current.getBoundingClientRect()
    const position = ((e.clientX - rect.left) / rect.width) * 100
    const year = getYearFromPosition(position)
    
    if (isDragging === "start") {
      onChange([Math.min(year, value[1]), value[1]])
    } else {
      onChange([value[0], Math.max(year, value[0])])
    }
  }, [isDragging, value, onChange])

  const handleMouseUp = useCallback(() => {
    setIsDragging(null)
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
  const handleTouchStart = (handle: "start" | "end") => (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(handle)
  }

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !trackRef.current) return
    
    const touch = e.touches[0]
    const rect = trackRef.current.getBoundingClientRect()
    const position = ((touch.clientX - rect.left) / rect.width) * 100
    const year = getYearFromPosition(position)
    
    if (isDragging === "start") {
      onChange([Math.min(year, value[1]), value[1]])
    } else {
      onChange([value[0], Math.max(year, value[0])])
    }
  }, [isDragging, value, onChange])

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

  const startPos = getPositionFromYear(value[0])
  const endPos = getPositionFromYear(value[1])

  return (
    <div className={cn("relative", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">TIME/</span>
          <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
            FILTER_RANGE
          </span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 rounded border border-primary/20 bg-primary/5">
          <span className="text-xs font-mono text-primary">{value[0]}</span>
          <span className="text-[10px] text-muted-foreground">—</span>
          <span className="text-xs font-mono text-primary">{value[1]}</span>
        </div>
      </div>
      
      {/* Timeline track */}
      <div 
        ref={trackRef}
        className="relative h-12 cursor-pointer"
        onMouseMove={(e) => {
          if (!trackRef.current) return
          const rect = trackRef.current.getBoundingClientRect()
          const position = ((e.clientX - rect.left) / rect.width) * 100
          setHoveredYear(getYearFromPosition(position))
        }}
        onMouseLeave={() => setHoveredYear(null)}
      >
        {/* Background track */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-[rgba(34,211,238,0.1)]" />
        
        {/* Active range */}
        <div 
          className="absolute top-1/2 h-[2px] -translate-y-1/2 bg-primary"
          style={{
            left: `${startPos}%`,
            width: `${endPos - startPos}%`,
            boxShadow: "0 0 10px var(--primary-glow), 0 0 20px var(--primary-glow)",
          }}
        />
        
        {/* Year markers */}
        <div className="absolute inset-x-0 top-0 bottom-0 flex justify-between">
          {years.map((year) => {
            const isInRange = year >= value[0] && year <= value[1]
            const isEndpoint = year === value[0] || year === value[1]
            const isHovered = year === hoveredYear
            
            return (
              <div 
                key={year} 
                className="relative flex flex-col items-center"
                style={{ width: `${100 / years.length}%` }}
              >
                {/* Marker dot */}
                <div className="absolute top-1/2 -translate-y-1/2">
                  <div 
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-200",
                      isEndpoint 
                        ? "bg-primary scale-150"
                        : isInRange 
                          ? "bg-primary/60" 
                          : "bg-[rgba(34,211,238,0.2)]",
                      isHovered && !isEndpoint && "scale-125 bg-primary/80"
                    )}
                    style={{
                      boxShadow: isEndpoint 
                        ? "0 0 10px var(--primary-glow), 0 0 20px var(--primary-glow)"
                        : isInRange 
                          ? "0 0 5px var(--primary-glow)"
                          : "none"
                    }}
                  />
                  {/* Pulse animation for endpoints */}
                  {isEndpoint && (
                    <div 
                      className="absolute inset-0 rounded-full bg-primary animate-ping"
                      style={{ animationDuration: "2s" }}
                    />
                  )}
                </div>
                
                {/* Year label */}
                <span 
                  className={cn(
                    "absolute bottom-0 text-[10px] font-mono transition-all duration-200",
                    isInRange ? "text-primary" : "text-muted-foreground/60",
                    isHovered && "text-primary scale-110"
                  )}
                >
                  {year}
                </span>
              </div>
            )
          })}
        </div>
        
        {/* Draggable handles */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab",
            isDragging === "start" && "cursor-grabbing"
          )}
          style={{ left: `${startPos}%` }}
          onMouseDown={handleMouseDown("start")}
          onTouchStart={handleTouchStart("start")}
        >
          <div 
            className={cn(
              "w-5 h-5 rounded-full border-2 border-primary bg-background",
              "transition-transform duration-200",
              isDragging === "start" && "scale-125"
            )}
            style={{
              boxShadow: "0 0 15px var(--primary-glow), 0 0 30px var(--primary-glow)"
            }}
          />
        </div>
        
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab",
            isDragging === "end" && "cursor-grabbing"
          )}
          style={{ left: `${endPos}%` }}
          onMouseDown={handleMouseDown("end")}
          onTouchStart={handleTouchStart("end")}
        >
          <div 
            className={cn(
              "w-5 h-5 rounded-full border-2 border-primary bg-background",
              "transition-transform duration-200",
              isDragging === "end" && "scale-125"
            )}
            style={{
              boxShadow: "0 0 15px var(--primary-glow), 0 0 30px var(--primary-glow)"
            }}
          />
        </div>
      </div>
      
      {/* Hover tooltip */}
      {hoveredYear && !isDragging && (
        <div 
          className="absolute top-0 -translate-y-full -translate-x-1/2 pointer-events-none"
          style={{ left: `${getPositionFromYear(hoveredYear)}%` }}
        >
          <div className="px-2 py-1 rounded bg-primary/20 border border-primary/40 text-[10px] font-mono text-primary">
            {hoveredYear}
          </div>
        </div>
      )}
    </div>
  )
}
