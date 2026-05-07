"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
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
  const [showOverlay, setShowOverlay] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)

  const navigateWithTransition = useCallback((url: string) => {
    // 保存滚动位置
    saveScrollPosition()
    // 标记正在过渡
    setTransitioning(true)
    // 立即显示白色遮罩
    setShowOverlay(true)
    setIsFadingOut(false)
    
    // 立即跳转页面
    router.push(url)
    
    // 开始淡出
    requestAnimationFrame(() => {
      setIsFadingOut(true)
    })
    
    // 淡出完成后隐藏遮罩
    setTimeout(() => {
      setShowOverlay(false)
      setIsFadingOut(false)
      setTransitioning(false)
    }, 350)
  }, [router])

  return (
    <TransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      
      {/* 白色闪屏遮罩 */}
      {showOverlay && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#ffffff',
            zIndex: 999999,
            pointerEvents: 'auto',
            opacity: isFadingOut ? 0 : 1,
            transition: isFadingOut ? 'opacity 300ms ease-out' : 'none',
          }}
        />
      )}
    </TransitionContext.Provider>
  )
}
