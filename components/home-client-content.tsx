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

// Helper to parse "YYYY.M" to comparable number (year * 12 + month)
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
  // Work overlaps with filter if work starts before filter ends AND work ends after filter starts
  return ws <= fe && we >= fs
}

// 科技风骨架屏组件
function ProjectsSkeleton() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl">
        {/* Section header skeleton */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-3 w-8 bg-primary/20 rounded animate-pulse" />
          <div className="h-3 w-24 bg-muted rounded animate-pulse" />
          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/10 to-transparent ml-4" />
        </div>
        
        {/* Timeline skeleton */}
        <div className="mb-12">
          <div className="h-20 bg-muted/30 rounded-lg border border-primary/10 animate-pulse" />
        </div>
        
        {/* Projects grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="rounded-lg border border-primary/10 bg-card/50 overflow-hidden animate-pulse"
            >
              <div className="aspect-[4/3] bg-muted/30" />
              <div className="p-4">
                <div className="h-4 bg-muted/30 w-3/4 mb-2 rounded" />
                <div className="h-3 bg-muted/20 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExchangesSkeleton() {
  return (
    <section className="py-16 border-t border-primary/10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-3 w-8 bg-primary/20 rounded animate-pulse" />
          <div className="h-3 w-32 bg-muted rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="rounded-lg border border-primary/10 bg-card/50 overflow-hidden animate-pulse"
            >
              <div className="aspect-[4/3] bg-muted/30" />
              <div className="p-4">
                <div className="h-4 bg-muted/30 w-1/2 mb-2 rounded" />
                <div className="h-3 bg-muted/20 w-3/4 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OtherWorksSkeleton() {
  return (
    <section className="py-16 border-t border-primary/10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-3 w-8 bg-primary/20 rounded animate-pulse" />
          <div className="h-3 w-28 bg-muted rounded animate-pulse" />
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="flex gap-6 p-4 rounded-lg border border-primary/10 bg-card/50 animate-pulse"
            >
              <div className="w-32 h-24 bg-muted/30 rounded" />
              <div className="flex-1 flex flex-col justify-center">
                <div className="h-4 bg-muted/30 w-1/3 mb-2 rounded" />
                <div className="h-3 bg-muted/20 w-2/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Timeline range: 2024.6 to 2025.11
const TIMELINE_START = "2024.6"
const TIMELINE_END = "2025.11"

export function HomeClientContent() {
  const [mounted, setMounted] = useState(false)
  const [dateRange, setDateRange] = useState<[string, string]>([TIMELINE_START, TIMELINE_END])

  // 整合所有作品数据用于时间轴显示
  const allWorksForTimeline = useMemo((): TimelineWork[] => {
    const items: TimelineWork[] = []
    
    // Projects
    projects.forEach(p => {
      if (p.startDate && p.endDate) {
        items.push({
          id: p.id,
          title: p.title,
          startDate: p.startDate,
          endDate: p.endDate,
          type: 'project',
          coverImage: p.coverImage,
          keywords: p.keywords
        })
      }
    })
    
    // Exchanges
    exchanges.forEach(e => {
      if (e.startDate && e.endDate) {
        items.push({
          id: e.id,
          title: e.title,
          startDate: e.startDate,
          endDate: e.endDate,
          type: 'exchange',
          coverImage: e.coverImage,
          keywords: e.keywords
        })
      }
    })
    
    // Other Works
    otherWorks.forEach(w => {
      if (w.startDate && w.endDate) {
        items.push({
          id: w.id,
          title: w.title,
          startDate: w.startDate,
          endDate: w.endDate,
          type: 'work',
          coverImage: w.coverImage,
          keywords: w.keywords
        })
      }
    })
    
    return items
  }, [])

  // 根据日期范围过滤各类 IDs
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

  // 标记组件已挂载并恢复滚动位置
  useEffect(() => {
    setMounted(true)
    restoreScrollPosition()
  }, [])

  // 服务端渲染时只返回骨架屏
  if (!mounted) {
    return (
      <>
        <ProjectsSkeleton />
        <ExchangesSkeleton />
        <OtherWorksSkeleton />
      </>
    )
  }

  // 客户端挂载后渲染实际内容
  return (
    <PageTransitionProvider>
      {/* Timeline Section */}
      <section id="projects" className="pt-8 pb-4">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">P.01/</span>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
            PROJECT_TIMELINE
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
        </div>
        
        <TimelineSlider
          startMonth={TIMELINE_START}
          endMonth={TIMELINE_END}
          value={dateRange}
          onChange={setDateRange}
          allWorks={allWorksForTimeline}
        />
      </section>

      {/* Projects - filtered by timeline */}
      <Projects filterIds={filteredProjectIds} />
      
      {/* Exchanges - filtered by timeline */}
      <Exchanges filterIds={filteredExchangeIds} />
      
      {/* Other Works - filtered by timeline */}
      <OtherWorks filterIds={filteredWorkIds} />
    </PageTransitionProvider>
  )
}
