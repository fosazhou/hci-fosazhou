"use client"

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

// 滚动位置存储 key
const SCROLL_KEY = "homepage-scroll-position"
// 过渡状态 key
const TRANSITION_KEY = "page-transitioning"

interface TransitionContextType {
  navigateWithTransition: (url: string) => void
}

const TransitionContext = createContext<TransitionContextType | null>(null)

export function usePageTransition() {
  const ctx = useContext(TransitionContext)
  if (!ctx) {
    throw new Error("usePageTransition must be used within PageTransitionProvider")
  }
  return ctx
}

// 保存滚动位置
export function saveScrollPosition() {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SCROLL_KEY, window.scrollY.toString())
  }
}

// 恢复滚动位置
export function restoreScrollPosition() {
  if (typeof window !== "undefined") {
    const saved = sessionStorage.getItem(SCROLL_KEY)
    if (saved) {
      const position = parseInt(saved, 10)
      const attempts = [0, 50, 100, 200, 500]
      attempts.forEach((delay) => {
        setTimeout(() => {
          window.scrollTo({ top: position, behavior: "instant" })
        }, delay)
      })
      sessionStorage.removeItem(SCROLL_KEY)
    }
  }
}

// 标记正在过渡
export function setTransitioning(value: boolean) {
  if (typeof window !== "undefined") {
    if (value) {
      sessionStorage.setItem(TRANSITION_KEY, "true")
    } else {
      sessionStorage.removeItem(TRANSITION_KEY)
    }
  }
}

// 检查是否正在过渡
export function isTransitioning(): boolean {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(TRANSITION_KEY) === "true"
  }
  return false
}

// 过渡动画阶段
type TransitionPhase = "idle" | "scanning" | "loading" | "entering"

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [phase, setPhase] = useState<TransitionPhase>("idle")
  const [targetUrl, setTargetUrl] = useState<string>("")
  const [scanProgress, setScanProgress] = useState(0)

  const navigateWithTransition = useCallback((url: string) => {
    // 保存滚动位置
    saveScrollPosition()
    // 标记正在过渡
    setTransitioning(true)
    // 开始过渡动画
    setTargetUrl(url)
    setPhase("scanning")
    setScanProgress(0)
  }, [])

  // 处理过渡动画序列
  useEffect(() => {
    if (phase === "scanning") {
      // 模拟扫描进度
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setPhase("loading")
            return 100
          }
          return prev + Math.random() * 15 + 5
        })
      }, 50)
      return () => clearInterval(interval)
    }
    
    if (phase === "loading") {
      // 短暂停顿后进入
      const timer = setTimeout(() => {
        setPhase("entering")
        router.push(targetUrl)
      }, 200)
      return () => clearTimeout(timer)
    }
    
    if (phase === "entering") {
      // 进入动画完成后重置
      const timer = setTimeout(() => {
        setPhase("idle")
        setTargetUrl("")
        setScanProgress(0)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [phase, targetUrl, router])

  const isActive = phase !== "idle"

  return (
    <TransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      
      {/* 过渡遮罩 */}
      <div 
        className={cn(
          "fixed inset-0 z-[9999] pointer-events-none",
          "transition-opacity duration-300",
          isActive ? "opacity-100" : "opacity-0"
        )}
      >
        {/* 深色背景 */}
        <div 
          className={cn(
            "absolute inset-0 bg-[#0a0a0f]",
            "transition-opacity duration-200",
            phase === "entering" ? "opacity-100" : "opacity-95"
          )}
        />
        
        {/* 扫描线效果 */}
        {(phase === "scanning" || phase === "loading") && (
          <div 
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              top: `${Math.min(scanProgress, 100)}%`,
              boxShadow: "0 0 20px var(--primary-glow), 0 0 40px var(--primary-glow)",
              opacity: phase === "loading" ? 0.5 : 1,
              transition: "opacity 0.2s"
            }}
          />
        )}
        
        {/* 中央状态指示器 */}
        {isActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              {/* 状态文字 */}
              <div className="flex items-center gap-2">
                <div 
                  className={cn(
                    "w-2 h-2 rounded-full",
                    phase === "scanning" && "bg-primary animate-pulse",
                    phase === "loading" && "bg-brand animate-pulse",
                    phase === "entering" && "bg-green-400"
                  )}
                />
                <span className="text-[10px] font-mono tracking-widest text-primary/80 uppercase">
                  {phase === "scanning" && "ANALYZING_TARGET..."}
                  {phase === "loading" && "LOADING_CONTENT..."}
                  {phase === "entering" && "RENDERING..."}
                </span>
              </div>
              
              {/* 进度条 */}
              {phase === "scanning" && (
                <div className="w-48 h-[2px] bg-[rgba(34,211,238,0.1)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-100"
                    style={{ width: `${Math.min(scanProgress, 100)}%` }}
                  />
                </div>
              )}
              
              {/* 目标URL显示 */}
              <span className="text-[9px] font-mono text-muted-foreground/40 tracking-wider">
                {targetUrl.split('/').pop()?.toUpperCase() || "TARGET"}
              </span>
            </div>
          </div>
        )}
        
        {/* 边框装饰 */}
        {isActive && (
          <>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </>
        )}
      </div>
    </TransitionContext.Provider>
  )
}
