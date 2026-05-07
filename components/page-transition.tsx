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
  const [phase, setPhase] = useState<'idle' | 'fadeIn' | 'fadeOut'>('idle')

  const navigateWithTransition = useCallback((url: string) => {
    // 保存滚动位置
    saveScrollPosition()
    // 标记正在过渡
    setTransitioning(true)
    // 开始渐入白色遮罩
    setPhase('fadeIn')
    
    // 渐入完成后立即跳转并开始渐出
    setTimeout(() => {
      router.push(url)
      setPhase('fadeOut')
      
      // 渐出完成后重置
      setTimeout(() => {
        setPhase('idle')
        setTransitioning(false)
      }, 300)
    }, 40)
  }, [router])

  const getOpacity = () => {
    switch (phase) {
      case 'fadeIn': return 1
      case 'fadeOut': return 0
      default: return 0
    }
  }

  const getTransition = () => {
    switch (phase) {
      case 'fadeIn': return 'opacity 40ms ease-in'
      case 'fadeOut': return 'opacity 300ms ease-out'
      default: return 'none'
    }
  }

  return (
    <TransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      
      {/* 白色闪屏遮罩 */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#ffffff',
          zIndex: 999999,
          pointerEvents: phase !== 'idle' ? 'auto' : 'none',
          opacity: getOpacity(),
          transition: getTransition(),
        }}
      />
    </TransitionContext.Provider>
  )
}
