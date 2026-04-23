"use client"

import { exchanges, type Exchange } from "@/lib/exchange-data"
import { useUserBehavior } from "@/hooks/use-user-behavior"
import { useMemo } from "react"
import { usePageTransition } from "@/components/page-transition"

// ============================================
// COMPONENT SECTION - 以下为结构代码
// 数据请在 lib/exchange-data.ts 中修改
// ============================================

export function Exchanges() {
  const { navigateWithTransition } = usePageTransition()
  const { 
    isLoaded, 
    topTag, 
    totalClicks, 
    trackClick, 
    sortByPreference 
  } = useUserBehavior()

  // 根据用户偏好排序
  const sortedExchanges = useMemo(() => {
    if (!isLoaded) return exchanges
    return sortByPreference(exchanges)
  }, [isLoaded, sortByPreference])

  const handleClick = (e: React.MouseEvent, exchange: Exchange) => {
    e.preventDefault()
    trackClick(exchange.keywords)
    navigateWithTransition(`/exchanges/${exchange.id}`)
  }

  // 状态文本
  const statusText = useMemo(() => {
    if (!isLoaded) return "> 正在初始化行为追踪系统..."
    if (totalClicks === 0) return "> 系统追踪已启动，正在分析您的浏览偏好..."
    return `> Behavior analyzed. Top interest: [${topTag}]. Adaptive UI reordering enabled.`
  }, [isLoaded, totalClicks, topTag])

  return (
    <section id="exchanges" className="py-16 px-6 lg:px-8 border-t border-slate-200">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-6">
          International Experience
        </h2>
        
        {/* 自适应追踪状态 - 国际经历 */}
        <div className="mb-6 font-mono text-[11px] text-slate-400 border border-slate-100 bg-slate-50/80 px-3 py-2 rounded">
          <div className="flex items-center gap-2">
            <span className="text-violet-400/80">[SYS]</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-400/60">国际经历·行为追踪</span>
            <span className="text-slate-300">|</span>
            <span className="flex-1 truncate">
              {statusText}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col gap-10">
          {sortedExchanges.map((exchange) => (
            <div 
              key={exchange.id} 
              className="block cursor-pointer"
              onClick={(e) => handleClick(e, exchange)}
            >
              <article>
                <div className="aspect-video w-full bg-slate-100 mb-4 overflow-hidden transition-transform duration-500 ease-out hover:scale-[1.075] origin-center">
                  {exchange.coverImage ? (
                    <img 
                      src={exchange.coverImage} 
                      alt={exchange.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200" />
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-1 transition-all duration-300 origin-left hover:text-black hover:scale-[1.075] inline-block" suppressHydrationWarning>
                  {exchange.title}
                </h3>
                
                <p className="text-xs text-slate-400 mb-2" suppressHydrationWarning>
                  {exchange.subtitle} · {exchange.period}
                </p>
                
                <p className="text-sm text-slate-600 leading-relaxed mb-3" suppressHydrationWarning>
                  {exchange.description}
                </p>
                
                <div className="flex flex-wrap gap-1.5">
                  {exchange.keywords.map((keyword, i) => (
                    <span 
                      key={i}
                      className="px-2 py-0.5 text-xs text-slate-500 border border-slate-200 rounded-full"
                      suppressHydrationWarning
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
