"use client"

import { cn } from "@/lib/utils"
import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { X, Briefcase, Globe, Palette } from "lucide-react"

export interface TimelineWork {
  id: string
  title: string
  startDate: string  // "YYYY.M" format
  endDate: string    // "YYYY.M" format
  type: 'project' | 'exchange' | 'work'
  coverImage?: string
  keywords: string[]
  description?: string  // Brief description for popup
}

interface TimelineSliderProps {
  startMonth: string  // "YYYY.M" format, e.g. "2024.1"
  endMonth: string    // "YYYY.M" format, e.g. "2025.12"
  value: [string, string]  // [startDate, endDate] in "YYYY.M" format
  onChange: (value: [string, string]) => void
  allWorks?: TimelineWork[]
  className?: string
}

// Parse "YYYY.M" to { year, month }
function parseDate(date: string): { year: number; month: number } {
  const [year, month] = date.split('.').map(Number)
  return { year, month }
}

// Convert { year, month } to "YYYY.M"
function formatDate(year: number, month: number): string {
  return `${year}.${month}`
}

// Convert date to month index (0-based from startMonth)
function dateToIndex(date: string, startMonth: string): number {
  const d = parseDate(date)
  const s = parseDate(startMonth)
  return (d.year - s.year) * 12 + (d.month - s.month)
}

// Convert month index to date
function indexToDate(index: number, startMonth: string): string {
  const s = parseDate(startMonth)
  const totalMonths = s.month - 1 + index
  const year = s.year + Math.floor(totalMonths / 12)
  const month = (totalMonths % 12) + 1
  return formatDate(year, month)
}

// Format date for display
function formatDisplayDate(date: string): string {
  const { year, month } = parseDate(date)
  return `${year}.${month}`
}

