"use client"

import { useState, useEffect } from "react"
import { Projects } from "@/components/projects"
import { Exchanges } from "@/components/exchanges"
import { OtherWorks } from "@/components/other-works"
import { PageTransitionProvider, restoreScrollPosition } from "@/components/page-transition"

// 骨架屏组件
function ProjectsSkeleton() {
  return (
    <section className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="h-4 w-32 bg-slate-200 rounded mb-10 animate-pulse" />
        <div className="space-y-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-video w-full bg-slate-200 mb-4 rounded" />
              <div className="h-5 bg-slate-200 w-1/3 mb-2 rounded" />
              <div className="h-4 bg-slate-200 w-2/3 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExchangesSkeleton() {
  return (
    <section className="py-16 px-6 lg:px-8 border-t border-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="h-4 w-40 bg-slate-200 rounded mb-10 animate-pulse" />
        <div className="space-y-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-video w-full bg-slate-200 mb-4 rounded" />
              <div className="h-5 bg-slate-200 w-1/4 mb-2 rounded" />
              <div className="h-4 bg-slate-200 w-1/2 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OtherWorksSkeleton() {
  return (
    <section className="py-16 px-6 lg:px-8 border-t border-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="h-4 w-32 bg-slate-200 rounded mb-10 animate-pulse" />
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-6 animate-pulse">
              <div className="w-[45%] h-48 bg-slate-200 rounded" />
              <div className="w-[55%] flex flex-col justify-center">
                <div className="h-5 bg-slate-200 w-1/2 mb-2 rounded" />
                <div className="h-4 bg-slate-200 w-3/4 rounded" />
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

  // 标记组件已挂载并恢复滚动位置
  useEffect(() => {
    setMounted(true)
    // 恢复滚动位置 - 多次尝试确保内容已渲染
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

  // 客户端挂载后渲染实际内容，包裹在 PageTransitionProvider 中
  return (
    <PageTransitionProvider>
      <Projects />
      <Exchanges />
      <OtherWorks />
    </PageTransitionProvider>
  )
}
