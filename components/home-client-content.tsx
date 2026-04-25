"use client"

import { useState, useEffect, useMemo } from "react"
import { Projects } from "@/components/projects"
import { Exchanges } from "@/components/exchanges"
import { OtherWorks } from "@/components/other-works"
import { TimelineSlider, type TimelineWork } from "@/components/timeline-slider"
import { PageTransitionProvider, restoreScrollPosition } from "@/components/page-transition"
import { projects } from "@/lib/projects-data"
import { exchanges } from "@/lib/exchange-data"
import { otherWorks } from "@/lib/other-works-data"

// Helper to parse "YYYY.M" to comparable number
function dateToNumber(date: string): number {
  const [year, month] = date.split('.').map(Number)
  return year * 12 + month
}

// Check if a work's date range overlaps with the filter range
function isInDateRange(workStart: string, workEnd: string, filterStart: string, filterEnd: string): boolean {
  const ws = dateToNumber(workStart)
  const we = dateToNumber(workEnd)
  const fs = dateToNumber(filterStart)
  const fe = dateToNumber(filterEnd)
  return ws <= fe && we >= fs
}

// Minimal skeleton
function ContentSkeleton() {
  return (
    <div className="py-16 space-y-4 animate-pulse">
      <div className="h-4 w-24 bg-muted/20 rounded" />
      <div className="h-px w-full bg-muted/10" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-muted/10 rounded" />
        ))}
      </div>
    </div>
  )
}

// Timeline range
const TIMELINE_START = "2024.6"
const TIMELINE_END = "2026.6"

export function HomeClientContent() {
  const [mounted, setMounted] = useState(false)
  const [dateRange, setDateRange] = useState<[string, string]>([TIMELINE_START, TIMELINE_END])

  // Aggregate all works for timeline
  const allWorksForTimeline = useMemo((): TimelineWork[] => {
    const items: TimelineWork[] = []
    
    projects.forEach(p => {
      if (p.startDate && p.endDate) {
        items.push({
          id: p.id,
          title: p.title,
          startDate: p.startDate,
          endDate: p.endDate,
          type: 'project',
          coverImage: p.coverImage,
          keywords: p.keywords,
          description: p.description
        })
      }
    })
    
    exchanges.forEach(e => {
      if (e.startDate && e.endDate) {
        items.push({
          id: e.id,
          title: e.title,
          startDate: e.startDate,
          endDate: e.endDate,
          type: 'exchange',
          coverImage: e.coverImage,
          keywords: e.keywords,
          description: e.description
        })
      }
    })
    
    otherWorks.forEach(w => {
      if (w.startDate && w.endDate) {
        items.push({
          id: w.id,
          title: w.title,
          startDate: w.startDate,
          endDate: w.endDate,
          type: 'work',
          coverImage: w.coverImage,
          keywords: w.keywords,
          description: w.description
        })
      }
    })
    
    return items
  }, [])

  // Filter IDs by date range
  const filteredProjectIds = useMemo(() => {
    return projects
      .filter(p => p.startDate && p.endDate && isInDateRange(p.startDate, p.endDate, dateRange[0], dateRange[1]))
      .map(p => p.id)
  }, [dateRange])

  const filteredExchangeIds = useMemo(() => {
    return exchanges
      .filter(e => e.startDate && e.endDate && isInDateRange(e.startDate, e.endDate, dateRange[0], dateRange[1]))
      .map(e => e.id)
  }, [dateRange])

  const filteredWorkIds = useMemo(() => {
    return otherWorks
      .filter(w => w.startDate && w.endDate && isInDateRange(w.startDate, w.endDate, dateRange[0], dateRange[1]))
      .map(w => w.id)
  }, [dateRange])

  useEffect(() => {
    setMounted(true)
    restoreScrollPosition()
  }, [])

  if (!mounted) {
    return <ContentSkeleton />
  }

  return (
    <PageTransitionProvider>
      {/* Timeline Section */}
      <section id="timeline" className="pt-8 pb-6">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-[10px] font-mono text-muted-foreground/30">01</span>
            <div className="w-8 h-px bg-muted-foreground/10" />
          </div>
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
            Timeline
          </h2>
        </header>
        
        <TimelineSlider
          startMonth={TIMELINE_START}
          endMonth={TIMELINE_END}
          value={dateRange}
          onChange={setDateRange}
          allWorks={allWorksForTimeline}
        />
      </section>

      {/* Content Sections */}
      <Projects filterIds={filteredProjectIds} />
      <Exchanges filterIds={filteredExchangeIds} />
      <OtherWorks filterIds={filteredWorkIds} />
    </PageTransitionProvider>
  )
}
