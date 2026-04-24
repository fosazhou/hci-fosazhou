"use client"

import { useState, useEffect, useMemo } from "react"
import { Projects } from "@/components/projects"
import { Exchanges } from "@/components/exchanges"
import { OtherWorks } from "@/components/other-works"
import { TimelineSlider } from "@/components/timeline-slider"
import { PageTransitionProvider, restoreScrollPosition } from "@/components/page-transition"
import { projects } from "@/lib/projects-data"
import { exchanges } from "@/lib/exchange-data"
import { otherWorks } from "@/lib/other-works-data"

// Helper to extract year from period string like "2025.7 - 2025.12" or "2024.1"
function extractYearFromPeriod(period: string): number {
  const match = period.match(/(\d{4})/)
  return match ? parseInt(match[1]) : 2024
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

export function HomeClientContent() {
  const [mounted, setMounted] = useState(false)
  const [yearRange, setYearRange] = useState<[number, number]>([2023, 2026])

  // 整合所有作品数据用于时间轴显示
  const allWorksForTimeline = useMemo(() => {
    const items: Array<{
      id: string
      title: string
      year: number
      type: 'project' | 'exchange' | 'work'
      coverImage?: string
      keywords: string[]
    }> = []
    
    // Projects
    projects.forEach(p => {
      items.push({
        id: p.id,
        title: p.title,
        year: parseInt(p.year),
        type: 'project',
        coverImage: p.coverImage,
        keywords: p.keywords
      })
    })
    
    // Exchanges
    exchanges.forEach(e => {
      items.push({
        id: e.id,
        title: e.title,
        year: extractYearFromPeriod(e.period),
        type: 'exchange',
        coverImage: e.coverImage,
        keywords: e.keywords
      })
    })
    
    // Other Works
    otherWorks.forEach(w => {
      items.push({
        id: w.id,
        title: w.title,
        year: parseInt(w.year),
        type: 'work',
        coverImage: w.coverImage,
        keywords: w.keywords
      })
    })
    
    return items
  }, [])

  // 根据年份范围过滤各类 IDs
  const filteredProjectIds = useMemo(() => {
    return projects
      .filter(p => {
        const year = parseInt(p.year)
        return year >= yearRange[0] && year <= yearRange[1]
      })
      .map(p => p.id)
  }, [yearRange])

  const filteredExchangeIds = useMemo(() => {
    return exchanges
      .filter(e => {
        const year = extractYearFromPeriod(e.period)
        return year >= yearRange[0] && year <= yearRange[1]
      })
      .map(e => e.id)
  }, [yearRange])

  const filteredWorkIds = useMemo(() => {
    return otherWorks
      .filter(w => {
        const year = parseInt(w.year)
        return year >= yearRange[0] && year <= yearRange[1]
      })
      .map(w => w.id)
  }, [yearRange])

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
          startYear={2023}
          endYear={2026}
          value={yearRange}
          onChange={setYearRange}
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
