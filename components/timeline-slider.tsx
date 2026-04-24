"use client"

import { cn } from "@/lib/utils"
import { useState, useRef, useEffect, useCallback } from "react"
import { X, Briefcase, Globe, Palette } from "lucide-react"

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
  const [isDragging, setIsDragging] = useState<"start" | "end" | null>(null)
  const [hoveredYear, setHoveredYear] = useState<number | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
  
  // Get works for a specific year (all types)
  const getWorksForYear = (year: number) => {
    return allWorks.filter(w => w.year === year)
  }
  
  // Get type icon
  const getTypeIcon = (type: 'project' | 'exchange' | 'work') => {
    switch (type) {
      case 'project': return <Briefcase className="w-3 h-3" />
      case 'exchange': return <Globe className="w-3 h-3" />
      case 'work': return <Palette className="w-3 h-3" />
    }
  }
  
  // Get type label
  const getTypeLabel = (type: 'project' | 'exchange' | 'work') => {
    switch (type) {
      case 'project': return '项目'
      case 'exchange': return '交流'
      case 'work': return '作品'
    }
  }
  
  // Get link path based on type
  const getLinkPath = (work: TimelineWork) => {
    switch (work.type) {
      case 'project': return `/projects/${work.id}`
      case 'exchange': return `/exchanges/${work.id}`
      case 'work': return `/works/${work.id}`
    }
  }
  
  const getPositionFromYear = (year: number) => {
    return ((year - startYear) / (endYear - startYear)) * 100
  }
  
  const getYearFromPosition = (position: number) => {
    const year = Math.round(startYear + (position / 100) * (endYear - startYear))
    return Math.max(startYear, Math.min(endYear, year))
  }

  const handleMouseDown = (handle: "start" | "end") => (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(handle)
    setSelectedYear(null)
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
    setSelectedYear(null)
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

  // Click on year to select/toggle - does NOT change the slider range
  const handleYearClick = (year: number) => {
    if (selectedYear === year) {
      setSelectedYear(null)
    } else {
      setSelectedYear(year)
    }
  }

  const startPos = getPositionFromYear(value[0])
  const endPos = getPositionFromYear(value[1])

  return (
    <div className={cn("relative", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">TIME/</span>
          <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
            FILTER_RANGE
          </span>
        </div>
        <div className="flex items-center gap-3">
          {(selectedYear || value[0] !== startYear || value[1] !== endYear) && (
            <button
              onClick={() => {
                setSelectedYear(null)
                onChange([startYear, endYear])
              }}
              className="flex items-center gap-1 px-2 py-1 text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors border border-primary/20 rounded hover:border-primary/40"
            >
              RESET
              <X className="w-3 h-3" />
            </button>
          )}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-primary/20 bg-primary/5">
            <span className="text-xs font-mono text-primary">{value[0]}</span>
            <span className="text-[10px] text-muted-foreground">—</span>
            <span className="text-xs font-mono text-primary">{value[1]}</span>
          </div>
        </div>
      </div>
      
      {/* Timeline track */}
      <div 
        ref={trackRef}
        className="relative h-16 cursor-pointer"
        onMouseMove={(e) => {
          if (!trackRef.current || isDragging) return
          const rect = trackRef.current.getBoundingClientRect()
          const position = ((e.clientX - rect.left) / rect.width) * 100
          setHoveredYear(getYearFromPosition(position))
        }}
        onMouseLeave={() => setHoveredYear(null)}
      >
        {/* Background track */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 bg-[rgba(34,211,238,0.1)]" />
        
        {/* Active range */}
        <div 
          className="absolute top-1/2 h-[2px] -translate-y-1/2 bg-primary/60"
          style={{
            left: `${startPos}%`,
            width: `${endPos - startPos}%`,
            boxShadow: "0 0 8px var(--primary-glow)",
          }}
        />
        
        {/* Year markers with click support */}
        <div className="absolute inset-x-0 top-0 bottom-0 flex justify-between">
          {years.map((year) => {
            const isInRange = year >= value[0] && year <= value[1]
            const isSelected = year === selectedYear
            const isHovered = year === hoveredYear
            const yearWorks = getWorksForYear(year)
            const hasWorks = yearWorks.length > 0
            
            return (
              <div 
                key={year} 
                className="relative flex flex-col items-center"
                style={{ width: `${100 / years.length}%` }}
              >
                {/* Clickable year marker */}
                <button
                  onClick={() => handleYearClick(year)}
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 z-10",
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    "transition-all duration-300",
                    isSelected 
                      ? "bg-primary/20 scale-125" 
                      : "bg-transparent hover:bg-primary/10"
                  )}
                >
                  <div 
                    className={cn(
                      "rounded-full transition-all duration-300",
                      isSelected
                        ? "w-4 h-4 bg-primary"
                        : isInRange 
                          ? "w-2.5 h-2.5 bg-primary/60" 
                          : "w-2 h-2 bg-[rgba(34,211,238,0.2)]",
                      isHovered && !isSelected && "scale-125 bg-primary/80",
                      hasWorks && !isSelected && "ring-2 ring-primary/20 ring-offset-1 ring-offset-background"
                    )}
                    style={{
                      boxShadow: isSelected 
                        ? "0 0 15px var(--primary-glow), 0 0 30px var(--primary-glow)"
                        : isInRange 
                          ? "0 0 5px var(--primary-glow)"
                          : "none"
                    }}
                  />
                </button>
                
                {/* Works count badge */}
                {hasWorks && (
                  <div 
                    className={cn(
                      "absolute top-0 text-[8px] font-mono transition-all duration-300",
                      isSelected || isHovered ? "text-primary" : "text-muted-foreground/40"
                    )}
                  >
                    {yearWorks.length}
                  </div>
                )}
                
                {/* Year label */}
                <button
                  onClick={() => handleYearClick(year)}
                  className={cn(
                    "absolute bottom-0 text-[11px] font-mono transition-all duration-300",
                    isSelected 
                      ? "text-primary font-semibold scale-110"
                      : isInRange 
                        ? "text-primary/80" 
                        : "text-muted-foreground/50",
                    isHovered && "text-primary"
                  )}
                >
                  {year}
                </button>
                
                {/* Floating works popup when year is selected */}
                {isSelected && hasWorks && (
                  <div 
                    className={cn(
                      "absolute top-full mt-4 z-50",
                      "min-w-[220px] max-w-[300px]",
                      "p-3 rounded-lg",
                      "bg-[rgba(10,10,15,0.95)] backdrop-blur-md",
                      "border border-primary/30",
                      "shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
                    )}
                    style={{
                      boxShadow: "0 0 20px var(--primary-glow), 0 4px 20px rgba(0,0,0,0.5)",
                      left: "50%",
                      transform: "translateX(-50%)"
                    }}
                  >
                    {/* Arrow */}
                    <div 
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-[rgba(10,10,15,0.95)] border-l border-t border-primary/30"
                    />
                    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-primary/10">
                      <span className="text-[10px] font-mono text-primary tracking-wider">
                        {year}_WORKS
                      </span>
                      <span className="text-[9px] font-mono text-muted-foreground">
                        {yearWorks.length} items
                      </span>
                    </div>
                    
                    {/* Works list grouped by type */}
                    <div className="space-y-2 max-h-[280px] overflow-y-auto">
                      {yearWorks.map((work) => (
                        <a
                          key={`${work.type}-${work.id}`}
                          href={getLinkPath(work)}
                          className={cn(
                            "block p-2 rounded",
                            "bg-[rgba(34,211,238,0.05)]",
                            "border border-transparent",
                            "hover:border-primary/30 hover:bg-[rgba(34,211,238,0.1)]",
                            "transition-all duration-200",
                            "group"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            {/* Thumbnail */}
                            {work.coverImage && (
                              <div className="w-12 h-9 rounded overflow-hidden flex-shrink-0 bg-muted/20">
                                <img 
                                  src={work.coverImage} 
                                  alt={work.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="text-primary/60">{getTypeIcon(work.type)}</span>
                                <span className="text-[8px] font-mono text-muted-foreground/60 uppercase">
                                  {getTypeLabel(work.type)}
                                </span>
                              </div>
                              <h4 className="text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                {work.title}
                              </h4>
                              <p className="text-[10px] text-muted-foreground truncate">
                                {work.keywords.slice(0, 2).join(" · ")}
                              </p>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        {/* Draggable handles - higher z-index to be above year markers */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab z-30",
            isDragging === "start" && "cursor-grabbing"
          )}
          style={{ left: `${startPos}%` }}
          onMouseDown={handleMouseDown("start")}
          onTouchStart={handleTouchStart("start")}
        >
          <div 
            className={cn(
              "w-6 h-6 rounded-full border-2 border-primary bg-background",
              "transition-all duration-200 hover:scale-110",
              isDragging === "start" && "scale-125",
              "flex items-center justify-center"
            )}
            style={{
              boxShadow: "0 0 12px var(--primary-glow), 0 2px 8px rgba(0,0,0,0.3)"
            }}
          >
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
        </div>
        
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab z-30",
            isDragging === "end" && "cursor-grabbing"
          )}
          style={{ left: `${endPos}%` }}
          onMouseDown={handleMouseDown("end")}
          onTouchStart={handleTouchStart("end")}
        >
          <div 
            className={cn(
              "w-6 h-6 rounded-full border-2 border-primary bg-background",
              "transition-all duration-200 hover:scale-110",
              isDragging === "end" && "scale-125",
              "flex items-center justify-center"
            )}
            style={{
              boxShadow: "0 0 12px var(--primary-glow), 0 2px 8px rgba(0,0,0,0.3)"
            }}
          >
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-4 flex items-center justify-center gap-4 text-[9px] font-mono text-muted-foreground/40">
        <span>DRAG_HANDLES_TO_FILTER</span>
        <span className="text-primary/20">|</span>
        <span>CLICK_YEAR_TO_VIEW_ALL_WORKS</span>
      </div>
    </div>
  )
}
