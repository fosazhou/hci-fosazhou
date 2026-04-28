"use client"

import { createContext, useContext, useState, useCallback, ReactNode, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

// 滚动位置存储 key
const SCROLL_KEY = "homepage-scroll-position"
// 过渡状态 key
const TRANSITION_KEY = "page-transitioning"
// 时间轴状态 key
const TIMELINE_STATE_KEY = "timeline-state"

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

// 保存时间轴状态（从时间轴进入详情页时调用）
export function saveTimelineState(month: string) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(TIMELINE_STATE_KEY, month)
  }
}

// 获取并清除时间轴状态（返回时调用）
export function getAndClearTimelineState(): string | null {
  if (typeof window !== "undefined") {
    const state = sessionStorage.getItem(TIMELINE_STATE_KEY)
    sessionStorage.removeItem(TIMELINE_STATE_KEY)
    return state
  }
  return null
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [phase, setPhase] = useState<'idle' | 'fadeIn' | 'hold' | 'fadeOut'>('idle')
  const pendingUrl = useRef<string | null>(null)

  const navigateWithTransition = useCallback((url: string) => {
    // 保存滚动位置
    saveScrollPosition()
    // 标记正在过渡
    setTransitioning(true)
    // 保存目标 URL
    pendingUrl.current = url
    // 开始淡入
    setPhase('fadeIn')
  }, [])

  // 处理转场阶段
  useEffect(() => {
    if (phase === 'fadeIn') {
      // 淡入完成后，跳转页面
      const timer = setTimeout(() => {
        if (pendingUrl.current) {
          router.push(pendingUrl.current)
          pendingUrl.current = null
        }
        setPhase('hold')
      }, 200) // 淡入时间
      return () => clearTimeout(timer)
    }
    
    if (phase === 'hold') {
      // 短暂保持后开始淡出
      const timer = setTimeout(() => {
        setPhase('fadeOut')
      }, 100) // 保持时间
      return () => clearTimeout(timer)
    }
    
    if (phase === 'fadeOut') {
      // 淡出完成后重置
      const timer = setTimeout(() => {
        setPhase('idle')
        setTransitioning(false)
      }, 300) // 淡出时间
      return () => clearTimeout(timer)
    }
  }, [phase, router])

  // 计算透明度
  const getOpacity = () => {
    switch (phase) {
      case 'fadeIn': return 1
      case 'hold': return 1
      case 'fadeOut': return 0
      default: return 0
    }
  }

  // 计算过渡时间
  const getTransition = () => {
    switch (phase) {
      case 'fadeIn': return 'opacity 0.2s ease-in'
      case 'fadeOut': return 'opacity 0.3s ease-out'
      default: return 'none'
    }
  }

  const isVisible = phase !== 'idle'

  return (
    <TransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      
      {/* 平滑淡入淡出遮罩 */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#000000',
          zIndex: 999999,
          pointerEvents: isVisible ? 'auto' : 'none',
          opacity: getOpacity(),
          transition: getTransition(),
          willChange: 'opacity',
        }}
      />
    </TransitionContext.Provider>
  )
}