export function TimelineSlider({
  startMonth,
  endMonth,
  value,
  onChange,
  allWorks = [],
  className,
}: TimelineSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState<"start" | "end" | null>(null)
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null)
  const [hoverPosition, setHoverPosition] = useState<number | null>(null) // Exact mouse position %
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [clickPosition, setClickPosition] = useState<number | null>(null) // For positioning the popup
  
  // Calculate total months
  const totalMonths = useMemo(() => {
    return dateToIndex(endMonth, startMonth) + 1
  }, [startMonth, endMonth])
  
  // Generate all months
  const months = useMemo(() => {
    const result: string[] = []
    for (let i = 0; i < totalMonths; i++) {
      result.push(indexToDate(i, startMonth))
    }
    return result
  }, [totalMonths, startMonth])
  
  // Generate half-year markers (for display): 2024.6, 2024.12, 2025.6, 2025.12, 2026.6
  const halfYearMarkers = useMemo(() => {
    const markers: string[] = ['2024.6', '2024.12', '2025.6', '2025.12', '2026.6']
    // Filter to only include markers within our range
    return markers.filter(marker => {
      const idx = dateToIndex(marker, startMonth)
      return idx >= 0 && idx < totalMonths
    })
  }, [startMonth, totalMonths])
  
  // Check if a work is active in a given month
  const isWorkActiveInMonth = (work: TimelineWork, month: string): boolean => {
    const mIdx = dateToIndex(month, startMonth)
    const workStart = dateToIndex(work.startDate, startMonth)
    const workEnd = dateToIndex(work.endDate, startMonth)
    return mIdx >= workStart && mIdx <= workEnd
  }
  
  // Get works active in a specific month
  const getWorksForMonth = (month: string) => {
    return allWorks.filter(w => isWorkActiveInMonth(w, month))
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
  
  // Position calculations
  const getPositionFromDate = (date: string) => {
    const idx = dateToIndex(date, startMonth)
    return (idx / (totalMonths - 1)) * 100
  }
  
  const getDateFromPosition = (position: number) => {
    const idx = Math.round((position / 100) * (totalMonths - 1))
    const clampedIdx = Math.max(0, Math.min(totalMonths - 1, idx))
    return indexToDate(clampedIdx, startMonth)
  }

  const handleMouseDown = (handle: "start" | "end") => (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(handle)
    setSelectedMonth(null)
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !trackRef.current) return
    
    const rect = trackRef.current.getBoundingClientRect()
    const position = ((e.clientX - rect.left) / rect.width) * 100
    const date = getDateFromPosition(position)
    
    if (isDragging === "start") {
      const startIdx = dateToIndex(date, startMonth)
      const endIdx = dateToIndex(value[1], startMonth)
      if (startIdx <= endIdx) {
        onChange([date, value[1]])
      }
    } else {
      const startIdx = dateToIndex(value[0], startMonth)
      const endIdx = dateToIndex(date, startMonth)
      if (endIdx >= startIdx) {
        onChange([value[0], date])
      }
    }
  }, [isDragging, value, onChange, startMonth])

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
    setSelectedMonth(null)
  }

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !trackRef.current) return
    
    const touch = e.touches[0]
    const rect = trackRef.current.getBoundingClientRect()
    const position = ((touch.clientX - rect.left) / rect.width) * 100
    const date = getDateFromPosition(position)
    
    if (isDragging === "start") {
      const startIdx = dateToIndex(date, startMonth)
      const endIdx = dateToIndex(value[1], startMonth)
      if (startIdx <= endIdx) {
        onChange([date, value[1]])
      }
    } else {
      const startIdx = dateToIndex(value[0], startMonth)
      const endIdx = dateToIndex(date, startMonth)
      if (endIdx >= startIdx) {
        onChange([value[0], date])
      }
    }
  }, [isDragging, value, onChange, startMonth])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("touchmove", handleTouchMove as EventListener)
      window.addEventListener("touchend", handleMouseUp)
      return () => {
        window.removeEventListener("touchmove", handleTouchMove as EventListener)
        window.removeEventListener("touchend", handleMouseUp)
      }
    }
  }, [isDragging, handleTouchMove, handleMouseUp])

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current || isDragging) return
    
    const rect = trackRef.current.getBoundingClientRect()
    const position = ((e.clientX - rect.left) / rect.width) * 100
    const clickedMonth = getDateFromPosition(position)
    const worksInMonth = getWorksForMonth(clickedMonth)
    
    // Only show popup if there are works in that month
    if (worksInMonth.length > 0) {
      if (selectedMonth === clickedMonth) {
        setSelectedMonth(null)
        setClickPosition(null)
      } else {
        setSelectedMonth(clickedMonth)
        setClickPosition(position)
      }
    }
  }
  
  // Close popup when clicking outside
  const handleClosePopup = () => {
    setSelectedMonth(null)
    setClickPosition(null)
  }

  const startPos = getPositionFromDate(value[0])
  const endPos = getPositionFromDate(value[1])

  // Check if current range is the full range
  const isFullRange = value[0] === startMonth && value[1] === endMonth

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
          {(!isFullRange || selectedMonth) && (
            <button
              onClick={() => {
                setSelectedMonth(null)
                onChange([startMonth, endMonth])
              }}
              className="flex items-center gap-1 px-2 py-1 text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors border border-primary/20 rounded hover:border-primary/40"
            >
              RESET
              <X className="w-3 h-3" />
            </button>
          )}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-primary/20 bg-primary/5">
            <span className="text-xs font-mono text-primary">{formatDisplayDate(value[0])}</span>
            <span className="text-[10px] text-muted-foreground">—</span>
            <span className="text-xs font-mono text-primary">{formatDisplayDate(value[1])}</span>
          </div>
        </div>
      </div>
      
      {/* Timeline track */}
      <div 
        ref={trackRef}
        className="relative h-20 cursor-pointer"
        onClick={handleTrackClick}
        onMouseMove={(e) => {
          if (!trackRef.current || isDragging) return
          const rect = trackRef.current.getBoundingClientRect()
          const position = ((e.clientX - rect.left) / rect.width) * 100
          setHoverPosition(position)
          setHoveredMonth(getDateFromPosition(position))
        }}
        onMouseLeave={() => {
          setHoveredMonth(null)
          setHoverPosition(null)
        }}
      >
        {/* Background track */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 bg-[rgba(34,211,238,0.1)]" />
        
        {/* Work activity bars (visual representation of when works are active) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-8">
          {allWorks.map((work, i) => {
            const workStartPos = getPositionFromDate(work.startDate)
            const workEndPos = getPositionFromDate(work.endDate)
            const isHovered = hoveredMonth && isWorkActiveInMonth(work, hoveredMonth)
            // Brighter colors: pink for projects, cyan for exchanges, purple for works
            const colors = {
              project: isHovered ? 'rgba(233, 30, 99, 0.9)' : 'rgba(233, 30, 99, 0.5)',
              exchange: isHovered ? 'rgba(34, 211, 238, 0.9)' : 'rgba(34, 211, 238, 0.5)',
              work: isHovered ? 'rgba(156, 39, 176, 0.9)' : 'rgba(156, 39, 176, 0.5)',
            }
            const shadows = {
              project: isHovered ? '0 0 8px rgba(233, 30, 99, 0.6)' : 'none',
              exchange: isHovered ? '0 0 8px rgba(34, 211, 238, 0.6)' : 'none',
              work: isHovered ? '0 0 8px rgba(156, 39, 176, 0.6)' : 'none',
            }
            return (
              <div
                key={`${work.type}-${work.id}`}
                className="absolute h-1.5 rounded-full transition-all duration-150 cursor-pointer"
                style={{
                  left: `${workStartPos}%`,
                  width: `${Math.max(workEndPos - workStartPos, 1)}%`,
                  backgroundColor: colors[work.type],
                  top: `${(i % 4) * 6}px`,
                  boxShadow: shadows[work.type],
                  transform: isHovered ? 'scaleY(1.5)' : 'scaleY(1)',
                }}
              />
            )
          })}
        </div>
        
        {/* Mouse follower vertical line - follows exact mouse position */}
        {hoverPosition !== null && !isDragging && (
          <div 
            className="absolute top-0 bottom-0 w-[1px] bg-primary/40 pointer-events-none z-20 transition-none"
            style={{
              left: `${hoverPosition}%`,
            }}
          />
        )}
        
        {/* Active range highlight */}
        <div 
          className="absolute top-1/2 h-[2px] -translate-y-1/2 bg-primary/60"
          style={{
            left: `${startPos}%`,
            width: `${endPos - startPos}%`,
            boxShadow: "0 0 8px var(--primary-glow)",
          }}
        />
        
        {/* Half-year markers: 2024.6, 2024.12, 2025.6, 2025.12, 2026.6 - dimmed, non-interactive */}
        <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none">
          {halfYearMarkers.map((marker) => {
            const position = getPositionFromDate(marker)
            
            return (
              <div 
                key={marker} 
                className="absolute flex flex-col items-center"
                style={{ 
                  left: `${position}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                {/* Marker tick */}
                <div className="absolute top-1/2 -translate-y-1/2 w-[1px] h-3 bg-muted-foreground/20" />
                
                {/* Label below timeline */}
                <span className="absolute top-full mt-2 text-[9px] font-mono text-muted-foreground/30 whitespace-nowrap">
                  {marker}
                </span>
              </div>
            )
          })}
        </div>
        
        {/* Draggable handles */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab z-30",
            isDragging === "start" && "cursor-grabbing",
            !isDragging && "transition-[left] duration-150 ease-out"
          )}
          style={{ left: `${startPos}%` }}
          onMouseDown={handleMouseDown("start")}
          onTouchStart={handleTouchStart("start")}
        >
          <div 
            className={cn(
              "w-5 h-5 rounded-full border-2 border-primary bg-background",
              "hover:scale-110",
              isDragging === "start" ? "scale-125" : "transition-transform duration-150",
              "flex items-center justify-center"
            )}
            style={{
              boxShadow: "0 0 12px var(--primary-glow), 0 2px 8px rgba(0,0,0,0.3)"
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          {isDragging === "start" && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-primary text-primary-foreground text-[10px] font-mono whitespace-nowrap">
              {formatDisplayDate(value[0])}
            </div>
          )}
        </div>
        
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab z-30",
            isDragging === "end" && "cursor-grabbing",
            !isDragging && "transition-[left] duration-150 ease-out"
          )}
          style={{ left: `${endPos}%` }}
          onMouseDown={handleMouseDown("end")}
          onTouchStart={handleTouchStart("end")}
        >
          <div 
            className={cn(
              "w-5 h-5 rounded-full border-2 border-primary bg-background",
              "hover:scale-110",
              isDragging === "end" ? "scale-125" : "transition-transform duration-150",
              "flex items-center justify-center"
            )}
            style={{
              boxShadow: "0 0 12px var(--primary-glow), 0 2px 8px rgba(0,0,0,0.3)"
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          {isDragging === "end" && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-primary text-primary-foreground text-[10px] font-mono whitespace-nowrap">
              {formatDisplayDate(value[1])}
            </div>
          )}
        </div>
        
        {/* Hover tooltip */}
        {hoveredMonth && !isDragging && !selectedMonth && (
          <div 
            className="absolute -top-10 px-2 py-1 rounded bg-[rgba(10,10,15,0.9)] border border-primary/30 text-[10px] font-mono text-primary whitespace-nowrap z-40 pointer-events-none"
            style={{
              left: `${getPositionFromDate(hoveredMonth)}%`,
              transform: 'translateX(-50%)'
            }}
          >
            {formatDisplayDate(hoveredMonth)} · {getWorksForMonth(hoveredMonth).length} works
          </div>
        )}
        
        {/* Selected month popup - shows project details (below timeline) */}
        {selectedMonth && clickPosition !== null && (
          <>
            {/* Backdrop to close popup */}
            <div 
              className="fixed inset-0 z-40"
              onClick={handleClosePopup}
            />
            
            {/* Connecting line from point to popup */}
            <div 
              className="absolute z-45 w-[1px] bg-primary/50"
              style={{
                left: `${clickPosition}%`,
                top: '50%',
                height: '30px',
              }}
            />
            
            {/* Popup - positioned below timeline */}
            <div 
              className={cn(
                "absolute z-50",
                "w-[240px]",
                "p-3 rounded-lg",
                "bg-[rgba(8,8,12,0.95)] backdrop-blur-md",
                "border border-primary/40",
                "animate-in fade-in-0 slide-in-from-top-2 duration-200"
              )}
              style={{
                top: 'calc(50% + 35px)',
                left: `${Math.min(Math.max(clickPosition, 20), 80)}%`,
                transform: 'translateX(-50%)',
                boxShadow: "0 0 20px rgba(34,211,238,0.2), 0 4px 16px rgba(0,0,0,0.4)",
              }}
            >
              {/* Arrow pointing up */}
              <div 
                className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[rgba(8,8,12,0.95)] border-l border-t border-primary/40"
              />
              
              {/* Header */}
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-primary/15">
                <span className="text-[10px] font-mono text-primary tracking-wider">
                  {formatDisplayDate(selectedMonth)}_WORKS
                </span>
                <span className="text-[9px] font-mono text-muted-foreground/50">
                  {getWorksForMonth(selectedMonth).length} items
                </span>
              </div>
              
              {/* Works list - compact */}
              <div className="space-y-1.5 max-h-[180px] overflow-y-auto">
                {getWorksForMonth(selectedMonth).map((work) => (
                  <a
                    key={`${work.type}-${work.id}`}
                    href={getLinkPath(work)}
                    className={cn(
                      "flex items-center gap-2 p-1.5 rounded",
                      "hover:bg-primary/10",
                      "transition-all duration-150",
                      "group"
                    )}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Thumbnail */}
                    {work.coverImage && (
                      <div className="w-10 h-8 rounded overflow-hidden flex-shrink-0 bg-muted/20">
                        <img 
                          src={work.coverImage} 
                          alt={work.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      {/* Type indicator */}
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="text-primary/50">{getTypeIcon(work.type)}</span>
                        <span className="text-[8px] font-mono text-muted-foreground/40 uppercase">
                          {getTypeLabel(work.type)}
                        </span>
                      </div>
                      {/* Title */}
                      <h4 className="text-[11px] font-medium text-foreground/90 group-hover:text-primary transition-colors truncate">
                        {work.title}
                      </h4>
                      {/* Keywords */}
                      <p className="text-[9px] text-muted-foreground/50 truncate">
                        {work.keywords.slice(0, 2).join(' · ')}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-[9px] font-mono text-muted-foreground/60">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-1 rounded-full bg-[rgba(233,30,99,0.5)]" />
          <span>项目</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-1 rounded-full bg-[rgba(34,211,238,0.5)]" />
          <span>交流</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-1 rounded-full bg-[rgba(156,39,176,0.5)]" />
          <span>作品</span>
        </div>
      </div>
    </div>
  )
}
